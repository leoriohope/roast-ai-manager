import type { AppState } from './appReducer'

const STORAGE_KEY = 'roast-ai-manager:state'

type PersistedState = Pick<
  AppState,
  'currentStoreId' | 'launchDraft' | 'launchResults' | 'packagePlans' | 'contentPlans' | 'tasks' | 'chatHistory'
>

const PERSISTED_KEYS: (keyof PersistedState)[] = [
  'currentStoreId',
  'launchDraft',
  'launchResults',
  'packagePlans',
  'contentPlans',
  'tasks',
  'chatHistory',
]

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
