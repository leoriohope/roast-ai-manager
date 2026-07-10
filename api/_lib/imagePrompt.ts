import type { BrandStyleProfile } from '../../src/types/index.js'

const NO_TEXT_CONSTRAINT = '不出现任何文字、水印或品牌logo。'

// Non-store-level base description — without this, a generic subject like
// "新品" gives the model zero indication this is a Chinese BBQ restaurant,
// and it can generate completely unrelated food.
const CUISINE_CONTEXT = '这是一家中式烤肉/烧烤餐厅，画面里的食物应该是烤肉、烤串或搭配的烤肉店餐食。'

// Shared by both Gemini and OpenAI image generation — visualFormat is placed
// right after the core subject (highest-weighted position) since it's the
// dimension that decides "real photography" vs "poster/graphic design",
// which is what actually determines how the whole image reads.
export function buildImagePrompt(subject: string, style: BrandStyleProfile | null): string {
  if (!style) {
    return `一张"${subject}"的餐厅营销配图。${CUISINE_CONTEXT}暖色调，适合社交媒体推广使用。${NO_TEXT_CONSTRAINT}`
  }

  const parts = [`一张"${subject}"的餐厅营销配图。`, CUISINE_CONTEXT]
  if (style.visualFormat) {
    parts.push(`视觉呈现：${style.visualFormat}。`)
  }
  parts.push(
    `色调以${style.colorPalette.join('、')}为主；打光：${style.lighting}；构图：${style.composition}；摆盘风格：${style.platingStyle}；氛围关键词：${style.moodKeywords.join('、')}。`,
  )
  parts.push(NO_TEXT_CONSTRAINT)
  return parts.join('')
}
