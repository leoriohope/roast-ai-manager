import { AppProvider, useApp } from './state/AppContext'
import { AccessGate } from './components/AccessGate'
import { Shell } from './components/layout/Shell'
import { TodayPage } from './pages/today/TodayPage'
import { LaunchAssistantPage } from './pages/launch/LaunchAssistantPage'
import { StoreCheckupPage } from './pages/checkup/StoreCheckupPage'
import { PackagePage } from './pages/package/PackagePage'
import { ContentPage } from './pages/content/ContentPage'
import { ReviewPage } from './pages/review/ReviewPage'
import { AssistantPage } from './pages/assistant/AssistantPage'

function CurrentPage() {
  const { state } = useApp()
  switch (state.currentTab) {
    case 'today':
      return <TodayPage />
    case 'launch':
      return <LaunchAssistantPage />
    case 'checkup':
      return <StoreCheckupPage />
    case 'package':
      return <PackagePage />
    case 'content':
      return <ContentPage />
    case 'review':
      return <ReviewPage />
    case 'assistant':
      return <AssistantPage />
  }
}

export default function App() {
  return (
    <AccessGate>
      <AppProvider>
        <Shell>
          <CurrentPage />
        </Shell>
      </AppProvider>
    </AccessGate>
  )
}
