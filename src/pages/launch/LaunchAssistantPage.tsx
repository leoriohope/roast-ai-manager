import { useState } from 'react'
import { useApp, useToast } from '../../state/AppContext'
import { EMPTY_LAUNCH_DRAFT } from '../../state/initialState'
import { generateLaunchPlan } from '../../ai'
import { uid } from '../../utils/id'
import { LaunchForm } from './LaunchForm'
import { LaunchResult } from './LaunchResult'

export function LaunchAssistantPage() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [currentResultId, setCurrentResultId] = useState<string | null>(null)

  const currentResult = state.launchResults.find((r) => r.id === currentResultId) ?? null

  const handleSubmit = async () => {
    setSubmitting(true)
    const result = await generateLaunchPlan(state.launchDraft)
    dispatch({ type: 'ADD_LAUNCH_RESULT', result })
    setCurrentResultId(result.id)
    setSubmitting(false)
  }

  const handleAddTask = () => {
    if (!currentResult) return
    dispatch({
      type: 'ADD_TASK',
      task: {
        id: uid('task'),
        title: `执行「${currentResult.formSnapshot.name}」上新方案`,
        description: currentResult.positioning,
        source: 'launch',
        storeId: currentResult.formSnapshot.storeId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        relatedResultId: currentResult.id,
      },
    })
    toast('已加入今日任务')
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
    />
  )
}
