import { useState } from 'react'
import { useApp } from '../../state/AppContext'
import { generateAssistantReply } from '../../ai'
import { delay } from '../../ai/randomUtils'
import { uid } from '../../utils/id'
import { ChatBubble } from './ChatBubble'
import { QuickQuestionChips } from './QuickQuestionChips'
import { Button } from '../../components/ui/Button'

export function AssistantPage() {
  const { state, dispatch } = useApp()
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      message: { id: uid('msg'), role: 'user', content: trimmed, createdAt: new Date().toISOString() },
    })
    setInput('')
    setSending(true)
    await delay(500)
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      message: {
        id: uid('msg'),
        role: 'assistant',
        content: generateAssistantReply(trimmed),
        createdAt: new Date().toISOString(),
      },
    })
    setSending(false)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <QuickQuestionChips onPick={send} />

      <div className="flex flex-1 flex-col gap-2.5">
        {state.chatHistory.length === 0 && (
          <p className="px-1 text-center text-xs text-ink-faint">
            有什么想问的？也可以点击上方快捷问题
          </p>
        )}
        {state.chatHistory.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface px-3.5 py-2.5 text-sm text-ink-faint shadow-card">
              思考中…
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="问问 AI 店长…"
          className="flex-1 rounded-pill border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
        <Button className="!px-4" onClick={() => send(input)} disabled={sending}>
          发送
        </Button>
      </div>
    </div>
  )
}
