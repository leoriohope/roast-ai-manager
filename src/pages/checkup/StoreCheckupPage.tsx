import { useEffect, useState } from 'react'
import type { StoreCheckup } from '../../types'
import { useApp } from '../../state/AppContext'
import { getCheckup } from '../../api/client'
import { HealthScoreCard } from './HealthScoreCard'
import { IssueCard } from './IssueCard'
import { WeeklySuggestionsCard } from './WeeklySuggestionsCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function StoreCheckupPage() {
  const { state } = useApp()
  const [checkup, setCheckup] = useState<StoreCheckup | null>(null)

  useEffect(() => {
    let cancelled = false
    setCheckup(null)
    getCheckup(state.currentStoreId).then((result) => {
      if (!cancelled) setCheckup(result)
    })
    return () => {
      cancelled = true
    }
  }, [state.currentStoreId])

  if (!checkup) return <EmptyState text="加载中…" />

  return (
    <div className="flex flex-col gap-4">
      <HealthScoreCard score={checkup.healthScore} updatedAt={checkup.updatedAt} />
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">主要问题</h2>
        <div className="flex flex-col gap-2.5">
          {checkup.issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
      <WeeklySuggestionsCard suggestions={checkup.weeklySuggestions} />
    </div>
  )
}
