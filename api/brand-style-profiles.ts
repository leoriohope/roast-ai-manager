import type { BrandStyleProfileDraft } from '../src/types/index.js'
import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method === 'GET') {
    const rows = await sql`SELECT id, generated_at, payload FROM brand_style_profiles ORDER BY generated_at DESC LIMIT 1`
    if (rows.length === 0) {
      res.status(200).json(null)
      return
    }
    const [row] = rows
    res.status(200).json({ ...row.payload, id: row.id, generatedAt: row.generatedAt })
    return
  }

  if (req.method === 'POST') {
    const profile = req.body as BrandStyleProfileDraft
    const [row] = await sql`
      INSERT INTO brand_style_profiles (generated_at, payload)
      VALUES (${profile.generatedAt}, ${sql.json(profile as any)})
      RETURNING id, generated_at, payload
    `
    res.status(201).json({ ...row.payload, id: row.id, generatedAt: row.generatedAt })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
})
