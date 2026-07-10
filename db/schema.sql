-- 烤肉 AI 店长 — database schema
-- Run once per environment via `npm run db:migrate`. Idempotent (IF NOT EXISTS).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Seed-only tables: no create/update endpoints, app reads them as-is.

CREATE TABLE IF NOT EXISTS stores (
  id text PRIMARY KEY,
  name text NOT NULL,
  address text,
  today_revenue numeric
);

CREATE TABLE IF NOT EXISTS reviews (
  id text PRIMARY KEY,
  store_id text NOT NULL REFERENCES stores(id),
  author text NOT NULL,
  rating int NOT NULL,
  content text NOT NULL,
  sentiment text NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  keywords text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL,
  platform text NOT NULL CHECK (platform IN ('meituan_dianping', 'douyin', 'xiaohongshu'))
);
CREATE INDEX IF NOT EXISTS reviews_store_id_idx ON reviews (store_id);

CREATE TABLE IF NOT EXISTS store_checkups (
  store_id text PRIMARY KEY REFERENCES stores(id),
  health_score int NOT NULL,
  issues jsonb NOT NULL,
  weekly_suggestions jsonb NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS today_summaries (
  store_id text PRIMARY KEY REFERENCES stores(id),
  headline text NOT NULL,
  recommended_tasks jsonb NOT NULL,
  weekly_metrics jsonb NOT NULL
);

-- Real CRUD tables: server-generated ids.

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  source text NOT NULL CHECK (source IN ('launch', 'checkup', 'package', 'content', 'review', 'manual')),
  store_id text NOT NULL REFERENCES stores(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
  created_at timestamptz NOT NULL DEFAULT now(),
  related_result_id uuid
);
CREATE INDEX IF NOT EXISTS tasks_store_id_idx ON tasks (store_id);

-- Generated-result tables store the exact TS payload as JSONB; only the columns
-- actually filtered/sorted on are promoted. Keeps ai/*.ts output shape changes
-- from ever requiring a migration.

CREATE TABLE IF NOT EXISTS launch_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text NOT NULL REFERENCES stores(id),
  generated_at timestamptz NOT NULL,
  payload jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS launch_results_store_id_idx ON launch_results (store_id);

CREATE TABLE IF NOT EXISTS package_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text NOT NULL REFERENCES stores(id),
  generated_at timestamptz NOT NULL,
  payload jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS package_plans_store_id_idx ON package_plans (store_id);

CREATE TABLE IF NOT EXISTS content_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id text NOT NULL REFERENCES stores(id),
  generated_at timestamptz NOT NULL,
  payload jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS content_plans_store_id_idx ON content_plans (store_id);

-- Intentionally no store_id — matches the existing ChatMessage type exactly.
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Brand-wide (not per-store) visual style profile. Append-only: every
-- extract+save cycle inserts a new row; "current style" = latest row by
-- generated_at. No store_id — style is shared across all stores. Raw
-- reference images are never persisted, only the extracted profile.
CREATE TABLE IF NOT EXISTS brand_style_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generated_at timestamptz NOT NULL,
  payload jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS brand_style_profiles_generated_at_idx ON brand_style_profiles (generated_at DESC);
