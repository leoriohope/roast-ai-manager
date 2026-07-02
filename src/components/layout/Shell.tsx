import type { ReactNode } from 'react'
import { useApp } from '../../state/AppContext'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'
import { ToastHost } from '../ui/Toast'

export function Shell({ children }: { children: ReactNode }) {
  const { state, dispatch } = useApp()

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-bg">
      <TopBar currentTab={state.currentTab} />
      <main className="flex-1 overflow-y-auto px-4 py-4">{children}</main>
      <BottomNav currentTab={state.currentTab} onChange={(tab) => dispatch({ type: 'SET_TAB', tab })} />
      <ToastHost />
    </div>
  )
}
