import { useEffect, useState } from 'react'
import type { TodaySummary } from '../../types'
import { useApp } from '../../state/AppContext'
import { getTodaySummary } from '../../api/client'
import { TodaySummaryCard } from './TodaySummaryCard'
import { RecommendedTasksCard } from './RecommendedTasksCard'
import { WeeklyMetricsCard } from './WeeklyMetricsCard'
import { TaskCard } from '../../components/shared/TaskCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function TodayPage() {
  const { state } = useApp()
  const [summary, setSummary] = useState<TodaySummary | null>(null)
  const storeTasks = state.tasks.filter((t) => t.storeId === state.currentStoreId)

  useEffect(() => {
    let cancelled = false
    setSummary(null)
    getTodaySummary(state.currentStoreId).then((result) => {
      if (!cancelled) setSummary(result)
    })
    return () => {
      cancelled = true
    }
  }, [state.currentStoreId])

  if (!summary) return <EmptyState text="加载中…" />

  return (
    <div className="flex flex-col gap-4">
      <TodaySummaryCard headline={summary.headline} />
      <RecommendedTasksCard tasks={summary.recommendedTasks} />
      <WeeklyMetricsCard metrics={summary.weeklyMetrics} />
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">已加入的任务</h2>
        {storeTasks.length === 0 ? (
          <EmptyState text="还没有任务，去上新助手生成一份方案试试" />
        ) : (
          <div className="flex flex-col gap-2.5">
            {storeTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
