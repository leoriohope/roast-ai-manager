import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'

export function SellingPointsCard({ points }: { points: string[] }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">核心卖点</p>
      <div className="flex flex-wrap gap-1.5">
        {points.map((p, i) => (
          <Badge key={i} tone="primary">
            {p}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
