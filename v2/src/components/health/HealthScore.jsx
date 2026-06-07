import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

export function HealthScore({ userName = 'Алихан' }) {
  // Real health metrics data
  const metrics = [
    {
      id: 'pressure',
      label: 'Давление',
      value: '120',
      unit: '/80',
      status: 'normal',
      trend: 'stable',
      normal: '90–120/60–80',
      lastUpdate: '30 мин назад'
    },
    {
      id: 'pulse',
      label: 'Пульс',
      value: '72',
      unit: 'уд/мин',
      status: 'normal',
      trend: 'stable',
      normal: '60–100 уд/мин',
      lastUpdate: '30 мин назад'
    },
    {
      id: 'weight',
      label: 'Вес',
      value: '78.5',
      unit: 'кг',
      status: 'normal',
      trend: 'up',
      normal: 'Оптимальный диапазон',
      lastUpdate: '3 дня назад'
    }
  ]

  const getStatusColor = (status) => {
    if (status === 'normal') return '#00C853'
    if (status === 'warning') return '#FFA500'
    return '#E74C3C'
  }

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp size={12} className="text-[#FFA500]" />
    if (trend === 'down') return <TrendingDown size={12} className="text-[#00C853]" />
    return <Activity size={12} className="text-[#AAB3C5]" />
  }

  return (
    <div className="px-4 py-3 space-y-2">
      {/* Section Header */}
      <div className="px-1 mb-2">
        <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">Показатели здоровья</h3>
      </div>

      {/* Metrics Grid - 3 columns */}
      <div className="grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-3 space-y-2"
          >
            {/* Label */}
            <p className="text-xs text-[#AAB3C5] font-600">{metric.label}</p>

            {/* Value */}
            <div className="flex items-baseline gap-0.5">
              <span
                className="text-2xl font-700"
                style={{ color: getStatusColor(metric.status) }}
              >
                {metric.value}
              </span>
              <span className="text-xs text-[#AAB3C5] font-600">{metric.unit}</span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: getStatusColor(metric.status) }}
              />
              <span className="text-[10px] text-[#AAB3C5]">
                {metric.status === 'normal' ? 'В норме' : 'Требует внимания'}
              </span>
            </div>

            {/* Trend & Update */}
            <div className="space-y-1 pt-1 border-t border-[#2A3145]">
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className="text-[10px] text-[#AAB3C5]">
                  {metric.trend === 'stable' ? 'Стабильно' : metric.trend === 'up' ? 'Растёт' : 'Снижается'}
                </span>
              </div>
              <p className="text-[9px] text-[#4A5268]">{metric.lastUpdate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <p className="text-xs text-[#4A5268] text-center px-1 pt-1">
        Обновляются автоматически при синхронизации устройств
      </p>
    </div>
  )
}
