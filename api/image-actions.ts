import type { BrandStyleProfile, ImageProvider } from '../src/types/index.js'
import { extractStyleFromImages, generateStyledImage } from './_lib/gemini.js'
import { generateStyledImageOpenAI } from './_lib/openai.js'
import { checkRateLimit, getClientIp } from './_lib/rateLimit.js'
import { withHandler } from './_lib/withHandler.js'

// Combines style extraction (always Gemini) and image generation (provider-
// selectable: Gemini or OpenAI) into one function to stay under Vercel
// Hobby's 12-serverless-function cap.
function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
  if (!match) {
    throw new Error('Invalid image data URL')
  }
  return { mimeType: match[1], data: match[2] }
}

export default withHandler(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body as
    | { type: 'extract-style'; referenceImages: string[] }
    | {
        type: 'generate-image'
        subject: string
        style?: BrandStyleProfile | null
        provider?: ImageProvider
      }

  if (body.type === 'extract-style') {
    const images = (body.referenceImages ?? []).map(parseDataUrl)
    const draft = await extractStyleFromImages(images)
    res.status(200).json(draft)
    return
  }

  if (body.type === 'generate-image') {
    const ip = getClientIp(req)
    const allowed = await checkRateLimit(ip, 'generate-image')
    if (!allowed) {
      res.status(429).json({ error: 'Rate limit exceeded, please try again later' })
      return
    }

    const provider = body.provider ?? 'gemini'
    const result =
      provider === 'openai'
        ? await generateStyledImageOpenAI(body.subject, body.style ?? null)
        : await generateStyledImage(body.subject, body.style ?? null)
    res.status(200).json(result)
    return
  }

  res.status(400).json({ error: 'Unknown action type' })
})
