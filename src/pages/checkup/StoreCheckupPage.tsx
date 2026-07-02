import { useApp } from '../../state/AppContext'
import { MOCK_CHECKUPS } from '../../mock/checkupData'
import { HealthScoreCard } from './HealthScoreCard'
import { IssueCard } from './IssueCard'
import { WeeklySuggestionsCard } from './WeeklySuggestionsCard'

export function StoreCheckupPage() {
  const { state } = useApp()
  const checkup = MOCK_CHECKUPS[state.currentStoreId]

  if (!checkup) return null

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
