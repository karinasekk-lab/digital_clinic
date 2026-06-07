export function TodaySection() {
  const todayItems = [
    {
      id: 'pressure',
      title: 'Давление в норме',
      subtitle: '120/80 мм рт. ст.',
      icon: '✓',
      bgColor: '#00C853',
      iconColor: 'white'
    },
    {
      id: 'pulse',
      title: 'Пульс стабилен',
      subtitle: '72 уд/мин',
      icon: '✓',
      bgColor: '#00C853',
      iconColor: 'white'
    },
    {
      id: 'appointment',
      title: 'Через 2 дня приём у терапевта',
      subtitle: '4 июня · 14:00',
      icon: '📅',
      bgColor: '#3B82F6',
      iconColor: 'white'
    },
    {
      id: 'water',
      title: 'Рекомендуем выпить ещё 700 мл воды',
      subtitle: 'Цель: 2,000 мл · Выпито: 1,300 мл',
      icon: '💧',
      bgColor: '#3B82F6',
      iconColor: 'white'
    },
    {
      id: 'stress',
      title: 'Уровень стресса ниже среднего',
      subtitle: 'На 18% ниже, чем на прошлой неделе',
      icon: '🧠',
      bgColor: '#A855F7',
      iconColor: 'white'
    }
  ]

  return (
    <div className="px-4 py-3">
      {/* Section Header */}
      <h3 className="text-base font-700 text-white mb-3">Сегодня</h3>

      {/* Today Card - Premium design */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[20px] p-4 overflow-hidden">
        {/* Glowing Heart Icon - Right side */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 text-7xl opacity-20 select-none pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 30px #00C85350)'
          }}
        >
          ❤️
        </div>

        {/* Content */}
        <div className="space-y-3 relative z-10 pr-4">
          {todayItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              {/* Icon Container */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-700"
                style={{ backgroundColor: item.bgColor, color: item.iconColor }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-0.5">
                <p className="text-sm font-600 text-white leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-[#AAB3C5] mt-0.5 leading-4">
                  {item.subtitle}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-[#6B7280] pt-1">›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
