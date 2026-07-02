import type { WeeklyMetric } from '../../types'
import { Card } from '../../components/ui/Card'

const TREND_ICON: Record<NonNullable<WeeklyMetric['trend']>, string> = {
  up: '↑',
  down: '↓',
  flat: '→',
}

const TREND_COLOR: Record<NonNullable<WeeklyMetric['trend']>, string> = {
  up: 'text-positive',
  down: 'text-negative',
  flat: 'text-ink-faint',
}

export function WeeklyMetricsCard({ metrics }: { metrics: WeeklyMetric[] }) {
  return (
    <div>
      <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">本周数据</h2>
      <Card className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-xs text-ink-faint">{metric.label}</p>
            <p className="mt-1 text-lg font-semibold text-ink">{metric.value}</p>
            {metric.trend && (
              <p className={`mt-0.5 text-xs ${TREND_COLOR[metric.trend]}`}>
                {TREND_ICON[metric.trend]} {metric.changeLabel}
              </p>
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}
