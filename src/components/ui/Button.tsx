import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-white active:bg-primary-dark disabled:bg-ink-faint',
  secondary: 'bg-accent/15 text-accent-dark active:bg-accent/25',
  ghost: 'bg-transparent text-ink-soft border border-line active:bg-bg',
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-pill px-5 py-3 text-[15px] font-medium transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
