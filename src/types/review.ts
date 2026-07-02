export type ReviewSentiment = 'positive' | 'negative' | 'neutral'

export interface Review {
  id: string
  storeId: string
  author: string
  rating: number
  content: string
  sentiment: ReviewSentiment
  keywords: string[]
  createdAt: string
  platform: 'meituan_dianping' | 'douyin' | 'xiaohongshu'
}

export interface ReviewAnalysis {
  storeId: string
  positiveKeywords: { keyword: string; count: number }[]
  negativeKeywords: { keyword: string; count: number }[]
  summary: string
  suggestedReplies: Record<string, string>
  internalSuggestions: string[]
}
