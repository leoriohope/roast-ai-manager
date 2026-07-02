import type { PackagePlan } from '../../types'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatPrice } from '../../utils/format'
import { AUDIENCE_LABEL, PLATFORM_LABEL } from '../../mock/copyBank'

export function PackagePlanCard({
  plan,
  onGenerateContent,
}: {
  plan: PackagePlan
  onGenerateContent: () => void
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{plan.name}</p>
        <p className="text-base font-semibold text-primary">{formatPrice(plan.price)}</p>
      </div>
      <p className="mt-1.5 text-xs text-ink-soft">包含：{plan.includedItems.join('、')}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {plan.audience.map((a) => (
          <Badge key={a} tone="primary">
            {AUDIENCE_LABEL[a]}
          </Badge>
        ))}
        {plan.platform.map((p) => (
          <Badge key={p} tone="neutral">
            {PLATFORM_LABEL[p]}
          </Badge>
        ))}
      </div>
      <div className="mt-2.5 rounded-2xl bg-bg p-3">
        <p className="text-xs font-medium text-ink-soft">团购标题建议</p>
        <p className="mt-0.5 text-sm text-ink">{plan.groupBuyTitle}</p>
      </div>
      <p className="mt-2 text-xs text-accent-dark">⚠️ {plan.marginRiskNote}</p>
      <Button variant="secondary" className="mt-3 w-full !py-2 text-sm" onClick={onGenerateContent}>
        生成推广内容
      </Button>
    </Card>
  )
}
