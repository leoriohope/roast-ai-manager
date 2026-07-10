import { useRef } from 'react'

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function MultiImageUploadField({
  label,
  values,
  onChange,
  max = 6,
}: {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  max?: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const remaining = max - values.length
    const list = Array.from(files).slice(0, remaining)
    // Read all files in parallel, then commit with a single onChange — reading
    // them one-by-one inside each FileReader.onload would each close over the
    // same stale `values`, silently dropping all but the last file.
    const dataUrls = await Promise.all(list.map(readAsDataUrl))
    onChange([...values, ...dataUrls])
  }

  const removeAt = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm text-ink">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
      <div className="flex flex-wrap gap-2">
        {values.map((value, i) => (
          <div key={i} className="relative h-20 w-20 overflow-hidden rounded-2xl border border-line">
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/60 text-xs text-white"
            >
              ✕
            </button>
          </div>
        ))}
        {values.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line text-ink-faint"
          >
            <span className="text-xl">＋</span>
            <span className="text-xs">上传图片</span>
          </button>
        )}
      </div>
    </div>
  )
}
