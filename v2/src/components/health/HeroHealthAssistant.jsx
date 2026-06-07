import { useState } from 'react'
import { Send, Mic, Sparkles } from 'lucide-react'

const moods = [
  { id: 'good', label: 'Хорошо', icon: '😊' },
  { id: 'normal', label: 'Нормально', icon: '😐' },
  { id: 'bad', label: 'Плохо', icon: '😟' }
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
    <div className="px-4 py-2 space-y-2">
      {/* Hero Card - Compact */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[20px] p-4 space-y-2.5">
        {/* Greeting - Compact */}
        <div>
          <h2 className="text-base font-700 text-white leading-tight">
            {userName}, как вы себя чувствуете?
          </h2>
        </div>

        {/* Mood Chips - More Compact */}
        <div className="flex gap-1.5">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-[10px] transition-all text-xs font-600 ${
                selectedMood === mood.id
                  ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/20'
                  : 'bg-[#0D111A] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/30'
              }`}
            >
              <span className="text-sm">{mood.icon}</span>
              {mood.label}
            </button>
          ))}
        </div>

        {/* Input Field - Compact */}
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

        {/* CTA Button - Compact */}
        <button
          onClick={onStartCheck}
          className="w-full bg-[#00C853] hover:bg-[#00B85A] text-white font-700 py-2.5 rounded-[12px] transition-all active:scale-95 shadow-lg shadow-[#00C853]/20 text-xs flex items-center justify-center gap-2"
        >
          <Sparkles size={14} />
          Разобрать симптомы
        </button>

        {/* Disclaimer - Compact */}
        <p className="text-[10px] text-[#4A5268] text-center px-1 leading-4">
          AI не ставит диагноз, но поможет понять следующий шаг
        </p>
      </div>
    </div>
  )
}
