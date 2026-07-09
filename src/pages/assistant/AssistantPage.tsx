import { useState } from 'react'
import { useApp, useToast } from '../../state/AppContext'
import { generateAssistantReply } from '../../ai'
import { delay } from '../../ai/randomUtils'
import { createChatMessage } from '../../api/client'
import { ChatBubble } from './ChatBubble'
import { QuickQuestionChips } from './QuickQuestionChips'
import { Button } from '../../components/ui/Button'

export function AssistantPage() {
  const { state, dispatch } = useApp()
  const toast = useToast()
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    setInput('')
    setSending(true)
    try {
      const userMessage = await createChatMessage({ role: 'user', content: trimmed })
      dispatch({ type: 'ADD_CHAT_MESSAGE', message: userMessage })
      await delay(500)
      const assistantMessage = await createChatMessage({
        role: 'assistant',
        content: generateAssistantReply(trimmed),
      })
      dispatch({ type: 'ADD_CHAT_MESSAGE', message: assistantMessage })
    } catch {
      toast('发送失败，请重试', 'error')
    } finally {
      setSending(false)
    }
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
