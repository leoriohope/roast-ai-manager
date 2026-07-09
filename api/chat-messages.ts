import type { ChatMessage } from '../src/types/index.js'
import { sql } from './_lib/db.js'
import { withHandler } from './_lib/withHandler.js'

export default withHandler(async (req, res) => {
  if (req.method === 'GET') {
    const rows = await sql`SELECT id, role, content, created_at FROM chat_messages ORDER BY created_at ASC`
    res.status(200).json(rows)
    return
  }

  if (req.method === 'POST') {
    const body = req.body as Omit<ChatMessage, 'id' | 'createdAt'>
    const [row] = await sql`
      INSERT INTO chat_messages (role, content)
      VALUES (${body.role}, ${body.content})
      RETURNING id, role, content, created_at
    `
    res.status(201).json(row)
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
})
