import { useEffect, useState, type ReactNode } from 'react'
import { verifyAccessCode } from '../api/client'
import { clearStoredAccessCode, getStoredAccessCode, setStoredAccessCode } from '../api/accessCode'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

type GateStatus = 'checking' | 'locked' | 'unlocked'

export function AccessGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GateStatus>('checking')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const stored = getStoredAccessCode()
    if (!stored) {
      setStatus('locked')
      return
    }
    verifyAccessCode(stored).then((ok) => {
      if (ok) {
        setStatus('unlocked')
      } else {
        clearStoredAccessCode()
        setStatus('locked')
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const ok = await verifyAccessCode(code.trim())
      if (ok) {
        setStoredAccessCode(code.trim())
        setStatus('unlocked')
      } else {
        setError('访问码不正确，请重试')
      }
    } catch {
      setError('验证失败，请检查网络后重试')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-sm text-ink-faint">
        加载中…
      </div>
    )
  }

  if (status === 'locked') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <form onSubmit={handleSubmit} className="w-full max-w-xs rounded-card bg-surface p-6 shadow-card">
          <p className="mb-1 text-center text-lg font-semibold text-ink">南北征赞·野核桃东北烤肉</p>
          <p className="mb-4 text-center text-sm text-ink-faint">请输入访问码</p>
          <Input
            label="访问码"
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          {error && <p className="mt-2 text-xs text-negative">{error}</p>}
          <Button type="submit" className="mt-4 w-full" disabled={!code.trim() || submitting}>
            {submitting ? '验证中…' : '进入'}
          </Button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}
