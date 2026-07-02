import { useEffect, useState } from 'react'
import { useApp } from '../../state/AppContext'
import { analyzeReviews } from '../../ai'
import { ReviewSummaryCard } from './ReviewSummaryCard'
import { KeywordCloud } from './KeywordCloud'
import { ReviewCard } from './ReviewCard'
import { EmptyState } from '../../components/ui/EmptyState'

export function ReviewPage() {
  const { state, dispatch } = useApp()
  const [loading, setLoading] = useState(false)
  const analysis = state.reviewAnalysisByStore[state.currentStoreId]
  const storeReviews = state.reviews.filter((r) => r.storeId === state.currentStoreId)

  useEffect(() => {
    if (state.reviewAnalysisByStore[state.currentStoreId]) return
    let cancelled = false
    setLoading(true)
    analyzeReviews(state.currentStoreId, state.reviews).then((result) => {
      if (cancelled) return
      dispatch({ type: 'SET_REVIEW_ANALYSIS', storeId: state.currentStoreId, analysis: result })
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [state.currentStoreId])

  if (loading || !analysis) {
    return <EmptyState text="正在分析评价数据…" />
  }

  return (
    <div className="flex flex-col gap-4">
      <ReviewSummaryCard summary={analysis.summary} />
      <KeywordCloud positive={analysis.positiveKeywords} negative={analysis.negativeKeywords} />
      <div>
        <h2 className="mb-2 px-1 text-sm font-medium text-ink-soft">评价列表</h2>
        {storeReviews.length === 0 ? (
          <EmptyState text="该门店暂无评价" />
        ) : (
          <div className="flex flex-col gap-2.5">
            {storeReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                suggestedReply={analysis.suggestedReplies[review.id] ?? ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
