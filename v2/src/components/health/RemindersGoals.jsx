import { Target, ChevronRight } from 'lucide-react'

export function RemindersGoals({ onViewReminders, activeGoalsCount = 3 }) {
  return (
    <div className="px-4 py-1.5">
      <button
        onClick={onViewReminders}
        className="w-full bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 text-left transition-all hover:border-[#3B5469] group"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-[#00C853]15 flex items-center justify-center flex-shrink-0">
            <Target size={18} color="#00C853" strokeWidth={2} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-700 text-white leading-tight">
              Напоминания и цели
            </h3>
            <p className="text-xs text-[#AAB3C5] mt-1">
              Прием лекарств, вода, активность и другие напоминания
            </p>
          </div>

          {/* Active Goals Badge */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs font-700 text-[#00C853]">
              {activeGoalsCount} активные
            </span>
            <ChevronRight
              size={16}
              color="#6B7280"
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </button>
    </div>
  )
}
