import type { LaunchPlanResult } from '../src/types/index.js'
import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method === 'GET') {
    const rows = await sql`SELECT id, generated_at, payload FROM launch_results ORDER BY generated_at DESC`
    res.status(200).json(rows.map((r) => ({ ...r.payload, id: r.id, generatedAt: r.generatedAt })))
    return
  }

  if (req.method === 'POST') {
    const body = req.body as LaunchPlanResult
    const [row] = await sql`
      INSERT INTO launch_results (store_id, generated_at, payload)
      VALUES (${body.formSnapshot.storeId}, ${body.generatedAt}, ${sql.json(body as any)})
      RETURNING id, generated_at, payload
    `
    res.status(201).json({ ...row.payload, id: row.id, generatedAt: row.generatedAt })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
})
