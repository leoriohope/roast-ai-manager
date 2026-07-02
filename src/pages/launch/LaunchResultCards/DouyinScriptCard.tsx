import { Card } from '../../../components/ui/Card'
import { CopyableTextBlock } from '../../../components/shared/CopyableTextBlock'

export function DouyinScriptCard({ script }: { script: string }) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">抖音短视频脚本</p>
      <CopyableTextBlock text={script} />
    </Card>
  )
}
