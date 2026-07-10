import type { Platform } from './launch'
import type { BrandStyleProfile } from './brandStyle'

export interface ContentPlanInput {
  storeId: string
  promotionObject: string
  platforms: Platform[]
  brandStyle?: BrandStyleProfile | null
}

export interface ContentImage {
  id: string
  dataUrl: string
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
