import type { AppState } from './appReducer'

// Everything else now lives in the database (see src/api/client.ts) and is
// fetched on bootstrap in AppContext.tsx. Only per-browser UI state stays here:
// which store you're looking at and an in-progress, unsubmitted form draft —
// neither has product value synced across devices.
const STORAGE_KEY = 'roast-ai-manager:local'

type PersistedState = Pick<AppState, 'currentStoreId' | 'launchDraft'>

const PERSISTED_KEYS: (keyof PersistedState)[] = ['currentStoreId', 'launchDraft']

export function loadPersisted(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<AppState>
  } catch {
    return {}
  }
}

export function savePersisted(state: AppState): void {
  try {
    const toSave: Partial<PersistedState> = {}
    for (const key of PERSISTED_KEYS) {
      toSave[key] = state[key] as never
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch {
    // localStorage unavailable (e.g. private browsing) — persistence is a nice-to-have, not required
  }
}
