import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  required?: boolean
  options: { value: string; label: string }[]
}

export function Select({ label, required, options, className = '', ...rest }: SelectProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      <select
        className={`w-full rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-primary ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
