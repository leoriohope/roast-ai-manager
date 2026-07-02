import { Card } from '../../components/ui/Card'

export function ReviewSummaryCard({ summary }: { summary: string }) {
  return (
    <Card>
      <p className="mb-1 text-xs font-medium text-ink-soft">近期评价总结</p>
      <p className="text-sm leading-relaxed text-ink">{summary}</p>
    </Card>
  )
}
