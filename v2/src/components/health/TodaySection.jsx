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
      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[24px] p-5 overflow-hidden">
        {/* Header */}
        <h3 className="text-white font-700 text-lg mb-4">Сегодня</h3>

        {/* Glowing Heart - Right side */}
        <div
          className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            fontSize: '160px',
            opacity: 0.22,
            filter: 'drop-shadow(0 0 45px #00C85350)'
          }}
        >
          ❤️
        </div>

        {/* Items */}
        <div className="relative z-10 pr-8 space-y-4">
          {todayItems.map((item, index) => (
            <div key={item.id}>
              {/* Item */}
              <div className="flex items-center gap-3 py-2">
                {/* Icon Circle - Large */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-2xl font-700 text-white"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-600 text-white leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#AAB3C5] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-[#6B7280] text-lg">›</div>
              </div>

              {/* Divider - except last item */}
              {index < todayItems.length - 1 && (
                <div className="h-px bg-[#2A3145]/60 mx-14" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
