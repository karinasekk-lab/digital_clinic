import { ChevronRight, Percent, FileText, Plane, User } from 'lucide-react'
import { useRef } from 'react'

export function PromoCards({ onPromoClick }) {
  const scrollRef = useRef(null)

  const promos = [
    {
      id: 'cashback',
      title: 'Кешбэк 20% на все консультации',
      description: 'С любым способом оплаты',
      subtitle: 'Постоянно, без промокодов',
      color: '#00C853',
      icon: Percent,
      gradient: 'from-[#00B956] to-[#0F6E56]'
    },
    {
      id: 'analysis',
      title: 'Разобрать анализы с AI',
      description: 'Загрузи PDF → объясним простым языком',
      subtitle: null,
      color: '#3B82F6',
      icon: FileText,
      badge: 'NEW',
      gradient: 'from-[#185FA5] to-[#0C447C]'
    },
    {
      id: 'travel-medicine',
      title: 'Медпомощь за рубежом',
      description: 'Врач из любой страны',
      subtitle: null,
      color: '#F97316',
      icon: Plane,
      badge: 'СКОРО',
      borderColor: '#F97316',
      isDark: true
    },
    {
      id: 'health-manager',
      title: 'Менеджер здоровья',
      description: 'Персональный куратор',
      subtitle: null,
      color: '#A855F7',
      icon: User,
      badge: 'СКОРО',
      borderColor: '#A855F7',
      isDark: true
    }
  ]

  return (
    <div className="px-4 py-1.5 space-y-2">
      {/* Section Title */}
      <h3 className="text-sm font-700 text-white px-0">Рекомендуемые услуги</h3>

      {/* Horizontal Scrolling Promo Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {promos.map((promo) => {
          const Icon = promo.icon

          return (
            <button
              key={promo.id}
              onClick={() => onPromoClick?.(promo.id)}
              className={`flex-shrink-0 w-[calc(50%-6px)] rounded-[16px] p-3 text-left transition-all hover:opacity-90 relative overflow-hidden group border border-[#2A3145] ${
                promo.isDark ? 'bg-[#0D111A]' : 'bg-gradient-to-br'
              }`}
              style={
                promo.isDark
                  ? { borderLeftColor: promo.borderColor, borderLeftWidth: '3px' }
                  : {
                      backgroundImage: `linear-gradient(135deg, ${promo.color} 0%, ${promo.color}80 100%)`
                    }
              }
            >
              {/* Badge */}
              {promo.badge && (
                <div
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-white text-[9px] font-700 mb-2"
                  style={{
                    backgroundColor: promo.isDark ? 'transparent' : `${promo.color}25`,
                    color: promo.color,
                    border: promo.isDark ? `1px solid ${promo.color}40` : 'none'
                  }}
                >
                  {promo.badge}
                </div>
              )}

              {/* Icon Container */}
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-full mb-2"
                style={{ backgroundColor: promo.isDark ? `${promo.color}15` : `${promo.color}20` }}
              >
                <Icon size={16} color={promo.color} strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="space-y-0.5">
                <h4 className="text-xs font-700 text-white leading-tight">
                  {promo.title}
                </h4>
                <p className="text-[10px] text-[#AAB3C5] leading-3">
                  {promo.description}
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={12} color={promo.color} />
              </div>
            </button>
          )
        })}
        {/* Scroll hint - part of next card visible */}
        <div className="flex-shrink-0 w-6" />
      </div>
    </div>
  )
}
