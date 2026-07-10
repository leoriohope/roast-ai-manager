export interface BrandStyleProfile {
  id: string
  generatedAt: string
  colorPalette: string[]
  lighting: string
  composition: string
  platingStyle: string
  moodKeywords: string[]
  referenceImageCount: number
}

export type BrandStyleProfileDraft = Omit<BrandStyleProfile, 'id'>
