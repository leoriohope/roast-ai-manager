import { useState } from 'react'
import { useApp } from '../../state/AppContext'

export function StoreSwitcher() {
  const { state, dispatch } = useApp()
  const [open, setOpen] = useState(false)
  const current = state.stores.find((s) => s.id === state.currentStoreId)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-pill bg-bg px-3 py-1.5 text-sm font-medium text-ink"
      >
        {current?.name ?? '选择门店'}
        <span className="text-ink-faint">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-card bg-surface shadow-card">
            {state.stores.map((store) => (
              <button
                key={store.id}
                onClick={() => {
                  dispatch({ type: 'SET_STORE', storeId: store.id })
                  setOpen(false)
                }}
                className={`block w-full px-4 py-3 text-left text-sm ${
                  store.id === state.currentStoreId ? 'bg-primary/10 text-primary' : 'text-ink'
                }`}
              >
                {store.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
