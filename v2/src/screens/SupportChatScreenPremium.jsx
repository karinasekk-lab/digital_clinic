import { useState } from 'react'
import { Header, Card } from '../components/UI'
import { Send } from 'lucide-react'

export default function SupportChatScreenPremium({ nav }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Здравствуйте! Чем я могу вам помочь?'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (text) => {
    if (!text.trim()) return

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: 'Спасибо за ваше сообщение. Менеджер поддержки ответит вам в течение 5 минут.' }
      ])
    }, 500)
  }

  const quickOptions = [
    'Проблема с оплатой',
    'Отменить запись',
    'Технический вопрос',
    'Другое'
  ]

  return (
    <div className="min-h-screen bg-[#090D14] flex flex-col">
      <Header title="Поддержка" subtitle="Ответим в течение 5 минут" onBack={() => nav.pop()} />

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeIn`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-[16px] ${
                msg.role === 'bot'
                  ? 'bg-[#171C2B] border border-[#2A3145] text-[#AAB3C5] rounded-tl-[4px]'
                  : 'bg-[#00C853] text-white rounded-tr-[4px]'
              }`}
            >
              <p className="text-sm leading-5">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Quick Options */}
        {messages.length === 1 && (
          <div className="space-y-2 mt-4">
            <p className="text-xs font-600 text-[#4A5268] uppercase tracking-wider">Популярные вопросы</p>
            {quickOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSend(option)}
                className="w-full text-left py-2 px-3 rounded-[14px] bg-[#171C2B] text-white text-sm font-600 border border-[#2A3145] hover:border-[#00C853]/30 transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3 text-center">
        <p className="text-xs text-[#4A5268]">Среднее время ответа: 3 минуты</p>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 safe-area-inset-bottom">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-[#171C2B] border border-[#2A3145] rounded-full px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            className="w-10 h-10 rounded-full bg-[#00C853] text-white flex items-center justify-center hover:bg-[#00B85A] transition-all active:scale-95"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
