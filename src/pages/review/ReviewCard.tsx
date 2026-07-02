import type { Review } from '../../types'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { useApp, useToast } from '../../state/AppContext'
import { formatRelativeDay } from '../../utils/date'

export function ReviewCard({ review, suggestedReply }: { review: Review; suggestedReply: string }) {
  const { dispatch } = useApp()
  const toast = useToast()

  const handleCopyReply = async () => {
    try {
      await navigator.clipboard.writeText(suggestedReply)
    } catch {
      // clipboard unavailable, reply text is still visible on screen
    }
    toast('回复已复制')
  }

  const handleTurnIntoContent = () => {
    dispatch({ type: 'SET_TAB', tab: 'content' })
    toast('已跳转到内容页面，可基于这条好评生成推广文案', 'info')
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">{review.author}</span>
          <span className="text-xs text-accent-dark">{'★'.repeat(review.rating)}</span>
        </div>
        <span className="text-xs text-ink-faint">{formatRelativeDay(review.createdAt)}</span>
      </div>
      <p className="mt-1.5 text-sm text-ink-soft">{review.content}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {review.keywords.map((k) => (
          <Badge key={k} tone={review.sentiment === 'negative' ? 'negative' : 'positive'}>
            {k}
          </Badge>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-bg p-3">
        <p className="mb-1 text-xs font-medium text-ink-soft">
          {review.sentiment === 'negative' ? '建议回复' : '感谢回复'}
        </p>
        <p className="text-sm text-ink">{suggestedReply}</p>
      </div>
      <div className="mt-2.5 flex gap-2">
        <Button variant="secondary" className="!px-3 !py-1.5 text-xs" onClick={handleCopyReply}>
          复制回复
        </Button>
        {review.sentiment === 'positive' && (
          <Button variant="ghost" className="!px-3 !py-1.5 text-xs" onClick={handleTurnIntoContent}>
            转为推广内容
          </Button>
        )}
      </div>
    </Card>
  )
}
