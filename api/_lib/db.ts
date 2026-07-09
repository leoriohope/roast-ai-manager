import postgres from 'postgres'

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined
}

function createClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }
  // snake_case columns <-> camelCase JS, so rows match src/types/* shapes with zero manual mapping
  return postgres(connectionString, { ssl: 'require', transform: postgres.camel })
}

// Reused across warm serverless invocations instead of opening a new pool per request.
export const sql = globalThis.__sql ?? createClient()
if (!globalThis.__sql) {
  globalThis.__sql = sql
}
