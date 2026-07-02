import type { HTMLAttributes } from 'react'

export function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-card bg-surface shadow-card p-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
