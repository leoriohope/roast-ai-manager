import type { Task } from '../../types'
import { useApp, useToast } from '../../state/AppContext'
import { patchTaskStatus } from '../../api/client'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

const SOURCE_LABELS: Record<Task['source'], string> = {
  launch: '上新',
  checkup: '体检',
  package: '套餐',
  content: '内容',
  review: '评价',
  manual: '手动',
}

export function TaskCard({ task }: { task: Task }) {
  const { dispatch } = useApp()
  const toast = useToast()
  const done = task.status === 'done'

  const handleToggle = async () => {
    // Optimistic: flip immediately for a snappy checkbox, roll back on failure.
    dispatch({ type: 'TOGGLE_TASK_STATUS', taskId: task.id })
    try {
      await patchTaskStatus(task.id, done ? 'pending' : 'done')
    } catch {
      dispatch({ type: 'TOGGLE_TASK_STATUS', taskId: task.id })
      toast('更新任务状态失败，请重试', 'error')
    }
  }

  return (
    <Card className="flex items-start gap-3">
      <button
        onClick={handleToggle}
        className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 ${
          done ? 'border-positive bg-positive' : 'border-line'
        }`}
        aria-label={done ? '标记为未完成' : '标记为已完成'}
      >
        {done && <span className="block text-center text-[11px] leading-[18px] text-white">✓</span>}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-medium ${done ? 'text-ink-faint line-through' : 'text-ink'}`}>
            {task.title}
          </p>
          <Badge tone="primary">{SOURCE_LABELS[task.source]}</Badge>
        </div>
        {task.description && <p className="mt-1 text-xs text-ink-soft">{task.description}</p>}
      </div>
    </Card>
  )
}
