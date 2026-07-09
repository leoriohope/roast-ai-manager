import { sql } from '../_lib/db.js'
import { withHandler } from '../_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const storeId = req.query.storeId as string
  const rows = await sql`
    SELECT store_id, headline, recommended_tasks, weekly_metrics
    FROM today_summaries
    WHERE store_id = ${storeId}
  `
  if (rows.length === 0) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.status(200).json(rows[0])
})
