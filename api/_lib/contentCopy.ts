import OpenAI from 'openai'
import type { ContentPlanInput, Platform } from '../../src/types/index.js'
import { PLATFORM_LABEL } from '../../src/mock/copyBank.js'
import { BRAND_DESCRIPTION, BRAND_NAME } from './brandContext.js'

function client(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set')
  }
  return new OpenAI({ apiKey })
}

export interface ContentCopyDraft {
  douyinScript?: string
  xiaohongshuPost?: { title: string; body: string; tags: string[] }
  momentsCopy?: string
  wechatGroupMessage?: string
}

// Per-platform tone/format guidance — without this, all four channels read
// as the same sentence with a different opening, which is exactly what was
// reported: distinct channels producing near-identical copy.
const PLATFORM_GUIDANCE: Partial<Record<Platform, string>> = {
  douyin: '抖音短视频脚本：按镜头分段写（开场钩子/画面展示/卖点/引导互动），突出画面、动作、声音细节，短平快，结尾引导评论区互动',
  xiaohongshu: '小红书笔记：种草语气，emoji点缀标题，正文分段像真实顾客体验分享，不要写成广告腔',
  wechat_moments: '朋友圈文案：像个人随手分享的口吻，简短随性，一两句话，不要营销腔',
  wechat_group: '微信群通知：直接告知型，简洁明了，突出到店行动号召（比如"到店即可点"）',
}

function buildContentCopyPrompt(input: ContentPlanInput): string {
  const platformList = input.platforms.map((p) => PLATFORM_LABEL[p]).join('、')

  const lines = [
    `你是"${BRAND_NAME}"品牌的社交媒体文案专家。`,
    BRAND_DESCRIPTION,
    '',
    `推广对象：${input.promotionObject}`,
    '如果推广对象是具体菜品或套餐，文案应聚焦口感、食材、卖点等具体细节；如果推广对象是氛围、场景或时段类（比如门店氛围、下班小聚、生日聚会），文案应聚焦环境、心情、社交体验，不要生硬地描述"口感"。',
    '',
    `需要为以下渠道分别生成文案：${platformList}。每个渠道的语气、结构、长度要有明显区别，不能是同一段话换个开头：`,
  ]
  input.platforms.forEach((p) => {
    const guidance = PLATFORM_GUIDANCE[p]
    if (guidance) lines.push(`- ${guidance}`)
  })
  if (input.brandStyle?.moodKeywords?.length) {
    lines.push('', `氛围关键词参考：${input.brandStyle.moodKeywords.join('、')}`)
  }
  lines.push('', '所有输出使用中文，口语化接地气，避免浮夸营销腔，不要用"引领""赋能"这类词。')
  return lines.join('\n')
}

function buildSchema(platforms: Platform[]) {
  const properties: Record<string, unknown> = {}
  const required: string[] = []

  if (platforms.includes('douyin')) {
    properties.douyinScript = { type: 'string' }
    required.push('douyinScript')
  }
  if (platforms.includes('xiaohongshu')) {
    properties.xiaohongshuPost = {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        body: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['title', 'body', 'tags'],
    }
    required.push('xiaohongshuPost')
  }
  if (platforms.includes('wechat_moments')) {
    properties.momentsCopy = { type: 'string' }
    required.push('momentsCopy')
  }
  if (platforms.includes('wechat_group')) {
    properties.wechatGroupMessage = { type: 'string' }
    required.push('wechatGroupMessage')
  }

  return { type: 'object', additionalProperties: false, properties, required }
}

export async function generateContentCopy(input: ContentPlanInput): Promise<ContentCopyDraft> {
  const schema = buildSchema(input.platforms)
  if (Object.keys(schema.properties).length === 0) {
    return {}
  }

  const openai = client()
  const text = buildContentCopyPrompt(input)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: text }],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'content_copy',
        strict: true,
        schema,
      },
    },
  })

  const raw = completion.choices[0]?.message?.content
  if (!raw) {
    throw new Error('OpenAI did not return content copy')
  }
  return JSON.parse(raw)
}
