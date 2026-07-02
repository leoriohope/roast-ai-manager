import type { Platform } from './launch'

export interface ContentPlanInput {
  storeId: string
  promotionObject: string
  platforms: Platform[]
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
