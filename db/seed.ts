import { sql } from '../api/_lib/db.js'
import { MOCK_STORES } from '../src/mock/stores.js'
import { MOCK_REVIEWS } from '../src/mock/reviews.js'
import { MOCK_CHECKUPS } from '../src/mock/checkupData.js'
import { MOCK_TODAY_SUMMARIES } from '../src/mock/todaySummary.js'

async function seedStores() {
  for (const s of MOCK_STORES) {
    await sql`
      INSERT INTO stores (id, name, address, today_revenue)
      VALUES (${s.id}, ${s.name}, ${s.address ?? null}, ${s.todayRevenue ?? null})
      ON CONFLICT (id) DO NOTHING
    `
  }
  console.log(`Seeded ${MOCK_STORES.length} stores.`)
}

async function seedReviews() {
  for (const r of MOCK_REVIEWS) {
    await sql`
      INSERT INTO reviews (id, store_id, author, rating, content, sentiment, keywords, created_at, platform)
      VALUES (${r.id}, ${r.storeId}, ${r.author}, ${r.rating}, ${r.content}, ${r.sentiment}, ${sql.array(r.keywords)}, ${r.createdAt}, ${r.platform})
      ON CONFLICT (id) DO NOTHING
    `
  }
  console.log(`Seeded ${MOCK_REVIEWS.length} reviews.`)
}

async function seedCheckups() {
  const entries = Object.values(MOCK_CHECKUPS)
  for (const c of entries) {
    await sql`
      INSERT INTO store_checkups (store_id, health_score, issues, weekly_suggestions, updated_at)
      VALUES (${c.storeId}, ${c.healthScore}, ${sql.json(c.issues as any)}, ${sql.json(c.weeklySuggestions as any)}, ${c.updatedAt})
      ON CONFLICT (store_id) DO NOTHING
    `
  }
  console.log(`Seeded ${entries.length} store checkups.`)
}

async function seedTodaySummaries() {
  const entries = Object.values(MOCK_TODAY_SUMMARIES)
  for (const t of entries) {
    await sql`
      INSERT INTO today_summaries (store_id, headline, recommended_tasks, weekly_metrics)
      VALUES (${t.storeId}, ${t.headline}, ${sql.json(t.recommendedTasks as any)}, ${sql.json(t.weeklyMetrics as any)})
      ON CONFLICT (store_id) DO NOTHING
    `
  }
  console.log(`Seeded ${entries.length} today summaries.`)
}

async function main() {
  await seedStores()
  await seedReviews()
  await seedCheckups()
  await seedTodaySummaries()
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
