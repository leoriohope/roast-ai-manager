import { useState } from 'react'
import type { Platform } from '../../types'
import { useApp, useToast } from '../../state/AppContext'
import { generateContentPlan } from '../../ai'
import { createContentPlan, createTask } from '../../api/client'
import { BrandStyleSection } from './BrandStyleSection'
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
    try {
      const generated = await generateContentPlan({
        storeId: state.currentStoreId,
        promotionObject,
        platforms,
        brandStyle: state.brandStyleProfile,
      })
      const saved = await createContentPlan(state.currentStoreId, generated)
      dispatch({ type: 'ADD_CONTENT_PLAN', plan: saved })
    } catch {
      toast('生成失败，请重试', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSaveTask = async (label: string, text: string) => {
    try {
      const task = await createTask({
        title: `发布${label}：${promotionObject || '推广内容'}`,
        description: text,
        source: 'content',
        storeId: state.currentStoreId,
        status: 'pending',
      })
      dispatch({ type: 'ADD_TASK', task })
      toast('已加入今日任务')
    } catch {
      toast('添加任务失败，请重试', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <BrandStyleSection />
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
