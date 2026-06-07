import {
  Thermometer,
  Stethoscope,
  Brain,
  AlertCircle,
  Pill,
  Heart,
  Baby,
  ChevronRight
} from 'lucide-react'

const primarySymptoms = [
  { id: 'temperature', label: 'Температура', icon: Thermometer },
  { id: 'pressure', label: 'Давление', icon: Heart },
  { id: 'stress', label: 'Стресс', icon: Brain }
]

const secondarySymptoms = [
  { id: 'throat', label: 'Горло', icon: Stethoscope },
  { id: 'stomach', label: 'Живот', icon: AlertCircle },
  { id: 'child', label: 'Здоровье ребёнка', icon: Baby }
]

export function SymptomChips({ onSymptomSelect, onViewAll }) {
  return (
    <div className="px-4 py-3 space-y-3">
      {/* Section Title */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">Быстрые проверки</h3>
      </div>

      {/* Primary Chips - 3 column grid */}
      <div className="grid grid-cols-3 gap-2">
        {primarySymptoms.map((symptom) => {
          const Icon = symptom.icon
          return (
            <button
              key={symptom.id}
              onClick={() => onSymptomSelect?.(symptom.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-[16px] bg-[#171C2B] border border-[#2A3145] hover:border-[#00C853]/30 hover:bg-[#1E2433] transition-all active:scale-95"
            >
              <Icon size={18} className="text-[#AAB3C5]" strokeWidth={1.5} />
              <span className="text-xs font-600 text-[#AAB3C5] text-center leading-tight">
                {symptom.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* All Checks Button */}
      <button
        onClick={onViewAll}
        className="w-full flex items-center justify-between py-2.5 px-3 rounded-[14px] bg-[#0D111A] border border-[#2A3145] hover:border-[#00C853]/30 hover:bg-[#171C2B] transition-all"
      >
        <span className="text-xs font-600 text-[#AAB3C5]">Все проверки</span>
        <ChevronRight size={14} className="text-[#4A5268]" />
      </button>
    </div>
  )
}
