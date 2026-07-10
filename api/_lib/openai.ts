import OpenAI from 'openai'
import type { BrandStyleProfile } from '../../src/types/index.js'

function client(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set')
  }
  return new OpenAI({ apiKey })
}

export async function generateStyledImageOpenAI(
  subject: string,
  style: BrandStyleProfile | null,
): Promise<{ dataUrl: string; prompt: string }> {
  const openai = client()

  const prompt = style
    ? `一张"${subject}"的餐厅营销配图。风格要求：色调以${style.colorPalette.join('、')}为主；打光：${style.lighting}；构图：${style.composition}；摆盘风格：${style.platingStyle}；氛围关键词：${style.moodKeywords.join('、')}。`
    : `一张"${subject}"的餐厅营销配图，暖色调，适合社交媒体推广使用。`

  const result = await openai.images.generate({
    model: 'gpt-image-2',
    prompt,
    size: '1024x1024',
  })

  const base64 = result.data?.[0]?.b64_json
  if (!base64) {
    throw new Error('OpenAI did not return image data')
  }

  return {
    dataUrl: `data:image/png;base64,${base64}`,
    prompt,
  }
}
