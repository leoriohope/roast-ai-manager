import { Bot, Gift, Home, MessageCircle, PenLine, Sparkles, Stethoscope, type LucideIcon } from 'lucide-react'
import type { TabKey } from '../../state/appReducer'

const TABS: { key: TabKey; label: string; Icon: LucideIcon }[] = [
  { key: 'today', label: '今天', Icon: Home },
  { key: 'launch', label: '上新', Icon: Sparkles },
  { key: 'checkup', label: '体检', Icon: Stethoscope },
  { key: 'package', label: '套餐', Icon: Gift },
  { key: 'content', label: '内容', Icon: PenLine },
  { key: 'review', label: '评价', Icon: MessageCircle },
  { key: 'assistant', label: 'AI', Icon: Bot },
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
            className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
              active ? 'text-primary' : 'text-ink-faint'
            }`}
          >
            <tab.Icon size={22} strokeWidth={active ? 2.25 : 1.75} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
