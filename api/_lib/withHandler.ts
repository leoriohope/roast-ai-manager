import type { VercelRequest, VercelResponse } from '@vercel/node'

export function withHandler(fn: (req: VercelRequest, res: VercelResponse) => Promise<void>) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const required = process.env.ACCESS_CODE
    if (required && req.headers['x-access-code'] !== required) {
      res.status(401).json({ error: 'Invalid access code' })
      return
    }
    try {
      await fn(req, res)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
