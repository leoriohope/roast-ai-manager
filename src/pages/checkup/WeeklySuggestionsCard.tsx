import { Card } from '../../components/ui/Card'

export function WeeklySuggestionsCard({ suggestions }: { suggestions: string[] }) {
  return (
    <Card>
      <p className="mb-2 text-sm font-medium text-ink">本周建议</p>
      <ul className="flex flex-col gap-2">
        {suggestions.map((s, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-soft">
            <span className="text-accent-dark">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
