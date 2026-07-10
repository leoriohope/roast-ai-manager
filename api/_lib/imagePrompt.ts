import type { BrandStyleProfile } from '../../src/types/index.js'
import { BRAND_NAME } from './brandContext.js'

const NO_TEXT_CONSTRAINT = '不出现任何文字、水印或品牌logo。'

// Non-store-level base description — without this, a generic subject like
// "新品" gives the model zero indication this is a Chinese BBQ restaurant,
// and it can generate completely unrelated food. Concrete visual signatures
// (charcoal fire, specific cuts, tableside grilling) come first since GPT
// Image 2 weights earlier words more heavily; abstract brand-positioning
// language is left out entirely because it doesn't change what gets drawn.
const CUISINE_CONTEXT =
  `这是"${BRAND_NAME}"品牌门店，主打东北风味炭火烤肉——木炭明火烤制，不是电烤炉。` +
  `核心食材是鲜切牛肉，常见部位有丹东小黄牛、牛肋条、横膈膜、牛五花、雪花牛肉。` +
  `画面可以是店员在餐桌旁的炭炉上专业代烤、翻面、分切牛肉，也可以是烤好的牛肉、` +
  `或搭配的东北特色菜（如冷面、拌饭、凉菜、冻梨）。`

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
