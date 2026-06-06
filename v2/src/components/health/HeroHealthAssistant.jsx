import { useState } from 'react'
import { Send, Mic } from 'lucide-react'

const moods = [
  { id: 'good', label: 'Хорошо', icon: '😊' },
  { id: 'normal', label: 'Нормально', icon: '😐' },
  { id: 'bad', label: 'Плохо', icon: '😟' }
]

export function HeroHealthAssistant({ userName = 'Алихан', onStartCheck, onMoodSelect }) {
  const [text, setText] = useState('')
  const [selectedMood, setSelectedMood] = useState(null)

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId)
    if (onMoodSelect) {
      onMoodSelect(moodId)
    }
  }

  const handleSend = () => {
    if (text.trim()) {
      console.log('Sending:', text)
      setText('')
    }
  }

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[28px] p-6 space-y-4">
        {/* Greeting */}
        <div>
          <p className="text-sm text-[#AAB3C5] font-500">Добро пожаловать</p>
          <h2 className="text-2xl font-700 text-white mt-1 leading-tight">
            {userName}, как вы себя чувствуете?
          </h2>
        </div>

        {/* Mood Selector */}
        <div className="flex gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-2.5 px-3 rounded-[16px] transition-all ${
                selectedMood === mood.id
                  ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/20'
                  : 'bg-[#0D111A] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/30'
              }`}
            >
              <span className="text-lg">{mood.icon}</span>
              <span className="text-xs font-600">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 bg-[#0D111A] border border-[#2A3145] rounded-[16px] px-4 py-3.5 focus-within:border-[#00C853]/50 focus-within:shadow-lg focus-within:shadow-[#00C853]/5 transition-all">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Опишите симптомы или задайте вопрос"
              className="flex-1 bg-transparent text-white placeholder-[#4A5268] text-sm outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#171C2B] transition-colors">
              <Mic size={18} className="text-[#AAB3C5]" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00C853] hover:bg-[#00B85A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={16} className="text-white" strokeWidth={2} />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[#4A5268] px-1">
            AI не ставит диагноз, но поможет понять следующий шаг
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartCheck}
          className="w-full bg-[#00C853] hover:bg-[#00B85A] text-white font-700 py-3.5 rounded-[16px] transition-all active:scale-95 shadow-lg shadow-[#00C853]/20"
        >
          Начать AI-проверку
        </button>
      </div>
    </div>
  )
}
