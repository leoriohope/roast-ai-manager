# 烤肉 AI 店长 (Roast AI Manager)

Mobile-first web prototype for a Chengdu BBQ restaurant AI operations assistant. Demo/pilot MVP — no backend, no auth, no database, no real AI API. Full plan: `/Users/liangdingli/.claude/plans/product-brief-for-linear-tiger.md`.

## Stack

Vite + React + TypeScript, Tailwind CSS, npm. No router — navigation is state-based tab switching (`state.currentTab`) via `BottomNav`, not URL routes.

## Conventions

- **The `ai/` seam**: pages call `ai/generateX()` functions only, never `mock/*` directly for generation. `mock/` holds static seed data (stores, reviews); `ai/` holds generator functions that produce results. This isolates the future real-AI-API swap-in to `ai/*.ts` files only.
- **State**: single `AppContext` + `useReducer` (`src/state/appReducer.ts`). No Redux/Zustand — app is single-session, no server sync. Access via `useApp()`; use `useToast()` for toast feedback.
- **UI language**: Chinese throughout, direct/concrete wording ("生成上新方案", "差评怎么回"). Avoid abstract SaaS jargon ("智能增长矩阵" etc.).
- **Visual style**: warm cream background, deep maroon-brown primary, olive-green accent (matches the 南北征赞·野核桃东北烤肉 brand palette — charcoal/walnut/moss green), white rounded cards, large tap targets. No enterprise-blue dashboard look. Theme tokens live in `tailwind.config.ts` (`bg`, `primary`, `accent`, `ink`, `line`).
- **Mobile-first**: design at ~390px viewport first.

## Commands

- `npm run dev` — dev server
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build

## Verification

After each build phase: `npm run typecheck && npm run build`, then drive the app with Playwright (`npx playwright install chromium` if not yet installed) — screenshot key flows and check `console --errors` equivalent (page `console`/`pageerror` listeners). See git history / conversation for phase-by-phase verification checklists.
