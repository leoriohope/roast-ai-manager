import OpenAI from 'openai'
import type { LaunchFormInput } from '../../src/types/index.js'
import { AUDIENCE_LABEL, DISH_TYPE_LABEL, GOAL_LABEL, PLATFORM_LABEL } from '../../src/mock/copyBank.js'

function client(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set')
  }
  return new OpenAI({ apiKey })
}

export interface LaunchContentDraft {
  positioning: string
  sellingPoints: string[]
  douyinScript: string
  xiaohongshuPost: { title: string; body: string; tags: string[] }
  momentsCopy: string
  wechatGroupMessage: string
  groupBuyTitles: string[]
  staffScript: string[]
}

const LAUNCH_CONTENT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    positioning: { type: 'string' },
    sellingPoints: { type: 'array', items: { type: 'string' } },
    douyinScript: { type: 'string' },
    xiaohongshuPost: {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        body: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['title', 'body', 'tags'],
    },
    momentsCopy: { type: 'string' },
    wechatGroupMessage: { type: 'string' },
    groupBuyTitles: { type: 'array', items: { type: 'string' } },
    staffScript: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'positioning',
    'sellingPoints',
    'douyinScript',
    'xiaohongshuPost',
    'momentsCopy',
    'wechatGroupMessage',
    'groupBuyTitles',
    'staffScript',
  ],
}

// Non-store-level base prompt: fixed role/voice instructions that apply to
// every launch plan regardless of dish or store.
const BASE_PROMPT = `你是连锁烤肉品牌的社交媒体和营销文案专家，帮门店店长为新品/新套餐写上市推广内容。
风格要求：口语化、接地气，有烟火气，避免浮夸的企业公关腔调，不要用"引领""赋能"这类词。
所有输出使用中文。`

function buildContentPrompt(input: LaunchFormInput): string {
  const audienceLabel = input.targetAudience.map((a) => AUDIENCE_LABEL[a]).join('、') || '广泛客群'
  const goalLabel = input.goal.map((g) => GOAL_LABEL[g]).join('、') || '提升门店曝光'
  const platformLabel = input.platforms.map((p) => PLATFORM_LABEL[p]).join('、') || '门店常规渠道'

  const lines = [
    BASE_PROMPT,
    '',
    '本次上新信息：',
    `品名：${input.name}`,
    `品类：${DISH_TYPE_LABEL[input.type]}`,
    `定价：${input.price}元`,
    `目标客群：${audienceLabel}`,
    `上新目标：${goalLabel}`,
    `投放渠道：${platformLabel}`,
  ]
  if (input.sellingPoints) lines.push(`店长补充的卖点：${input.sellingPoints}`)
  if (input.flavorDescription) lines.push(`口味描述：${input.flavorDescription}`)
  if (input.partySize) lines.push(`适合人数：${input.partySize}人`)
  if (input.limitedTime) lines.push(`限时信息：${input.limitedTime.start} 至 ${input.limitedTime.end}`)
  if (input.promotionsToAvoid) lines.push(`需要规避的促销话术：${input.promotionsToAvoid}`)

  const hasImages = input.dishImage || input.menuScreenshot || input.reviewScreenshot
  if (hasImages) {
    lines.push(
      '',
      '参考图片说明：下面附带的图片可能包含菜品实拍、菜单截图、顾客评价截图。请结合图片里的真实信息（比如评价里顾客提到的味道/场景，或者菜单里已有的定价和描述风格）让文案更贴近这家门店的真实语境，不要虚构图片中不存在的内容。',
    )
  }

  lines.push(
    '',
    '请生成：一句话定位(positioning)、3-5条卖点(sellingPoints)、抖音短视频脚本(douyinScript)、小红书笔记标题+正文+标签(xiaohongshuPost)、朋友圈文案(momentsCopy)、微信群通知文案(wechatGroupMessage)、团购标题建议2-3个(groupBuyTitles，如果投放渠道不含团购可以留空数组)、员工推荐话术2-3句(staffScript)。',
  )

  return lines.join('\n')
}

function toImageContentPart(dataUrl: string | null | undefined) {
  if (!dataUrl) return null
  return { type: 'image_url' as const, image_url: { url: dataUrl } }
}

export async function generateLaunchContent(input: LaunchFormInput): Promise<LaunchContentDraft> {
  const openai = client()
  const text = buildContentPrompt(input)
  const imageParts = [input.dishImage, input.menuScreenshot, input.reviewScreenshot]
    .map(toImageContentPart)
    .filter((p): p is NonNullable<typeof p> => p !== null)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text }, ...imageParts],
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'launch_content',
        strict: true,
        schema: LAUNCH_CONTENT_SCHEMA,
      },
    },
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) {
    throw new Error('OpenAI did not return launch content')
  }
  return JSON.parse(raw)
}
