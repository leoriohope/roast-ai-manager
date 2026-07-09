import { sql } from '../api/_lib/db.js'

async function main() {
  const schemaPath = new URL('./schema.sql', import.meta.url)
  await sql.file(schemaPath.pathname)
  console.log('Schema applied.')
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
