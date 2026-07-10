import { sql } from '../api/_lib/db.js'

const TABLES = [
  'api_rate_limit_events',
  'brand_style_profiles',
  'chat_messages',
  'content_plans',
  'package_plans',
  'launch_results',
  'tasks',
  'today_summaries',
  'store_checkups',
  'reviews',
  'stores',
]

async function main() {
  await sql.unsafe(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY CASCADE`)
  console.log('Truncated all tables.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
