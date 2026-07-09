import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const rows = await sql`SELECT id, name, address, today_revenue FROM stores ORDER BY id`
  res.status(200).json(rows)
})
