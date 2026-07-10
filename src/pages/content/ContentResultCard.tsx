import type { ContentPlan } from '../../types'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { CopyableTextBlock } from '../../components/shared/CopyableTextBlock'

export function ContentResultCard({
  plan,
  onSaveTask,
}: {
  plan: ContentPlan
  onSaveTask: (label: string, text: string) => void
}) {
  return (
    <Card>
      <p className="mb-3 text-xs font-medium text-ink-soft">推广对象：{plan.promotionObject}</p>
      <div className="flex flex-col gap-3">
        {plan.coverImage && (
          <div>
            <Badge tone="primary">配图</Badge>
            <div className="mt-1.5 overflow-hidden rounded-2xl bg-bg">
              <img src={plan.coverImage.url} alt={plan.promotionObject} className="w-full" />
              <div className="flex flex-col gap-2 p-3">
                <p className="whitespace-pre-wrap text-xs text-ink-faint">{plan.coverImage.prompt}</p>
                <a
                  href={plan.coverImage.url}
                  download={`${plan.promotionObject || 'content'}-配图`}
                  className="self-start rounded-pill bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent-dark"
                >
                  保存图片
                </a>
              </div>
            </div>
          </div>
        )}
        {plan.douyinScript && (
          <div>
            <Badge tone="primary">抖音</Badge>
            <div className="mt-1.5">
              <CopyableTextBlock
                text={plan.douyinScript}
                onSave={() => onSaveTask('抖音脚本', plan.douyinScript!)}
              />
            </div>
          </div>
        )}
        {plan.xiaohongshuPost && (
          <div>
            <Badge tone="primary">小红书</Badge>
            <div className="mt-1.5">
              <CopyableTextBlock
                text={`${plan.xiaohongshuPost.title}\n\n${plan.xiaohongshuPost.body}`}
                onSave={() => onSaveTask('小红书笔记', plan.xiaohongshuPost!.title)}
              />
            </div>
          </div>
        )}
        {plan.momentsCopy && (
          <div>
            <Badge tone="primary">朋友圈</Badge>
            <div className="mt-1.5">
              <CopyableTextBlock
                text={plan.momentsCopy}
                onSave={() => onSaveTask('朋友圈文案', plan.momentsCopy!)}
              />
            </div>
          </div>
        )}
        {plan.wechatGroupMessage && (
          <div>
            <Badge tone="primary">微信群</Badge>
            <div className="mt-1.5">
              <CopyableTextBlock
                text={plan.wechatGroupMessage}
                onSave={() => onSaveTask('微信群消息', plan.wechatGroupMessage!)}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
