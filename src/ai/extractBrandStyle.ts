import type { BrandStyleProfileDraft } from '../types'
import { requestBrandStyleDraft } from '../api/client'
import { delay, pick, sample } from './randomUtils'

const COLOR_PALETTES: string[][] = [
  ['#E14D2A', '#F4A340', '#2B1B12'],
  ['#C13A1B', '#F2C94C', '#3E2723'],
  ['#DB8A28', '#8B3A1A', '#F2E4C9'],
]
const LIGHTING_OPTIONS = [
  '暖色调自然光，突出食材油脂光泽',
  '柔和顶光，营造围炉温馨感',
  '低角度暖光，强化炭火烟熏氛围',
]
const COMPOSITION_OPTIONS = [
  '近景特写，浅景深，突出主体食材纹理',
  '俯拍构图，多道菜品有序摆盘入镜',
  '45度视角，餐桌场景与食材并重',
]
const PLATING_STYLE_OPTIONS = ['铁盘直烤，粗犷烟火气摆盘', '精致小份分装，留白较多', '大份量共享装盘，热闹氛围']
const MOOD_KEYWORD_POOL = ['烟火气', '治愈', '朋友聚会', '深夜食堂', '精致', '热闹', '家常', '新鲜']

async function mockExtractBrandStyle(referenceImages: string[]): Promise<BrandStyleProfileDraft> {
  await delay(1200)
  return {
    generatedAt: new Date().toISOString(),
    colorPalette: pick(COLOR_PALETTES),
    lighting: pick(LIGHTING_OPTIONS),
    composition: pick(COMPOSITION_OPTIONS),
    platingStyle: pick(PLATING_STYLE_OPTIONS),
    moodKeywords: sample(MOOD_KEYWORD_POOL, 3),
    referenceImageCount: referenceImages.length,
  }
}

export async function extractBrandStyle(referenceImages: string[]): Promise<BrandStyleProfileDraft> {
  try {
    return await requestBrandStyleDraft(referenceImages)
  } catch (err) {
    console.error('Real brand style extraction failed, falling back to local mock', err)
    return mockExtractBrandStyle(referenceImages)
  }
}
