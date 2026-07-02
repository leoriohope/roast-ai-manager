export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-pill border px-3.5 py-1.5 text-sm transition-colors ${
        selected
          ? 'border-primary bg-primary text-white'
          : 'border-line bg-surface text-ink-soft'
      }`}
    >
      {label}
    </button>
  )
}

export function ChipGroup<T extends string>({
  label,
  required,
  options,
  value,
  onChange,
}: {
  label: string
  required?: boolean
  options: { value: T; label: string }[]
  value: T[]
  onChange: (next: T[]) => void
}) {
  const toggle = (opt: T) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip key={opt.value} label={opt.label} selected={value.includes(opt.value)} onClick={() => toggle(opt.value)} />
        ))}
      </div>
    </div>
  )
}
