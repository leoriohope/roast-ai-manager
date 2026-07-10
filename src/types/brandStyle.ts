export interface BrandStyleProfile {
  id: string
  generatedAt: string
  // Whether the reference images read as real photography or graphic/poster
  // design, e.g. "真实美食摄影风格，无文字覆盖" — placed first in the
  // generation prompt since GPT Image 2 weights earlier words most heavily.
  visualFormat: string
  colorPalette: string[]
  lighting: string
  composition: string
  platingStyle: string
  moodKeywords: string[]
  referenceImageCount: number
}

export type BrandStyleProfileDraft = Omit<BrandStyleProfile, 'id'>
