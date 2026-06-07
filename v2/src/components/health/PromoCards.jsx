import { ChevronRight, Percent, FileText } from 'lucide-react'

export function PromoCards({ onPromoClick }) {
  const promos = [
    {
      id: 'cashback',
      title: 'Кешбэк 20% на консультации',
      description: 'С любым способом оплаты',
      subtitle: 'Постоянно, без промокодов',
      color: '#00C853',
      icon: Percent
    },
    {
      id: 'analysis',
      title: 'Анализы с AI',
      description: 'Загрузи PDF → объясним простым языком',
      subtitle: null,
      color: '#3B82F6',
      icon: FileText,
      badge: 'NEW'
    }
  ]

  return (
    <div className="px-4 py-1.5">
      {/* Premium Promo Cards - Green & Blue Only */}
      <div className="grid grid-cols-2 gap-2">
        {promos.map((promo) => {
          const Icon = promo.icon

          return (
            <button
              key={promo.id}
              onClick={() => onPromoClick?.(promo.id)}
              className="relative rounded-[16px] p-2.5 text-left transition-all hover:opacity-90 overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${promo.color}12, transparent)`,
                border: `1.5px solid ${promo.color}30`
              }}
            >
              {/* Badge */}
              {promo.badge && (
                <div
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-white text-[9px] font-700 mb-2"
                  style={{ backgroundColor: `${promo.color}25` }}
                >
                  {promo.badge}
                </div>
              )}

              {/* Icon Container - Top */}
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-full mb-2"
                style={{ backgroundColor: `${promo.color}15` }}
              >
                <Icon size={16} color={promo.color} strokeWidth={2} />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h4 className="text-xs font-700 text-white leading-tight">
                  {promo.title}
                </h4>
                <p className="text-[10px] text-[#AAB3C5] leading-3">
                  {promo.description}
                </p>
                {promo.subtitle && (
                  <p className="text-[9px] text-[#6B7280] font-500 pt-0.5">
                    {promo.subtitle}
                  </p>
                )}
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={14} color={promo.color} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
