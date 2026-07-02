import { Card } from '../../../components/ui/Card'
import { CopyableTextBlock } from '../../../components/shared/CopyableTextBlock'

export function MomentsCopyCard({ copy }: { copy: string }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">朋友圈文案</p>
      <CopyableTextBlock text={copy} />
    </Card>
  )
}
