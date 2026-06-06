import {
  Thermometer,
  AlertCircle,
  Pill,
  Heart,
  Baby,
  Brain
} from 'lucide-react'

const symptoms = [
  { id: 'temperature', label: 'Температура', icon: Thermometer },
  { id: 'throat', label: 'Горло', icon: AlertCircle },
  { id: 'stomach', label: 'Живот', icon: Pill },
  { id: 'pressure', label: 'Давление', icon: Heart },
  { id: 'child', label: 'Здоровье ребёнка', icon: Baby },
  { id: 'stress', label: 'Стресс', icon: Brain }
]

export function SymptomChips({ onSymptomSelect, onViewAll }) {
  return (
    <div className="px-4 py-4 space-y-3">
      {/* Section Title */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">Быстрые проверки</h3>
        <button onClick={onViewAll} className="text-xs text-[#00C853] font-600 hover:opacity-80">
          Все →
        </button>
      </div>

      {/* Chips Grid */}
      <div className="grid grid-cols-3 gap-2">
        {symptoms.map((symptom) => {
          const Icon = symptom.icon
          return (
            <button
              key={symptom.id}
              onClick={() => onSymptomSelect?.(symptom.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-[18px] bg-[#171C2B] border border-[#2A3145] hover:border-[#00C853]/30 hover:bg-[#1E2433] transition-all active:scale-95"
            >
              <Icon size={22} className="text-[#AAB3C5]" strokeWidth={1.5} />
              <span className="text-xs font-600 text-[#AAB3C5] text-center leading-tight">
                {symptom.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
