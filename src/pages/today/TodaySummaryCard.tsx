import { Card } from '../../components/ui/Card'
import { formatDate } from '../../utils/date'

export function TodaySummaryCard({ headline }: { headline: string }) {
  const today = new Date().toISOString()

  return (
    <Card className="!bg-primary !text-white">
      <p className="text-xs text-white/80">{formatDate(today)}</p>
      <p className="mt-1 text-base font-medium leading-relaxed">{headline}</p>
    </Card>
  )
}
