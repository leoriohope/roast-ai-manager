import { useState } from 'react'
import type { Platform } from '../../types'
import { useApp, useToast } from '../../state/AppContext'
import { generateContentPlan } from '../../ai'
import { uid } from '../../utils/id'
import { ContentForm } from './ContentForm'
import { ContentResultCard } from './ContentResultCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function ContentPage() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [promotionObject, setPromotionObject] = useState('')
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    const plan = await generateContentPlan({ storeId: state.currentStoreId, promotionObject, platforms })
    dispatch({ type: 'ADD_CONTENT_PLAN', plan })
    setSubmitting(false)
  }

  const handleSaveTask = (label: string, text: string) => {
    dispatch({
      type: 'ADD_TASK',
      task: {
        id: uid('task'),
        title: `发布${label}：${promotionObject || '推广内容'}`,
        description: text,
        source: 'content',
        storeId: state.currentStoreId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    })
    toast('已加入今日任务')
  }

  return (
    <div className="flex flex-col gap-4">
      <ContentForm
        promotionObject={promotionObject}
        onPromotionObjectChange={setPromotionObject}
        platforms={platforms}
        onPlatformsChange={setPlatforms}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">已生成的内容</h2>
        {state.contentPlans.length === 0 ? (
          <EmptyState text="填写推广对象和平台，生成第一份内容试试" />
        ) : (
          <div className="flex flex-col gap-2.5">
            {state.contentPlans.map((plan) => (
              <ContentResultCard key={plan.id} plan={plan} onSaveTask={handleSaveTask} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
