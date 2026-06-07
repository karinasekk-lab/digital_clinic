import { Beaker, Pill, Heart, Shield, Watch, ChevronRight } from 'lucide-react'

export function UsefulServices({ onServiceClick }) {
  const services = [
    {
      id: 'analyses',
      title: 'Анализы',
      subtitle: 'Более 1500 исследований',
      icon: Beaker,
      color: '#3B82F6'
    },
    {
      id: 'medications',
      title: 'Лекарства',
      subtitle: 'По рецепту и без',
      icon: Pill,
      color: '#00C853'
    },
    {
      id: 'checkups',
      title: 'Чек-апы',
      subtitle: 'Программы проверки здоровья',
      icon: Heart,
      color: '#EF4444'
    },
    {
      id: 'vaccination',
      title: 'Вакцинация',
      subtitle: 'Календарь прививок',
      icon: Shield,
      color: '#00C853'
    },
    {
      id: 'devices',
      title: 'Устройства',
      subtitle: 'Подключайте и отслеживайте',
      icon: Watch,
      color: '#6B7280'
    }
  ]

  return (
    <div className="px-4 py-1.5 space-y-2">
      {/* Section Title */}
      <h3 className="text-sm font-700 text-white">Полезные сервисы</h3>

      {/* Horizontal Scrolling Services */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {services.map((service) => {
          const Icon = service.icon

          return (
            <button
              key={service.id}
              onClick={() => onServiceClick?.(service.id)}
              className="flex-shrink-0 w-24 bg-[#0D111A] border border-[#2A3145] rounded-[14px] p-2.5 text-center transition-all hover:border-[#3B5469] group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <Icon size={16} color={service.color} strokeWidth={2} />
              </div>
              <h4 className="text-xs font-600 text-white leading-tight">
                {service.title}
              </h4>
              <p className="text-[9px] text-[#6B7280] mt-0.5 leading-tight">
                {service.subtitle}
              </p>
            </button>
          )
        })}
        {/* Scroll hint */}
        <div className="flex-shrink-0 w-2" />
      </div>
    </div>
  )
}
