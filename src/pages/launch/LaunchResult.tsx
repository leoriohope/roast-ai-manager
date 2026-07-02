import { useEffect, useRef } from 'react'
import type { LaunchPlanResult } from '../../types'
import { Button } from '../../components/ui/Button'
import { PositioningCard } from './LaunchResultCards/PositioningCard'
import { SellingPointsCard } from './LaunchResultCards/SellingPointsCard'
import { DouyinScriptCard } from './LaunchResultCards/DouyinScriptCard'
import { XiaohongshuPostCard } from './LaunchResultCards/XiaohongshuPostCard'
import { MomentsCopyCard } from './LaunchResultCards/MomentsCopyCard'
import { GroupMessageCard } from './LaunchResultCards/GroupMessageCard'
import { GroupBuyTitlesCard } from './LaunchResultCards/GroupBuyTitlesCard'
import { BundleSuggestionCard } from './LaunchResultCards/BundleSuggestionCard'
import { StaffScriptCard } from './LaunchResultCards/StaffScriptCard'
import { WeekCalendarCard } from './LaunchResultCards/WeekCalendarCard'
import { RiskRemindersCard } from './LaunchResultCards/RiskRemindersCard'

export function LaunchResult({
  result,
  onAddTask,
  onRestart,
}: {
  result: LaunchPlanResult
  onAddTask: () => void
  onRestart: () => void
}) {
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' })
  }, [result.id])

  return (
    <div ref={topRef} className="flex flex-col gap-3">
      <div className="rounded-card bg-primary p-4 text-white">
        <p className="text-xs text-white/80">{result.formSnapshot.name} · 上新方案已生成</p>
        <div className="mt-2 flex gap-2">
          <Button variant="secondary" className="!bg-white !text-primary" onClick={onAddTask}>
            加入今日任务
          </Button>
          <Button variant="ghost" className="!border-white/40 !text-white" onClick={onRestart}>
            重新填写
          </Button>
        </div>
      </div>

      <PositioningCard positioning={result.positioning} />
      <SellingPointsCard points={result.sellingPoints} />
      <DouyinScriptCard script={result.douyinScript} />
      <XiaohongshuPostCard post={result.xiaohongshuPost} />
      <MomentsCopyCard copy={result.momentsCopy} />
      <GroupMessageCard message={result.wechatGroupMessage} />
      <GroupBuyTitlesCard titles={result.groupBuyTitles} />
      <BundleSuggestionCard bundle={result.bundleSuggestion} />
      <StaffScriptCard lines={result.staffScript} />
      <WeekCalendarCard days={result.weekCalendar} />
      <RiskRemindersCard reminders={result.riskReminders} />
    </div>
  )
}
