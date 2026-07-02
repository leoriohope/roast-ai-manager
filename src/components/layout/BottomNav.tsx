import type { TabKey } from '../../state/appReducer'

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'today', label: '今天', icon: '🏠' },
  { key: 'launch', label: '上新', icon: '🆕' },
  { key: 'checkup', label: '体检', icon: '🩺' },
  { key: 'package', label: '套餐', icon: '🎁' },
  { key: 'content', label: '内容', icon: '📝' },
  { key: 'review', label: '评价', icon: '💬' },
  { key: 'assistant', label: 'AI', icon: '🤖' },
]

export function BottomNav({
  currentTab,
  onChange,
}: {
  currentTab: TabKey
  onChange: (tab: TabKey) => void
}) {
  return (
    <nav className="sticky bottom-0 z-30 grid grid-cols-7 border-t border-line bg-surface/95 backdrop-blur">
      {TABS.map((tab) => {
        const active = tab.key === currentTab
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] ${
              active ? 'text-primary' : 'text-ink-faint'
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
