# 烤肉 AI 店长 (Roast AI Manager)

Mobile-first web app for a real Chengdu BBQ chain's AI operations assistant, currently in pilot with client 南北征赞·野核桃东北烤肉. Started as a mock-only MVP; now has a real backend, database, AI calls, and an access-code gate (see `ROADMAP.md` for what's real vs. still planned). Full plan: `/Users/liangdingli/.claude/plans/product-brief-for-linear-tiger.md`.

## Stack

- **Frontend**: Vite + React + TypeScript, Tailwind CSS, npm. No router — navigation is state-based tab switching (`state.currentTab`) via `BottomNav`, not URL routes.
- **Backend**: Vercel Serverless Functions in `api/*.ts` (kept under Vercel Hobby's 12-function cap — some routes are merged, e.g. `image-actions.ts` handles both style extraction and image generation). Every handler is wrapped in `withHandler` (`api/_lib/withHandler.ts`), which rejects requests missing the `x-access-code` header when `ACCESS_CODE` is set.
- **Database**: Postgres, accessed via `postgres` (`api/_lib/db.ts`, snake_case ↔ camelCase auto-mapped). Schema in `db/schema.sql`, applied with `npm run db:migrate` (idempotent, `IF NOT EXISTS`). Generated-result tables (`launch_results`, `package_plans`, `content_plans`) store the AI output as `jsonb`, so changes to `src/ai/*.ts` output shape never require a migration.
- **File storage**: generated images upload to Vercel Blob (`api/_lib/blob.ts`); only the resulting URL is stored in Postgres, not the image bytes.
- **Real AI providers**: OpenAI (text copy + GPT Image 2) and Gemini (`gemini-flash-latest` for brand-style extraction, `gemini-3.1-flash-image` for image generation) — see `api/_lib/openai.ts`, `api/_lib/gemini.ts`.

## Conventions

- **The `ai/` seam**: pages call `ai/generateX()` functions only, never `mock/*` or `src/api/client.ts` directly. `mock/` holds static seed data (stores, reviews); `ai/` holds generator functions that call the real backend and **fall back to local template logic in a `catch` if the API call fails** (e.g. missing key, provider error) — see `generateLaunchPlan.ts` for the pattern. This is also the seam that isolated the real-AI swap-in to `ai/*.ts` + `api/_lib/*.ts` without touching any page component.
- **Business logic stays local, never sent to AI**: pricing math, risk-rule reminders, and the day-by-day calendar rotation in launch plans are deterministic and computed client-side, not generated — only creative copy (positioning, scripts, social posts) goes to a model.
- **State**: single `AppContext` + `useReducer` (`src/state/appReducer.ts`). Shared data (stores, tasks, generated results, chat, reviews) is fetched from `/api/*` on bootstrap; only `currentStoreId` and an in-progress `launchDraft` persist to `localStorage` (`src/state/persistence.ts`) since they have no cross-device value. No Redux/Zustand. Access via `useApp()`; use `useToast()` for toast feedback.
- **Access control**: `AccessGate` (`src/components/AccessGate.tsx`) blocks the whole app behind a shared access code checked against every API call; `api/_lib/rateLimit.ts` caps paid image-generation calls per IP. This exists because the app is now open to a real pilot client, not just an internal demo.
- **UI language**: Chinese throughout, direct/concrete wording ("生成上新方案", "差评怎么回"). Avoid abstract SaaS jargon ("智能增长矩阵" etc.).
- **Visual style**: warm beige background, BBQ red/orange primary, amber accent, white rounded cards, large tap targets. No enterprise-blue dashboard look. Theme tokens live in `tailwind.config.ts` (`bg`, `primary`, `accent`, `ink`, `line`).
- **Mobile-first**: design at ~390px viewport first.

## Commands

- `npm run dev` — dev server
- `npm run typecheck` — `tsc --noEmit` (frontend + `api/`)
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build
- `npm run db:migrate` — apply `db/schema.sql`
- `npm run db:seed` — load seed data (stores, reviews, etc.)
- `npm run db:reset` — drop and recreate, then seed

Requires env vars `DATABASE_URL`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `ACCESS_CODE` (and a Vercel Blob store attached for image uploads) — set per environment in Vercel, not committed.

## Verification

After each build phase: `npm run typecheck && npm run build`, then drive the app with Playwright (`npx playwright install chromium` if not yet installed) — screenshot key flows and check `console --errors` equivalent (page `console`/`pageerror` listeners). See git history / conversation for phase-by-phase verification checklists.
