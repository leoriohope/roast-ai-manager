const QUICK_QUESTIONS = [
  '帮我做上新',
  '团购卖不好，怎么办？',
  '这条差评怎么回？',
  '今天该发什么内容？',
]

export function QuickQuestionChips({ onPick }: { onPick: (question: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_QUESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          className="rounded-pill border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
