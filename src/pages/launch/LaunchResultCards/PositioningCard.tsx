import { Card } from '../../../components/ui/Card'

export function PositioningCard({ positioning }: { positioning: string }) {
  return (
    <Card>
      <p className="mb-1 text-xs font-medium text-ink-soft">新品定位</p>
      <p className="text-sm leading-relaxed text-ink">{positioning}</p>
    </Card>
  )
}
