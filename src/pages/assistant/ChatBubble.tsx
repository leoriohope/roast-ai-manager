import type { ChatMessage } from '../../types'

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser ? 'bg-primary text-white' : 'bg-surface text-ink shadow-card'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
