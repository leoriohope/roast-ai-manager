import { useState } from 'react'
import { useApp, useToast } from '../../state/AppContext'
import { EMPTY_LAUNCH_DRAFT } from '../../state/initialState'
import { generateLaunchPlan } from '../../ai'
import { createLaunchResult, createTask } from '../../api/client'
import { LaunchForm } from './LaunchForm'
import { LaunchResult } from './LaunchResult'

export function LaunchAssistantPage() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [addingTask, setAddingTask] = useState(false)
  const [currentResultId, setCurrentResultId] = useState<string | null>(null)

  const currentResult = state.launchResults.find((r) => r.id === currentResultId) ?? null

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const generated = await generateLaunchPlan(state.launchDraft)
      const saved = await createLaunchResult(generated)
      dispatch({ type: 'ADD_LAUNCH_RESULT', result: saved })
      setCurrentResultId(saved.id)
    } catch {
      toast('生成失败，请重试', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAddTask = async () => {
    if (!currentResult || addingTask) return
    setAddingTask(true)
    try {
      const task = await createTask({
        title: `执行「${currentResult.formSnapshot.name}」上新方案`,
        description: currentResult.positioning,
        source: 'launch',
        storeId: currentResult.formSnapshot.storeId,
        status: 'pending',
        relatedResultId: currentResult.id,
      })
      dispatch({ type: 'ADD_TASK', task })
      toast('已加入今日任务')
    } catch {
      toast('添加任务失败，请重试', 'error')
    } finally {
      setAddingTask(false)
    }
  }

  const handleRestart = () => {
    dispatch({ type: 'RESET_LAUNCH_DRAFT', draft: { ...EMPTY_LAUNCH_DRAFT, storeId: state.currentStoreId } })
    setCurrentResultId(null)
  }

  if (currentResult) {
    return <LaunchResult result={currentResult} onAddTask={handleAddTask} onRestart={handleRestart} />
  }

  return (
    <LaunchForm
      draft={state.launchDraft}
      onPatch={(patch) => dispatch({ type: 'UPDATE_LAUNCH_DRAFT', patch })}
      onSubmit={handleSubmit}
      submitting={submitting}
      stores={state.stores}
    />
  )
}
