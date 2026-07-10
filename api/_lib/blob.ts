import { put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'

// Generated images arrive as data:<mime>;base64,<data> URIs from the AI
// providers. Storing those directly in Postgres (content_plans.payload) would
// bloat the JSONB column by a few MB per generation; instead we upload the
// bytes to Vercel Blob and keep only the resulting URL in the database.
export async function uploadGeneratedImage(dataUrl: string): Promise<string> {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl)
  if (!match) {
    throw new Error('Invalid image data URL')
  }
  const [, mimeType, base64] = match
  const ext = mimeType.split('/')[1] ?? 'png'
  const buffer = Buffer.from(base64, 'base64')

  const blob = await put(`content-images/${randomUUID()}.${ext}`, buffer, {
    access: 'public',
    contentType: mimeType,
  })

  return blob.url
}
