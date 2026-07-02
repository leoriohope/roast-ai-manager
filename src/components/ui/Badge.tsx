import type { HTMLAttributes } from 'react'

type Tone = 'primary' | 'positive' | 'negative' | 'neutral'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

const TONE_CLASSES: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary',
  positive: 'bg-positive/10 text-positive',
  negative: 'bg-negative/10 text-negative',
  neutral: 'bg-ink-faint/15 text-ink-soft',
}

export function Badge({ tone = 'neutral', className = '', children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}
