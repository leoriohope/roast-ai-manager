import { Card } from '../../../components/ui/Card'

export function GroupBuyTitlesCard({ titles }: { titles: string[] }) {
  if (titles.length === 0) return null

  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">团购标题建议</p>
      <ul className="flex flex-col gap-1.5">
        {titles.map((t, i) => (
          <li key={i} className="rounded-2xl bg-bg px-3 py-2 text-sm text-ink">
            {t}
          </li>
        ))}
      </ul>
    </Card>
  )
}
