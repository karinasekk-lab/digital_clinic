export function TodaySection() {
  const todayItems = [
    { id: 'pressure', label: 'Давление в норме', icon: '✓', color: '#00C853' },
    { id: 'pulse', label: 'Пульс стабилен', icon: '✓', color: '#00C853' },
    { id: 'appointment', label: 'Через 2 дня приём', icon: '📅', color: '#3B82F6' },
    { id: 'water', label: 'Ещё 700 мл воды', icon: '💧', color: '#3B82F6' }
  ]

  return (
    <div className="px-4 py-2">
      {/* Section Header */}
      <h3 className="text-sm font-700 text-white mb-2">Сегодня</h3>

      {/* Today Card - Compact with minimal icon */}
      <div className="relative bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-2.5 overflow-hidden">
        {/* Compact Health Status Icon - Right side */}
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-4xl opacity-15 select-none pointer-events-none">
          ❤️
        </div>

        {/* Content - Left side */}
        <div className="space-y-1.5 relative z-10 pr-3">
          {todayItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-0.5">
              {/* Icon */}
              <span className="text-xs flex-shrink-0 w-4 text-center">{item.icon}</span>

              {/* Text */}
              <span className="text-xs text-[#AAB3C5] leading-4 flex-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
