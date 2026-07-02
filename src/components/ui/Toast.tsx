import { useApp } from '../../state/AppContext'

const KIND_CLASSES = {
  success: 'bg-ink text-white',
  info: 'bg-ink text-white',
  error: 'bg-negative text-white',
} as const

export function ToastHost() {
  const { state } = useApp()

  if (state.toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-pill px-4 py-2 text-sm shadow-card ${KIND_CLASSES[toast.kind ?? 'success']}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
