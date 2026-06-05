import { useState } from 'react'
import { Header, Card, Input } from '../components/UI'

export default function SupportChatScreen({ nav }) {
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
    <div className="min-h-screen bg-[#0D1117] flex flex-col">
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
                  ? 'bg-[#1E2235] text-[#F9FAFB] rounded-tl-[4px]'
                  : 'bg-[#00B956] text-white rounded-tr-[4px]'
              }`}
            >
              <p className="text-sm leading-5">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Quick Options */}
        {messages.length === 1 && (
          <div className="space-y-2 mt-4">
            <p className="text-xs font-600 text-[#94A3B8] uppercase">Популярные вопросы</p>
            {quickOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSend(option)}
                className="w-full text-left py-2 px-3 rounded-[12px] bg-[#1E2235] text-[#F9FAFB] text-sm font-600 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)] transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3 text-center">
        <p className="text-xs text-[#4B5563]">Среднее время ответа: 3 минуты</p>
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-[#1E2235] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none focus:border-[rgba(0,185,86,0.3)]"
          />
          <button
            onClick={() => handleSend(input)}
            className="w-10 h-10 rounded-full bg-[#00B956] text-white flex items-center justify-center hover:bg-[#009644] transition-colors"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
