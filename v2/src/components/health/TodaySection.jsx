import { HeartPulse, Activity, CalendarDays, Droplets, Brain, ChevronRight } from 'lucide-react'

export function TodaySection() {
  const insights = [
    {
      id: 'pressure',
      label: 'Давление в норме',
      icon: HeartPulse,
      color: '#00C853',
      bgGradient: 'rgba(0,200,83,0.15)'
    },
    {
      id: 'heart-rate',
      label: 'Пульс стабилен',
      icon: Activity,
      color: '#00C853',
      bgGradient: 'rgba(0,200,83,0.15)'
    },
    {
      id: 'appointment',
      label: 'Приём через 2 дня',
      icon: CalendarDays,
      color: '#F59E0B',
      bgGradient: 'rgba(245,158,11,0.15)'
    },
    {
      id: 'hydration',
      label: 'Осталось выпить 700 мл',
      icon: Droplets,
      color: '#3B82F6',
      bgGradient: 'rgba(59,130,246,0.15)'
    },
    {
      id: 'stress',
      label: 'Стресс ниже среднего',
      icon: Brain,
      color: '#A855F7',
      bgGradient: 'rgba(139,92,246,0.15)'
    }
  ]

  const healthScore = 84
  const healthStatus = 'Хорошее состояние'
  const scoreChange = '+4'

  return (
    <div className="px-4 py-2">
      {/* Premium Healthcare Dashboard Card */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[24px] p-4 overflow-hidden max-h-[220px]">
        {/* Header */}
        <h3 className="text-white font-600 text-sm mb-3">Сегодня</h3>

        {/* Health Status Ring - Right Side (25-30% of card width) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          {/* Ring Container */}
          <div className="relative w-20 h-20">
            {/* Background Circle */}
            <svg className="w-full h-full" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#2A3145"
                strokeWidth="2"
                fill="none"
              />
              {/* Green Progress Ring - 84% */}
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#00C853"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={`${(84 / 100) * 226.19} 226.19`}
                strokeLinecap="round"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  opacity: 0.85
                }}
              />
            </svg>
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-700 text-white">{healthScore}</span>
              <span className="text-[9px] text-[#AAB3C5] font-500">{scoreChange}</span>
            </div>
          </div>
          {/* Status Label */}
          <p className="text-[10px] text-[#AAB3C5] text-center mt-1.5 leading-tight max-w-[68px] font-500">
            {healthStatus}
          </p>
        </div>

        {/* Premium Insights List - Left Side */}
        <div className="relative z-10 pr-28 space-y-3">
          {insights.map((insight) => {
            const Icon = insight.icon
            return (
              <div
                key={insight.id}
                className="flex items-center gap-3"
              >
                {/* Icon Container - Premium Gradient Background */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: insight.bgGradient }}
                >
                  <Icon
                    size={18}
                    color={insight.color}
                    strokeWidth={2}
                  />
                </div>

                {/* Label - Single Line, Premium Typography */}
                <span className="text-xs text-[#E5E7EB] font-500 truncate">
                  {insight.label}
                </span>

                {/* Chevron - Subtle */}
                <ChevronRight
                  size={14}
                  className="flex-shrink-0"
                  color="#6B7280"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
