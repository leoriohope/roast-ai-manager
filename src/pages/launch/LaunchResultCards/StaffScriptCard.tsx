import { Card } from '../../../components/ui/Card'

export function StaffScriptCard({ lines }: { lines: string[] }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">员工推荐话术</p>
      <ul className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink">
            <span className="text-accent-dark">{i + 1}.</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
