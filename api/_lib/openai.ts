import OpenAI from 'openai'
import type { BrandStyleProfile } from '../../src/types/index.js'
import { buildImagePrompt } from './imagePrompt.js'

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
  const prompt = buildImagePrompt(subject, style)

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
