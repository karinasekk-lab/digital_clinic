import { Activity, Heart, Weight, Ruler, ChevronRight } from 'lucide-react'

const metrics = [
  {
    id: 'pressure',
    label: 'Давление',
    value: '120/80',
    unit: 'мм рт.ст',
    icon: Heart,
    status: 'normal', // normal, warning, critical
    isActive: true
  },
  {
    id: 'pulse',
    label: 'Пульс',
    value: '72',
    unit: 'уд/мин',
    icon: Activity,
    status: 'normal',
    isActive: true
  },
  {
    id: 'weight',
    label: 'Вес',
    value: '72',
    unit: 'кг',
    icon: Weight,
    status: 'static',
    isActive: false
  },
  {
    id: 'height',
    label: 'Рост',
    value: '180',
    unit: 'см',
    icon: Ruler,
    status: 'static',
    isActive: false
  }
]

export function HealthMetrics({ onAddMetrics, onViewAll }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return '#00C853'
      case 'warning':
        return '#FFB74D'
      case 'critical':
        return '#E84C3D'
      default:
        return '#4A5268'
    }
  }

  return (
    <div className="px-4 py-4 space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">
          Ваши показатели
        </h3>
        <button onClick={onViewAll} className="text-xs text-[#00C853] font-600 hover:opacity-80">
          Подробнее →
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const statusColor = getStatusColor(metric.status)

          return (
            <div
              key={metric.id}
              className="bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 space-y-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <Icon size={18} className="text-[#4A5268]" strokeWidth={1.5} />
                {metric.isActive && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                )}
              </div>

              {/* Value */}
              <div>
                <p
                  className="text-xl font-700"
                  style={{ color: metric.isActive ? statusColor : '#AAB3C5' }}
                >
                  {metric.value}
                </p>
                <p className="text-xs text-[#4A5268] mt-0.5">{metric.unit}</p>
              </div>

              {/* Label */}
              <p className="text-xs font-600 text-[#AAB3C5]">{metric.label}</p>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <button
        onClick={onAddMetrics}
        className="w-full mt-2 py-3 px-4 bg-[#0D111A] border border-[#2A3145] rounded-[16px] text-white font-600 text-sm hover:bg-[#171C2B] transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Добавить показатели
        <ChevronRight size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
