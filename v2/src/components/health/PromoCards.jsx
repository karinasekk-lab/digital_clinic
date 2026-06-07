import { ChevronRight } from 'lucide-react'

export function PromoCards({ onPromoClick }) {
  const promos = [
    {
      id: 'cashback',
      title: 'Кешбэк 20% на все консультации',
      description: 'С любым способом оплаты',
      subtitle: 'Постоянно, без промокодов',
      borderColor: '#00C853',
      icon: '💎',
      badge: null,
      cta: null
    },
    {
      id: 'analysis',
      title: 'Разобрать анализы с AI',
      description: 'Загрузи PDF → объясним простым языком',
      subtitle: null,
      borderColor: '#3B82F6',
      icon: '📄',
      badge: 'NEW',
      cta: 'Попробовать →'
    }
  ]

  const services = [
    {
      id: 'travel',
      title: 'Медпомощь за рубежом',
      description: 'Врач из любой страны',
      borderColor: '#F97316',
      icon: '✈️',
      badge: 'СКОРО'
    },
    {
      id: 'health-manager',
      title: 'Менеджер здоровья',
      description: 'Персональный куратор',
      borderColor: '#A855F7',
      icon: '👤',
      badge: 'СКОРО'
    }
  ]

  return (
    <div className="px-4 py-2 space-y-2">
      {/* Promo Cards - 2 grid */}
      <div className="grid grid-cols-2 gap-2">
        {promos.map((promo) => (
          <button
            key={promo.id}
            onClick={() => onPromoClick?.(promo.id)}
            className="relative rounded-[16px] p-3 text-left transition-all hover:opacity-90 overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${promo.borderColor}15, transparent)`,
              border: `1.5px solid ${promo.borderColor}`
            }}
          >
            {/* Badge */}
            {promo.badge && (
              <div
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-white text-[8px] font-700 mb-1"
                style={{ backgroundColor: promo.borderColor }}
              >
                {promo.badge}
              </div>
            )}

            {/* Content */}
            <div className="space-y-0.5 pr-1">
              <h4 className="text-xs font-700 text-white leading-tight">
                {promo.title}
              </h4>
              <p className="text-[10px] text-[#AAB3C5] leading-3">{promo.description}</p>
              {promo.subtitle && (
                <p className="text-[9px] text-[#4A5268] font-600 pt-0.5">{promo.subtitle}</p>
              )}
            </div>

            {/* Icon - Bottom Right */}
            <div className="absolute bottom-1.5 right-1.5 text-2xl opacity-40 group-hover:opacity-60 transition-opacity">
              {promo.icon}
            </div>

            {/* CTA Link */}
            {promo.cta && (
              <div
                className="pt-1 mt-1 border-t text-[9px] font-600"
                style={{ borderColor: `${promo.borderColor}40`, color: promo.borderColor }}
              >
                {promo.cta}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Service Cards - 2 grid (coming soon) */}
      <div className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onPromoClick?.(service.id)}
            className="relative rounded-[16px] p-3 text-left opacity-70 transition-all hover:opacity-90 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${service.borderColor}10, transparent)`,
              border: `1.5px solid ${service.borderColor}60`
            }}
          >
            {/* Badge - Coming Soon */}
            <div
              className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[8px] font-700 mb-1"
              style={{ color: `${service.borderColor}`, border: `1px solid ${service.borderColor}60` }}
            >
              {service.badge}
            </div>

            {/* Content */}
            <div className="space-y-0.5 pr-1">
              <h4 className="text-xs font-700 text-white leading-tight">
                {service.title}
              </h4>
              <p className="text-[10px] text-[#AAB3C5] leading-3">{service.description}</p>
            </div>

            {/* Icon - Bottom Right */}
            <div className="absolute bottom-1.5 right-1.5 text-2xl opacity-20">
              {service.icon}
            </div>

            {/* Arrow */}
            <ChevronRight size={12} className="absolute bottom-2 right-2" style={{ color: `${service.borderColor}60` }} />
          </button>
        ))}
      </div>
    </div>
  )
}
