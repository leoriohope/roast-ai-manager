import type { BrandStyleProfile } from '../src/types/index.js'
import { extractStyleFromImages, generateStyledImage } from './_lib/gemini.js'
import { withHandler } from './_lib/withHandler.js'

// Combines the two Gemini-backed actions (style extraction + image generation)
// into one function to stay under Vercel Hobby's 12-serverless-function cap.
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
    | { type: 'generate-image'; subject: string; style?: BrandStyleProfile | null }

  if (body.type === 'extract-style') {
    const images = (body.referenceImages ?? []).map(parseDataUrl)
    const draft = await extractStyleFromImages(images)
    res.status(200).json(draft)
    return
  }

  if (body.type === 'generate-image') {
    const result = await generateStyledImage(body.subject, body.style ?? null)
    res.status(200).json(result)
    return
  }

  res.status(400).json({ error: 'Unknown action type' })
})
