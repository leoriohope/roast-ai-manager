import { Card } from '../../../components/ui/Card'

export function RiskRemindersCard({ reminders }: { reminders: string[] }) {
  return (
    <Card className="!bg-accent/10">
      <p className="mb-2 text-xs font-medium text-accent-dark">风险提醒</p>
      <ul className="flex flex-col gap-1.5">
        {reminders.map((r, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink">
            <span>⚠️</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
