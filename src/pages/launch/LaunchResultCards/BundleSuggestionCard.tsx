import { Card } from '../../../components/ui/Card'
import { formatPrice } from '../../../utils/format'

export function BundleSuggestionCard({
  bundle,
}: {
  bundle: { name: string; items: string[]; price: number; note: string }
}) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">套餐组合建议</p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{bundle.name}</p>
        <p className="text-sm font-semibold text-primary">{formatPrice(bundle.price)}</p>
      </div>
      <p className="mt-1 text-xs text-ink-soft">{bundle.items.join(' + ')}</p>
      <p className="mt-2 text-xs text-ink-faint">{bundle.note}</p>
    </Card>
  )
}
