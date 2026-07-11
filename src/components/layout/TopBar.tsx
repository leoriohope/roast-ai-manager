import { StoreSwitcher } from './StoreSwitcher'

const TAB_TITLES: Record<string, string> = {
  today: '今天',
  launch: '上新助手',
  checkup: '门店体检',
  package: '套餐设计',
  content: '内容生成',
  review: '评价管理',
  assistant: 'AI 助手',
}

export function TopBar({ currentTab }: { currentTab: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
        <div>
          <p className="text-xs text-ink-faint">烤肉 AI 店长</p>
          <h1 className="text-lg font-semibold text-ink">{TAB_TITLES[currentTab] ?? ''}</h1>
        </div>
      </div>
      <StoreSwitcher />
    </header>
  )
}
