# 烤肉 AI 店长 (Roast AI Manager)

Mobile-first AI operations assistant for a Chengdu chained BBQ restaurant, in pilot with a real client (南北征赞·野核桃东北烤肉). Started as a mock-only frontend prototype; now has a real Vercel-serverless backend, a Postgres database, real OpenAI/Gemini calls for copy and images, and an access-code gate protecting the whole app. See `ROADMAP.md` for what's real vs. still planned.

## Run

```bash
npm install
npm run dev       # dev server
npm run typecheck # tsc --noEmit (frontend + api/)
npm run build     # typecheck + production build
npm run preview   # preview the production build

npm run db:migrate # apply db/schema.sql (idempotent)
npm run db:seed    # load seed data (stores, reviews, ...)
npm run db:reset   # drop, recreate, and reseed
```

Needs `DATABASE_URL`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, and `ACCESS_CODE` set (plus a Vercel Blob store attached for image uploads). Each of `dev`/`uat`/`main` is a separate Vercel environment with its own values — without them, the app falls back to local mock/template generation wherever a real API call fails.

## Demo flow

1. **今天 (Today)** — daily summary, recommended tasks, weekly metrics, tasks added from other pages.
2. **上新助手 (Launch Assistant)** — the core flow: fill in a new dish/package, generate a full launch plan (positioning, selling points, Douyin/Xiaohongshu/Moments/WeChat-group copy, group-buy titles, bundle suggestion, staff script, 7-day calendar, risk reminders), then add it to Today's tasks.
3. **门店体检 (Store Checkup)** — health score, issues with evidence, weekly suggestions.
4. **套餐设计 (Package)** — pick a goal (traffic / profit / gathering / off-peak / birthday) to generate a package, then jump straight to promotional content for it.
5. **内容生成 (Content)** — generate platform-specific copy for any promotion object.
6. **评价管理 (Review)** — keyword-tagged reviews, AI-analyzed summary, suggested replies, turn a positive review into promo content.
7. **AI 助手 (Assistant)** — simple keyword-matched chat for quick questions.

Switch stores via the top-right store switcher — most pages react to the selected store (春熙路店 / 太古里店 / 建设路店 / 高新区店).

## What's mock vs. what's real

- `src/mock/` — static seed data (stores, reviews, today/checkup content), loaded into Postgres by `npm run db:seed`.
- `src/ai/` — generator functions (`generateLaunchPlan`, `generatePackagePlan`, `generateContentPlan`, `analyzeReviews`, `generateAssistantReply`, `extractBrandStyle`, `generateContentImage`). Pages only ever call these, never `mock/` or `src/api/client.ts` directly. Most of them call the real backend (`api/*.ts` → OpenAI/Gemini) first and fall back to the original template-based mock logic in a `catch` if that call fails — see below for which ones don't call out at all yet.
- Real AI is live for: launch-plan copy, content-plan copy (per-platform tone), brand-style extraction from reference photos, and image generation (OpenAI GPT Image 2 or Gemini, prompted to match the extracted brand style).
- Not yet real: review sentiment/keyword analysis (`analyzeReviews`) and the assistant's chat replies (`generateAssistantReply`) are still pure local logic, no API call at all. Store checkup and today-summary content aren't AI-generated either way — they're seed data read straight from Postgres.
- Shared data (stores, tasks, generated results, reviews, chat history) lives in Postgres and is fetched from `/api/*` on load. Only the current store selection and an in-progress, unsubmitted launch-form draft persist to `localStorage`, so switching devices doesn't lose the rest of your data but does lose those two.
- The whole app sits behind a shared access-code gate (`AccessGate`), since this is now used by a real pilot client rather than only internally.
