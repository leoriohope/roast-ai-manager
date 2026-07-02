import { useRef } from 'react'

export function MockUploadField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string | null | undefined
  onChange: (dataUrl: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm text-ink">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value ? (
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line">
          <img src={value} alt={label} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/60 text-xs text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line text-ink-faint"
        >
          <span className="text-xl">＋</span>
          <span className="text-xs">上传图片</span>
        </button>
      )}
    </div>
  )
}
