import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from 'react'
import { appReducer, type AppAction, type AppState } from './appReducer'
import { initialState } from './initialState'
import { loadPersisted, savePersisted } from './persistence'
import {
  getChatMessages,
  getContentPlans,
  getLaunchResults,
  getPackagePlans,
  getReviews,
  getStores,
  getTasks,
} from '../api/client'
import { uid } from '../utils/id'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
}

const AppContext = createContext<AppContextValue | null>(null)

type BootstrapStatus = 'loading' | 'ready' | 'error'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [status, setStatus] = useState<BootstrapStatus>('loading')

  // Local-only UI state (current store, in-progress form draft) loads instantly
  // from localStorage — no need to gate rendering on this part.
  useEffect(() => {
    const persisted = loadPersisted()
    if (Object.keys(persisted).length > 0) {
      dispatch({ type: 'HYDRATE', state: persisted })
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => savePersisted(state), 300)
    return () => clearTimeout(timer)
  }, [state])

  const bootstrap = useCallback(async () => {
    setStatus('loading')
    try {
      const [stores, reviews, tasks, launchResults, packagePlans, contentPlans, chatHistory] =
        await Promise.all([
          getStores(),
          getReviews(),
          getTasks(),
          getLaunchResults(),
          getPackagePlans(),
          getContentPlans(),
          getChatMessages(),
        ])
      dispatch({
        type: 'HYDRATE',
        state: { stores, reviews, tasks, launchResults, packagePlans, contentPlans, chatHistory },
      })
      setStatus('ready')
    } catch (err) {
      console.error('Failed to load app data', err)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-ink-faint">
        加载中…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
        <p className="text-sm text-ink-soft">加载失败，请检查网络后重试</p>
        <button
          onClick={bootstrap}
          className="rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-white"
        >
          重试
        </button>
      </div>
    )
  }

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function useToast() {
  const { dispatch } = useApp()
  return (message: string, kind: 'success' | 'info' | 'error' = 'success') => {
    const id = uid('toast')
    dispatch({ type: 'PUSH_TOAST', toast: { id, message, kind } })
    setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id }), 2200)
  }
}
