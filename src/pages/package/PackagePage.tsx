import { useState } from 'react'
import type { PackageGoalKey } from '../../types'
import { useApp, useToast } from '../../state/AppContext'
import { generatePackagePlan, generateContentPlan } from '../../ai'
import { createContentPlan, createPackagePlan } from '../../api/client'
import { GoalPicker } from './GoalPicker'
import { PackagePlanCard } from './PackagePlanCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function PackagePage() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [loadingGoal, setLoadingGoal] = useState<PackageGoalKey | null>(null)

  const handlePick = async (goal: PackageGoalKey) => {
    setLoadingGoal(goal)
    try {
      const generated = await generatePackagePlan({ storeId: state.currentStoreId, goal })
      const saved = await createPackagePlan(state.currentStoreId, generated)
      dispatch({ type: 'ADD_PACKAGE_PLAN', plan: saved })
    } catch {
      toast('生成失败，请重试', 'error')
    } finally {
      setLoadingGoal(null)
    }
  }

  const handleGenerateContent = async (planId: string) => {
    const plan = state.packagePlans.find((p) => p.id === planId)
    if (!plan) return
    try {
      const generated = await generateContentPlan({
        storeId: state.currentStoreId,
        promotionObject: plan.name,
        platforms: plan.platform,
      })
      const saved = await createContentPlan(state.currentStoreId, generated)
      dispatch({ type: 'ADD_CONTENT_PLAN', plan: saved })
      dispatch({ type: 'SET_TAB', tab: 'content' })
      toast('推广内容已生成，可在内容页面查看', 'info')
    } catch {
      toast('生成推广内容失败，请重试', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">选择套餐目标</h2>
        <GoalPicker onPick={handlePick} loadingGoal={loadingGoal} />
      </div>
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">已生成的套餐</h2>
        {state.packagePlans.length === 0 ? (
          <EmptyState text="选择上面的目标，生成第一份套餐方案试试" />
        ) : (
          <div className="flex flex-col gap-2.5">
            {state.packagePlans.map((plan) => (
              <PackagePlanCard
                key={plan.id}
                plan={plan}
                onGenerateContent={() => handleGenerateContent(plan.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
