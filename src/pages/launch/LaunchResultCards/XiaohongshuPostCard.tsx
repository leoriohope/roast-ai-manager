import { Card } from '../../../components/ui/Card'
import { CopyableTextBlock } from '../../../components/shared/CopyableTextBlock'
import { Badge } from '../../../components/ui/Badge'

export function XiaohongshuPostCard({
  post,
}: {
  post: { title: string; body: string; tags: string[] }
}) {
  return (
    <Card>
      <p className="mb-2 text-xs font-medium text-ink-soft">小红书笔记</p>
      <CopyableTextBlock text={`${post.title}\n\n${post.body}`} />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <Badge key={tag} tone="neutral">
            #{tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
