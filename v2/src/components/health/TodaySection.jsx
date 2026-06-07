export function TodaySection() {
  const todayItems = [
    {
      id: 'pressure',
      title: 'Давление в норме',
      subtitle: '120/80 мм рт. ст.',
      icon: '✓',
      color: '#00C853'
    },
    {
      id: 'pulse',
      title: 'Пульс стабилен',
      subtitle: '',
      icon: '✓',
      color: '#00C853'
    },
    {
      id: 'appointment',
      title: 'Через 2 дня приём у терапевта',
      subtitle: '4 июня · 14:00',
      icon: '📅',
      color: '#00C853'
    },
    {
      id: 'water',
      title: 'Рекомендуем выпить ещё 700 мл воды',
      subtitle: 'Цель: 2,000 мл · Выпито: 700 мл',
      icon: '💧',
      color: '#3B82F6'
    },
    {
      id: 'stress',
      title: 'Уровень стресса ниже среднего',
      subtitle: 'На 18% ниже, чем на прошлой неделе',
      icon: '🧠',
      color: '#A855F7'
    }
  ]

  return (
    <div className="px-4 py-3">
      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#1A2332] to-[#0D1117] border border-[#2A3F5F] rounded-[16px] p-4 overflow-hidden">
        {/* Header */}
        <h3 className="text-white font-600 text-sm mb-4">Сегодня</h3>

        {/* Glowing Heart - Right side */}
        <div
          className="absolute -right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            fontSize: '140px',
            opacity: 0.2,
            filter: 'drop-shadow(0 0 35px #00C85345)'
          }}
        >
          ❤️
        </div>

        {/* Items */}
        <div className="space-y-3 relative z-10 pr-6">
          {todayItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-lg"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-white text-sm font-500 leading-snug">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-[#6B7280] text-xs mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-[#6B7280] text-sm pt-0.5">›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
