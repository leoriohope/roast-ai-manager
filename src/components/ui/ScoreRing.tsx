interface ScoreRingProps {
  score: number
  size?: number
}

export function ScoreRing({ score, size = 88 }: ScoreRingProps) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)
  const color = score >= 80 ? '#3E8E5A' : score >= 60 ? '#F4A340' : '#D64545'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#EDE0D0" strokeWidth={8} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-ink">{score}</span>
        <span className="text-[10px] text-ink-faint">健康分</span>
      </div>
    </div>
  )
}
