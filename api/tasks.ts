import type { Task } from '../src/types/index.js'
import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

const TASK_COLUMNS = sql`id, title, description, source, store_id, status, created_at, related_result_id`

export default withHandler(async (req, res) => {
  if (req.method === 'GET') {
    const rows = await sql`SELECT ${TASK_COLUMNS} FROM tasks ORDER BY created_at DESC`
    res.status(200).json(rows)
    return
  }

  if (req.method === 'POST') {
    const body = req.body as Omit<Task, 'id' | 'createdAt'>
    const [row] = await sql`
      INSERT INTO tasks (title, description, source, store_id, status, related_result_id)
      VALUES (${body.title}, ${body.description ?? null}, ${body.source}, ${body.storeId}, ${body.status ?? 'pending'}, ${body.relatedResultId ?? null})
      RETURNING ${TASK_COLUMNS}
    `
    res.status(201).json(row)
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
})
