import type { Platform } from './launch'
import type { BrandStyleProfile } from './brandStyle'

export type ImageProvider = 'gemini' | 'openai'

export interface ContentPlanInput {
  storeId: string
  promotionObject: string
  platforms: Platform[]
  brandStyle?: BrandStyleProfile | null
  imageProvider?: ImageProvider
}

export interface ContentImage {
  id: string
  url: string
  prompt: string
}

export interface ContentPlan {
  id: string
  promotionObject: string
  generatedAt: string
  douyinScript?: string
  xiaohongshuPost?: { title: string; body: string; tags: string[] }
  momentsCopy?: string
  wechatGroupMessage?: string
  coverImage?: ContentImage
}
