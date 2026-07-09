import type { RecommendedTask } from '../../types'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useApp } from '../../state/AppContext'

const ACTION_LABELS: Record<RecommendedTask['actionTab'], string> = {
  launch: '去上新',
  package: '去设计',
  content: '去生成',
  review: '去处理',
  checkup: '去查看',
}

export function RecommendedTasksCard({ tasks }: { tasks: RecommendedTask[] }) {
  const { dispatch } = useApp()

  return (
    <div>
      <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">今天该做什么</h2>
      <div className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{task.title}</p>
              <p className="mt-0.5 truncate text-xs text-ink-soft">{task.description}</p>
            </div>
            <Button
              variant="secondary"
              className="shrink-0 !px-3 !py-1.5 text-xs"
              onClick={() => dispatch({ type: 'SET_TAB', tab: task.actionTab })}
            >
              {ACTION_LABELS[task.actionTab]}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
