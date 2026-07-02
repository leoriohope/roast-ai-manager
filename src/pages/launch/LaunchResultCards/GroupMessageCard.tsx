import { Card } from '../../../components/ui/Card'
import { CopyableTextBlock } from '../../../components/shared/CopyableTextBlock'

export function GroupMessageCard({ message }: { message: string }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">微信群通知</p>
      <CopyableTextBlock text={message} />
    </Card>
  )
}
