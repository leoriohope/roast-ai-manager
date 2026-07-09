import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const rows = await sql`
    SELECT id, store_id, author, rating, content, sentiment, keywords, created_at, platform
    FROM reviews
    ORDER BY created_at DESC
  `
  res.status(200).json(rows)
})
