import { GoogleGenAI, Modality, Type } from '@google/genai'
import type { BrandStyleProfile, BrandStyleProfileDraft } from '../../src/types/index.js'
import { buildImagePrompt } from './imagePrompt.js'

function client(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set')
  }
  return new GoogleGenAI({ apiKey })
}

const STYLE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    visualFormat: { type: Type.STRING },
    colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
    lighting: { type: Type.STRING },
    composition: { type: Type.STRING },
    platingStyle: { type: Type.STRING },
    moodKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ['visualFormat', 'colorPalette', 'lighting', 'composition', 'platingStyle', 'moodKeywords'],
}

export async function extractStyleFromImages(
  images: { mimeType: string; data: string }[],
): Promise<BrandStyleProfileDraft> {
  const ai = client()

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: '分析这些餐厅/菜品照片的视觉呈现形式和风格。首先判断：这些图片是真实拍摄的美食摄影照片，还是包含文字/图形设计元素的海报类素材？用一句话描述这个视觉呈现形式（visualFormat）。然后提炼出色调、打光、构图习惯、摆盘风格和氛围关键词，用于之后生成风格一致的营销配图。',
          },
          ...images.map((img) => ({ inlineData: img })),
        ],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: STYLE_SCHEMA,
    },
  })

  const parsed = JSON.parse(response.text ?? '{}')

  return {
    generatedAt: new Date().toISOString(),
    visualFormat: parsed.visualFormat ?? '',
    colorPalette: parsed.colorPalette ?? [],
    lighting: parsed.lighting ?? '',
    composition: parsed.composition ?? '',
    platingStyle: parsed.platingStyle ?? '',
    moodKeywords: parsed.moodKeywords ?? [],
    referenceImageCount: images.length,
  }
}

export async function generateStyledImage(
  subject: string,
  style: BrandStyleProfile | null,
): Promise<{ dataUrl: string; prompt: string }> {
  const ai = client()
  const prompt = buildImagePrompt(subject, style)

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image',
    contents: prompt,
    config: {
      responseModalities: [Modality.IMAGE],
    },
  })

  const base64 = response.data
  if (!base64) {
    throw new Error('Gemini did not return image data')
  }

  return {
    dataUrl: `data:image/png;base64,${base64}`,
    prompt,
  }
}
