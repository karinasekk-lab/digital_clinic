import { useState } from 'react'
import { Send, Mic, Zap, CheckCircle2, Activity, AlertTriangle } from 'lucide-react'

const moods = [
  { id: 'good', label: 'Хорошо', icon: CheckCircle2, color: '#00C853' },
  { id: 'normal', label: 'Нормально', icon: Activity, color: '#3B82F6' },
  { id: 'bad', label: 'Плохо', icon: AlertTriangle, color: '#F59E0B' }
]

export function HeroHealthAssistant({ userName = 'Алихан', onStartCheck, onMoodSelect }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const [inputText, setInputText] = useState('')

  const handleMoodClick = (moodId) => {
    setSelectedMood(moodId)
    if (onMoodSelect) {
      onMoodSelect(moodId)
    }
  }

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Sending:', inputText)
      setInputText('')
    }
  }

  return (
    <div className="px-4 py-1 space-y-1.5">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[20px] p-3 space-y-1.5">
        {/* Greeting */}
        <div>
          <h2 className="text-base font-700 text-white leading-tight">
            {userName}, как вы себя чувствуете?
          </h2>
        </div>

        {/* Mood Selector - Premium Icons */}
        <div className="flex gap-2">
          {moods.map((mood) => {
            const Icon = mood.icon
            const isSelected = selectedMood === mood.id

            return (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-[12px] transition-all ${
                  isSelected
                    ? 'bg-[#00C853]/15 border border-[#00C853]'
                    : 'bg-[#0D111A] border border-[#2A3145] hover:border-[#00C853]/30'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isSelected ? `${mood.color}15` : 'transparent'
                  }}
                >
                  <Icon
                    size={18}
                    color={mood.color}
                    strokeWidth={2}
                  />
                </div>
                <span className={`text-xs font-600 ${isSelected ? 'text-white' : 'text-[#AAB3C5]'}`}>
                  {mood.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-1.5 bg-[#0D111A] border border-[#2A3145] rounded-[14px] px-3 py-2 focus-within:border-[#00C853]/50 focus-within:shadow-lg focus-within:shadow-[#00C853]/10 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Опишите симптомы"
            className="flex-1 bg-transparent text-white placeholder-[#4A5268] text-xs outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-[#171C2B] transition-colors">
            <Mic size={14} className="text-[#AAB3C5]" strokeWidth={2} />
          </button>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-[#00C853] hover:bg-[#00B85A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={14} className="text-white" strokeWidth={2} />
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartCheck}
          className="w-full bg-[#00C853] hover:bg-[#00B85A] text-white font-700 py-2.5 rounded-[12px] transition-all active:scale-95 shadow-lg shadow-[#00C853]/20 text-xs flex items-center justify-center gap-2"
        >
          <Zap size={14} />
          Разобрать симптомы
        </button>

        {/* Disclaimer */}
        <p className="text-[10px] text-[#4A5268] text-center px-1 leading-4">
          AI не ставит диагноз, но поможет понять следующий шаг
        </p>
      </div>
    </div>
  )
}
