import type { ContentPlan, ContentPlanInput } from '../src/types/index.js'
import { generateContentCopy } from './_lib/contentCopy.js'
import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

// PATCH (generate copy draft) is folded into this same function rather than
// a new file — Vercel Hobby caps deployments at 12 serverless functions and
// this project is already at that limit.
export default withHandler(async (req, res) => {
  if (req.method === 'PATCH') {
    const input = req.body as ContentPlanInput
    const draft = await generateContentCopy(input)
    res.status(200).json(draft)
    return
  }

  if (req.method === 'GET') {
    const rows = await sql`SELECT id, generated_at, payload FROM content_plans ORDER BY generated_at DESC`
    res.status(200).json(rows.map((r) => ({ ...r.payload, id: r.id, generatedAt: r.generatedAt })))
    return
  }

  if (req.method === 'POST') {
    const { storeId, ...plan } = req.body as ContentPlan & { storeId: string }
    const [row] = await sql`
      INSERT INTO content_plans (store_id, generated_at, payload)
      VALUES (${storeId}, ${plan.generatedAt}, ${sql.json(plan as any)})
      RETURNING id, generated_at, payload
    `
    res.status(201).json({ ...row.payload, id: row.id, generatedAt: row.generatedAt })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
})
