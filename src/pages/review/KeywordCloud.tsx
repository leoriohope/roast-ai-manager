import { Badge } from '../../components/ui/Badge'

export function KeywordCloud({
  positive,
  negative,
}: {
  positive: { keyword: string; count: number }[]
  negative: { keyword: string; count: number }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div className="rounded-card bg-surface p-3 shadow-card">
        <p className="mb-2 text-xs font-medium text-ink-soft">好评关键词</p>
        <div className="flex flex-wrap gap-1.5">
          {positive.length === 0 && <span className="text-xs text-ink-faint">暂无</span>}
          {positive.map((k) => (
            <Badge key={k.keyword} tone="positive">
              {k.keyword} {k.count}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-card bg-surface p-3 shadow-card">
        <p className="mb-2 text-xs font-medium text-ink-soft">差评关键词</p>
        <div className="flex flex-wrap gap-1.5">
          {negative.length === 0 && <span className="text-xs text-ink-faint">暂无</span>}
          {negative.map((k) => (
            <Badge key={k.keyword} tone="negative">
              {k.keyword} {k.count}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
