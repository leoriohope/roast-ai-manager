export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-card border border-dashed border-line bg-transparent px-4 py-6 text-center text-sm text-ink-faint">
      {text}
    </div>
  )
}
