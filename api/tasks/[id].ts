import type { TaskStatus } from '../../src/types/index.js'
import { sql } from '../_lib/db.js'
import { withHandler } from '../_lib/withHandler.js'

const TASK_COLUMNS = sql`id, title, description, source, store_id, status, created_at, related_result_id`

export default withHandler(async (req, res) => {
  if (req.method !== 'PATCH') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const id = req.query.id as string
  const { status } = req.body as { status: TaskStatus }

  const [row] = await sql`
    UPDATE tasks SET status = ${status} WHERE id = ${id}
    RETURNING ${TASK_COLUMNS}
  `
  if (!row) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.status(200).json(row)
})
