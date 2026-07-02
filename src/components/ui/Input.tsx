import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  required?: boolean
  hint?: string
}

export function Input({
  label,
  required,
  hint,
  className = '',
  ...rest
}: FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      <input
        className={`w-full rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary ${className}`}
        {...rest}
      />
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  )
}

export function Textarea({
  label,
  required,
  hint,
  className = '',
  ...rest
}: FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      <textarea
        className={`w-full rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary ${className}`}
        rows={3}
        {...rest}
      />
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  )
}
