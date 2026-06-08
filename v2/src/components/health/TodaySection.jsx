import { Heart, Activity, Moon, TrendingUp, Info } from 'lucide-react'

export function TodaySection() {
  const healthScore = 84
  const healthStatus = 'Хорошее состояние'
  const scoreChange = '+4'
  const scoreChangeWeek = '+4 за неделю'

  const metrics = [
    {
      id: 'pressure',
      label: 'Давление в норме',
      icon: Heart,
      color: '#00C853'
    },
    {
      id: 'heart-rate',
      label: 'Пульс стабилен',
      icon: Activity,
      color: '#00C853'
    },
    {
      id: 'sleep',
      label: 'Сон улучшился',
      icon: Moon,
      color: '#3B82F6'
    }
  ]

  // Chart data points for the week
  const chartData = [
    { day: 'Пн', value: 65 },
    { day: 'Вт', value: 72 },
    { day: 'Ср', value: 75 },
    { day: 'Чт', value: 78 },
    { day: 'Пт', value: 80 },
    { day: 'Сб', value: 82 },
    { day: 'Вс', value: 84 }
  ]

  const maxValue = 100
  const minValue = 0
  const range = maxValue - minValue

  return (
    <div className="px-4 py-1">
      {/* Health Status Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[20px] p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-700 text-sm">Ваше состояние</h3>
            <Info size={14} className="text-[#6B7280]" strokeWidth={2.5} />
          </div>
          <a href="#" className="text-xs text-[#3B82F6] font-600 hover:text-[#60A5FA]">
            Все показатели →
          </a>
        </div>

        {/* Score + Metrics + Chart Row */}
        <div className="flex gap-4">
          {/* Left: Score */}
          <div className="flex flex-col gap-2 min-w-fit">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-700 text-white">{healthScore}</span>
                <span className="text-sm text-[#6B7280]">/ 100</span>
              </div>
              <p className="text-xs text-[#00C853] font-600 mt-1">{healthStatus}</p>
              <p className="text-xs text-[#00C853] font-500">↑ {scoreChangeWeek}</p>
            </div>

            {/* Metrics */}
            <div className="space-y-1.5">
              {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.id} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${metric.color}20` }}
                    >
                      <Icon size={12} color={metric.color} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs text-[#AAB3C5]">{metric.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Simple Chart */}
          <div className="flex-1 flex flex-col items-end justify-between">
            {/* Mini Chart - SVG Line Chart */}
            <svg
              viewBox="0 0 160 80"
              className="w-full h-20"
              preserveAspectRatio="none"
              style={{ minWidth: '120px' }}
            >
              {/* Grid lines */}
              <line x1="0" y1="20" x2="160" y2="20" stroke="#2A3145" strokeWidth="0.5" />
              <line x1="0" y1="40" x2="160" y2="40" stroke="#2A3145" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="160" y2="60" stroke="#2A3145" strokeWidth="0.5" />

              {/* Line chart */}
              <polyline
                points={chartData
                  .map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 160
                    const y = 80 - ((d.value - minValue) / range) * 80
                    return `${x},${y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="#00C853"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {chartData.map((d, i) => {
                const x = (i / (chartData.length - 1)) * 160
                const y = 80 - ((d.value - minValue) / range) * 80
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill={i === chartData.length - 1 ? '#00C853' : '#2A3145'}
                  />
                )
              })}
            </svg>

            {/* Day labels */}
            <div className="flex justify-between w-full text-[9px] text-[#6B7280] font-500 mt-1 px-2">
              {chartData.map((d) => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
