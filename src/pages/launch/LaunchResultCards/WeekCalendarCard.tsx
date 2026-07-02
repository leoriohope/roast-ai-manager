import type { WeekCalendarDay } from '../../../types'
import { Card } from '../../../components/ui/Card'
import { PLATFORM_LABEL } from '../../../mock/copyBank'

function channelLabel(channel: WeekCalendarDay['channel']): string {
  return channel === 'store' ? '门店' : PLATFORM_LABEL[channel]
}

export function WeekCalendarCard({ days }: { days: WeekCalendarDay[] }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">一周上新计划</p>
      <ul className="flex flex-col gap-2.5">
        {days.map((day) => (
          <li key={day.day} className="flex gap-3">
            <span className="w-12 shrink-0 text-xs font-medium text-primary">{day.day}</span>
            <div className="min-w-0">
              <p className="text-sm text-ink">
                {day.focus} · <span className="text-ink-soft">{channelLabel(day.channel)}</span>
              </p>
              <p className="text-xs text-ink-faint">{day.action}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
