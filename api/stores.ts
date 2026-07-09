import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  // cast: numeric columns serialize as strings via postgres.js to avoid precision loss,
  // but todayRevenue is typed as number in src/types — float8 comes back as a real JS number
  const rows = await sql`SELECT id, name, address, today_revenue::float8 AS today_revenue FROM stores ORDER BY id`
  res.status(200).json(rows)
})
