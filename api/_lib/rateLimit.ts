import { sql } from './db.js'

const WINDOW_MINUTES = 60
const MAX_REQUESTS_PER_WINDOW = 10

export function getClientIp(req: { headers: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers['x-forwarded-for']
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return value?.split(',')[0]?.trim() ?? 'unknown'
}

// Returns true if the request is allowed (and records it); false if the
// caller has exceeded MAX_REQUESTS_PER_WINDOW calls in the last WINDOW_MINUTES.
export async function checkRateLimit(ip: string, endpoint: string): Promise<boolean> {
  const [{ count }] = await sql`
    SELECT count(*) FROM api_rate_limit_events
    WHERE ip = ${ip} AND endpoint = ${endpoint} AND created_at > now() - make_interval(mins => ${WINDOW_MINUTES})
  `
  if (Number(count) >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }
  await sql`INSERT INTO api_rate_limit_events (ip, endpoint) VALUES (${ip}, ${endpoint})`
  return true
}
