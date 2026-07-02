import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { appReducer, type AppAction, type AppState } from './appReducer'
import { initialState } from './initialState'
import { loadPersisted, savePersisted } from './persistence'
import { uid } from '../utils/id'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

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
