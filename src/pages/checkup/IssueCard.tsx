import type { CheckupIssue } from '../../types'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const SEVERITY_TONE: Record<CheckupIssue['severity'], 'negative' | 'primary' | 'neutral'> = {
  high: 'negative',
  medium: 'primary',
  low: 'neutral',
}

const SEVERITY_LABEL: Record<CheckupIssue['severity'], string> = {
  high: '需优先处理',
  medium: '建议关注',
  low: '轻微',
}

export function IssueCard({ issue }: { issue: CheckupIssue }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-ink">{issue.title}</p>
        <Badge tone={SEVERITY_TONE[issue.severity]}>{SEVERITY_LABEL[issue.severity]}</Badge>
      </div>
      <p className="mt-1.5 text-xs text-ink-soft">{issue.evidence}</p>
    </Card>
  )
}
