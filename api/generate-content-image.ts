import type { BrandStyleProfile } from '../src/types/index.js'
import { generateStyledImage } from './_lib/gemini.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const { subject, style } = req.body as { subject: string; style?: BrandStyleProfile | null }
  const result = await generateStyledImage(subject, style ?? null)
  res.status(200).json(result)
})
