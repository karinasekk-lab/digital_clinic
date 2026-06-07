import { useState } from 'react'
import { Header, Card, Button } from '../components/UI'
import { Send, Bot, AlertCircle } from 'lucide-react'
import { DOCTORS } from '../data/mockData'

export default function AIChatScreenPremium({ nav }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Здравствуйте! Я помогу разобраться с симптомами. Что вас беспокоит?'
    }
  ])
  const [step, setStep] = useState('initial') // initial, followup, result
  const [userSymptom, setUserSymptom] = useState(null)

  const handleSymptomSelect = (symptom) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: symptom }])
    setUserSymptom(symptom)
    setStep('followup')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: 'Как давно беспокоит?' }
      ])
    }, 500)
  }

  const handleDurationSelect = (duration) => {
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: duration }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: 'Ещё какие-то симптомы?' }
      ])
    }, 500)
  }

  const handleShowResult = () => {
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: 'Показать результат' }])
    setStep('result')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: 'На основе ваших симптомов рекомендую терапевта. Он специализируется на ОРВИ и может помочь'
        }
      ])
    }, 500)
  }

  const recommendedDoctor = DOCTORS[0]

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="AI-ассистент" subtitle="Ваш медицинский помощник" onBack={() => nav.pop()} />

      {/* Chat Area */}
      <div className="px-4 space-y-3 pt-6 pb-20 overflow-y-auto">
        {/* Messages */}
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
              {msg.role === 'bot' && (
                <div className="flex items-start gap-2 mb-1">
                  <Bot size={14} className="text-[#00C853] mt-0.5" />
                </div>
              )}
              <p className="text-sm leading-5">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Initial Symptoms */}
        {step === 'initial' && (
          <div className="space-y-2 mt-4 animate-fadeIn">
            <p className="text-xs font-600 text-[#4A5268] uppercase">Выберите симптом</p>
            {['Болит голова', 'Температура', 'Горло', 'Живот', 'Кашель', 'Другое'].map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSymptomSelect(symptom)}
                className="w-full py-2 px-3 rounded-[14px] bg-[#171C2B] text-white text-sm font-600 border border-[#2A3145] hover:border-[#00C853]/30 transition-all"
              >
                {symptom}
              </button>
            ))}
          </div>
        )}

        {/* Duration Follow-up */}
        {step === 'followup' && (
          <div className="space-y-2 mt-4 animate-fadeIn">
            <p className="text-xs font-600 text-[#4A5268] uppercase">Когда началось?</p>
            {['Сегодня', '2-3 дня', 'Неделя', 'Дольше'].map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationSelect(duration)}
                className="w-full py-2 px-3 rounded-[14px] bg-[#171C2B] text-white text-sm font-600 border border-[#2A3145] hover:border-[#00C853]/30 transition-all"
              >
                {duration}
              </button>
            ))}

            <button
              onClick={handleShowResult}
              className="w-full py-2 px-3 rounded-[14px] bg-[#00C853] text-white text-sm font-600 mt-4 hover:bg-[#00B85A] transition-all"
            >
              Анализировать
            </button>
          </div>
        )}

        {/* Result */}
        {step === 'result' && (
          <div className="mt-4 space-y-3 animate-fadeIn">
            <Card variant="elevated" className="border-l-4 border-[#00C853]">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle size={16} className="text-[#00C853] flex-shrink-0 mt-0.5" />
                <span className="text-sm font-600 text-[#00C853]">Анализ завершён</span>
              </div>
              <p className="text-sm text-white font-600 mb-2">Похоже на ОРВИ</p>
              <p className="text-xs text-[#AAB3C5] leading-5 mt-3">
                Вероятное воспаление верхних дыхательных путей. Нужна консультация терапевта.
              </p>
            </Card>

            <Card className="border-l-4 border-[#00C853] animate-fadeIn">
              <p className="text-xs text-[#4A5268] font-700 mb-3">РЕКОМЕНДУЕМЫЙ ВРАЧ</p>
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-700 text-white">ТВ</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-700 text-white text-sm">{recommendedDoctor.name}</h3>
                  <p className="text-xs text-[#AAB3C5] mt-0.5">{recommendedDoctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-700 text-white">{recommendedDoctor.rating} ★</span>
                    <span className="text-xs text-[#AAB3C5]">({recommendedDoctor.reviews} отзывов)</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-700 text-white">{recommendedDoctor.price.toLocaleString()} ₸</p>
                  <p className="text-[10px] text-[#00C853] mt-0.5">{recommendedDoctor.cashback.toLocaleString()} ₸</p>
                </div>
              </div>
              <Button
                onClick={() => nav.push('confirmation', { doctorId: recommendedDoctor.id, fromAI: true })}
                size="sm"
                className="w-full mt-3"
              >
                Начать консультацию
              </Button>
            </Card>

            <div className="space-y-2">
              <Button
                onClick={() => nav.push('home')}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Позже / Вернуться в меню
              </Button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-xs text-[#4A5268] text-center mt-8 p-3 bg-[#171C2B] rounded-[14px] border border-[#2A3145]">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <p>Это не медицинский диагноз. Обязательно проконсультируйтесь с врачом.</p>
        </div>
      </div>

      {/* Input Area - only if in initial/followup */}
      {(step === 'initial' || step === 'followup') && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-[#090D14] to-transparent">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Добавить деталь..."
              className="flex-1 bg-[#171C2B] border border-[#2A3145] rounded-full px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 transition-all"
            />
            <button className="w-10 h-10 rounded-full bg-[#00C853] text-white flex items-center justify-center hover:bg-[#00B85A] transition-all active:scale-95">
              <Send size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
