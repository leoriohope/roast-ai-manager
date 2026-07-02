import { Card } from '../../components/ui/Card'
import { ScoreRing } from '../../components/ui/ScoreRing'
import { formatDate } from '../../utils/date'

export function HealthScoreCard({ score, updatedAt }: { score: number; updatedAt: string }) {
  const level = score >= 80 ? '状态良好' : score >= 60 ? '有待改进' : '需要关注'

  return (
    <Card className="flex items-center gap-4">
      <ScoreRing score={score} />
      <div>
        <p className="text-base font-medium text-ink">{level}</p>
        <p className="mt-1 text-xs text-ink-faint">{formatDate(updatedAt)}更新</p>
      </div>
    </Card>
  )
}
