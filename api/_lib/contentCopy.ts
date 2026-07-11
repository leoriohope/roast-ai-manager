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

// Heuristic: does the promotion object read as an ambiance/occasion subject
// (门店氛围/下班小聚/生日聚会 and similar free-text) rather than a specific
// dish/combo? Free text from the user can't be perfectly classified, but a
// keyword hint plus an explicit negative constraint makes the model actually
// follow the "don't describe dish taste" instruction — a softer "if X then Y"
// phrasing wasn't strong enough (verified: ambiance-subject copy still
// described specific cuts/taste almost as much as dish-subject copy did).
const AMBIANCE_KEYWORDS = ['氛围', '场景', '聚会', '小聚', '生日', '环境', '下班', '约会', '节日', '周年']

function buildContentCopyPrompt(input: ContentPlanInput): string {
  const platformList = input.platforms.map((p) => PLATFORM_LABEL[p]).join('、')
  const isAmbianceSubject = AMBIANCE_KEYWORDS.some((kw) => input.promotionObject.includes(kw))

  const lines = [
    `你是"${BRAND_NAME}"品牌的社交媒体文案专家。`,
    BRAND_DESCRIPTION,
    '',
    `推广对象：${input.promotionObject}`,
  ]

  if (isAmbianceSubject) {
    lines.push(
      '这次推广对象是氛围/场景/聚会类，不是具体某道菜。文案重点要写：门店环境装修、灯光氛围、桌边代烤的热闹感、朋友/家人围炉社交互动、适合的场合心情。' +
        '【不要】具体描述某道菜的口感、部位或烹饪细节（比如不要写"雪花牛肉入口即化"这种菜品测评式句子），"烤肉"作为背景提一下即可，重点始终是氛围和体验，不是菜品测评。',
    )
  } else {
    lines.push(
      '这次推广对象是具体菜品/套餐，文案要具体描述这道菜的口感、食材、烹饪方式、卖点，让读者看了就想吃，不要泛泛而谈。',
    )
  }

  lines.push('', `需要为以下渠道分别生成文案：${platformList}。每个渠道的语气、结构、长度要有明显区别，不能是同一段话换个开头：`)
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
