export function TodaySection() {
  const todayItems = [
    {
      id: 'pressure',
      title: 'Давление в норме',
      icon: '✓',
      bgColor: '#00C853'
    },
    {
      id: 'pulse',
      title: 'Пульс стабилен',
      icon: '✓',
      bgColor: '#00C853'
    },
    {
      id: 'appointment',
      title: 'Через 2 дня приём у терапевта',
      icon: '📅',
      bgColor: '#00C853'
    },
    {
      id: 'water',
      title: 'Ещё 700 мл воды',
      icon: '💧',
      bgColor: '#3B82F6'
    },
    {
      id: 'stress',
      title: 'Стресс ниже среднего',
      icon: '🧠',
      bgColor: '#A855F7'
    }
  ]

  return (
    <div className="px-4 py-2">
      {/* Compact Card - Max 240px */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-3 overflow-hidden min-h-[220px] max-h-[240px]">
        {/* Header */}
        <h3 className="text-white font-700 text-sm mb-2.5">Сегодня</h3>

        {/* Glowing Heart - Right side - 35% smaller */}
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            fontSize: '104px',
            opacity: 0.2,
            filter: 'drop-shadow(0 0 30px #00C85340)'
          }}
        >
          ❤️
        </div>

        {/* Items - Compact spacing */}
        <div className="relative z-10 pr-6 space-y-3">
          {todayItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 h-7"
            >
              {/* Icon Circle - Smaller */}
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-base font-700 text-white"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>

              {/* Content - Single line */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-500 text-white truncate">
                  {item.title}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-[#6B7280] text-xs">›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
