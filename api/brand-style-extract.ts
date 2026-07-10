import { extractStyleFromImages } from './_lib/gemini.js'
import { withHandler } from './_lib/withHandler.js'

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
  const { referenceImages } = req.body as { referenceImages: string[] }
  const images = (referenceImages ?? []).map(parseDataUrl)
  const draft = await extractStyleFromImages(images)
  res.status(200).json(draft)
})
