import type { BrandStyleProfile, ContentImage } from '../types'
import { requestStyledImage } from '../api/client'
import { delay, pick } from './randomUtils'
import { uid } from '../utils/id'

const FOOD_EMOJI = ['🍖', '🍢', '🍗', '🥩', '🌭', '🍤']
const GRADIENTS: [string, string][] = [
  ['#E14D2A', '#F4A340'],
  ['#C13A1B', '#E14D2A'],
  ['#F2775A', '#F4A340'],
  ['#DB8A28', '#E14D2A'],
]

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function mockGenerateContentImage(
  subject: string,
  style?: BrandStyleProfile | null,
): Promise<ContentImage> {
  await delay(500)

  const emoji = pick(FOOD_EMOJI)
  const [from, to] = style?.colorPalette?.length
    ? [style.colorPalette[0], style.colorPalette[1] ?? style.colorPalette[0]]
    : pick(GRADIENTS)
  const label = subject.length > 12 ? `${subject.slice(0, 12)}…` : subject
  const safeLabel = escapeXml(label || '新品推广')
  const footerText = style ? 'AI 生成配图 · 已应用品牌风格' : 'AI 生成配图（示例)'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="600" viewBox="0 0 480 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    </defs>
    <rect width="480" height="600" fill="url(#g)" />
    <text x="240" y="260" font-size="140" text-anchor="middle">${emoji}</text>
    <text x="240" y="380" font-size="32" font-family="-apple-system, sans-serif" font-weight="600" fill="#ffffff" text-anchor="middle">${safeLabel}</text>
    <text x="240" y="418" font-size="18" font-family="-apple-system, sans-serif" fill="rgba(255,255,255,0.8)" text-anchor="middle">${footerText}</text>
  </svg>`

  const prompt = style
    ? `一张${label || '新品'}的宣传配图，风格延续品牌视觉：${style.lighting}；构图：${style.composition}；摆盘：${style.platingStyle}；氛围关键词：${style.moodKeywords.join('、')}`
    : `一张${label || '新品'}的宣传配图，暖色调，适合门店推广使用`

  return {
    id: uid('img'),
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    prompt,
  }
}

export async function generateContentImage(
  subject: string,
  style?: BrandStyleProfile | null,
): Promise<ContentImage> {
  try {
    const { dataUrl, prompt } = await requestStyledImage(subject, style ?? null)
    return { id: uid('img'), dataUrl, prompt }
  } catch (err) {
    console.error('Real image generation failed, falling back to local mock', err)
    return mockGenerateContentImage(subject, style)
  }
}
