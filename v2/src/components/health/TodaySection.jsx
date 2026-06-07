export function TodaySection() {
  const todayItems = [
    {
      id: 'pressure',
      title: 'Давление в норме',
      subtitle: '120/80 мм рт. ст.',
      icon: '✓',
      bgColor: '#00C853'
    },
    {
      id: 'pulse',
      title: 'Пульс стабилен',
      subtitle: '72 уд/мин',
      icon: '✓',
      bgColor: '#00C853'
    },
    {
      id: 'appointment',
      title: 'Через 2 дня приём у терапевта',
      subtitle: '4 июня · 14:00',
      icon: '📅',
      bgColor: '#00C853'
    },
    {
      id: 'water',
      title: 'Рекомендуем выпить ещё 700 мл воды',
      subtitle: 'Цель: 2,000 мл · Выпито: 1,300 мл',
      icon: '💧',
      bgColor: '#3B82F6'
    },
    {
      id: 'stress',
      title: 'Уровень стресса ниже среднего',
      subtitle: 'На 18% ниже, чем на прошлой неделе',
      icon: '🧠',
      bgColor: '#A855F7'
    }
  ]

  return (
    <div className="px-4 py-3">
      {/* Section Header */}
      <h3 className="text-lg font-700 text-white mb-4">Сегодня</h3>

      {/* Today Card */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[24px] p-6 overflow-hidden">
        {/* Glowing Heart - Right side */}
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 text-9xl select-none pointer-events-none"
          style={{
            opacity: 0.25,
            filter: 'drop-shadow(0 0 40px #00C85360)'
          }}
        >
          ❤️
        </div>

        {/* Content */}
        <div className="relative z-10 pr-8 space-y-4">
          {todayItems.map((item, index) => (
            <div key={item.id}>
              {/* Item */}
              <div className="flex items-center gap-4 py-3">
                {/* Icon Circle */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-700 text-white"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-600 text-white leading-tight">
                    {item.title}
                  </p>
                  <p className="text-sm text-[#AAB3C5] mt-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-[#6B7280] text-xl">›</div>
              </div>

              {/* Divider - except for last item */}
              {index < todayItems.length - 1 && (
                <div className="h-px bg-gradient-to-r from-[#2A3145] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
