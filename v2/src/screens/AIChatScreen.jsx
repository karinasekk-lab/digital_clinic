import { useState } from 'react'
import { Header, Card, Button, Pill, DoctorCard } from '../components/UI'
import { DOCTORS } from '../data/mockData'

export default function AIChatScreen({ nav }) {
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
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="AI-ассистент" onBack={() => nav.pop()} subtitle="Ваш медицинский помощник" />

      {/* Chat Area */}
      <div className="px-4 space-y-3 pt-4 pb-20">
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
                  ? 'bg-[#1E2235] text-[#F9FAFB] rounded-tl-[4px]'
                  : 'bg-[#00B956] text-white rounded-tr-[4px]'
              }`}
            >
              {msg.role === 'bot' && (
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              <p className="text-sm leading-5">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Initial Symptoms */}
        {step === 'initial' && (
          <div className="space-y-2 mt-4 animate-fadeIn">
            <p className="text-xs font-600 text-[#94A3B8] uppercase">Выберите симптом</p>
            {['Болит голова', 'Температура', 'Горло', 'Живот', 'Кашель', 'Другое'].map((symptom) => (
              <button
                key={symptom}
                onClick={() => handleSymptomSelect(symptom)}
                className="w-full py-2 px-3 rounded-[12px] bg-[#1E2235] text-[#F9FAFB] text-sm font-600 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)] transition-colors"
              >
                {symptom}
              </button>
            ))}
          </div>
        )}

        {/* Duration Follow-up */}
        {step === 'followup' && (
          <div className="space-y-2 mt-4 animate-fadeIn">
            <p className="text-xs font-600 text-[#94A3B8] uppercase">Когда началось?</p>
            {['Сегодня', '2-3 дня', 'Неделя', 'Дольше'].map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationSelect(duration)}
                className="w-full py-2 px-3 rounded-[12px] bg-[#1E2235] text-[#F9FAFB] text-sm font-600 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)] transition-colors"
              >
                {duration}
              </button>
            ))}

            <button
              onClick={handleShowResult}
              className="w-full py-2 px-3 rounded-[12px] bg-[#00B956] text-white text-sm font-600 mt-4"
            >
              Анализировать
            </button>
          </div>
        )}

        {/* Result */}
        {step === 'result' && (
          <div className="mt-4 space-y-3 animate-fadeIn">
            <Card variant="green">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>🟢</span>
                  <span className="text-sm font-600 text-[#F9FAFB]">Не срочно</span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-5 mt-3">
                  Похоже на ОРВИ. Вероятное воспаление верхних дыхательных путей. Нужна консультация терапевта.
                </p>
              </div>
            </Card>

            <Card className="border-l-4 border-[#00B956]">
              <p className="text-xs text-[#94A3B8] font-600 mb-3">РЕКОМЕНДУЕМЫЙ ВРАЧ</p>
              <DoctorCard
                doctor={recommendedDoctor}
                onTap={() => nav.push('doctor-profile', { doctorId: recommendedDoctor.id })}
                showPrice={true}
              />
              <Button
                onClick={() => nav.push('confirmation', { doctorId: recommendedDoctor.id, fromAI: true })}
                variant="primary"
                size="md"
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
        <p className="text-xs text-[#4B5563] text-center mt-8">
          🔒 Это не медицинский диагноз. Обязательно проконсультируйтесь с врачом.
        </p>
      </div>

      {/* Input Area - only if in initial/followup */}
      {(step === 'initial' || step === 'followup') && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 bg-gradient-to-t from-[#0D1117]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Добавить деталь..."
              className="flex-1 bg-[#1E2235] border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none focus:border-[rgba(0,185,86,0.3)]"
            />
            <button className="w-10 h-10 rounded-full bg-[#00B956] text-white flex items-center justify-center hover:bg-[#009644] transition-colors">
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
