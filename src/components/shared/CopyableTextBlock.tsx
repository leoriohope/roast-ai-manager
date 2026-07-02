import { useToast } from '../../state/AppContext'
import { Button } from '../ui/Button'

export function CopyableTextBlock({
  title,
  text,
  onSave,
}: {
  title?: string
  text: string
  onSave?: () => void
}) {
  const toast = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // clipboard API unavailable — still show feedback since the text is visible to copy manually
    }
    toast('已复制')
  }

  return (
    <div className="rounded-2xl bg-bg p-3">
      {title && <p className="mb-1.5 text-xs font-medium text-ink-soft">{title}</p>}
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{text}</p>
      <div className="mt-2.5 flex gap-2">
        <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={handleCopy}>
          复制文案
        </Button>
        {onSave && (
          <Button
            variant="ghost"
            className="!px-3 !py-1.5 text-xs"
            onClick={() => {
              onSave()
              toast('已加入今日任务')
            }}
          >
            加入今日任务
          </Button>
        )}
      </div>
    </div>
  )
}
