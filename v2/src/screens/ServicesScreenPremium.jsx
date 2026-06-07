import { ChevronRight, Calendar, Users, Home, Shield, Pill, Heart } from 'lucide-react'
import { Header } from '../components/health/Header'
import { Separator } from '../components/health/Separator'

export default function ServicesScreenPremium({ nav }) {
  const services = [
    {
      id: 'health-manager',
      icon: '👤',
      title: 'Менеджер здоровья',
      description: 'Персональный куратор здоровья',
      color: '#A855F7',
      action: () => nav.push('health-manager')
    },
    {
      id: 'checkups',
      icon: '📋',
      title: 'Чек-апы',
      description: 'Комплексные обследования',
      color: '#3B82F6',
      action: () => nav.push('checkups')
    },
    {
      id: 'prevention',
      icon: '🛡️',
      title: 'Профилактика',
      description: 'Программы здоровья',
      color: '#00C853',
      action: () => nav.push('all-services')
    },
    {
      id: 'house-calls',
      icon: '🏠',
      title: 'Домашние визиты',
      description: 'Врач приедет к вам',
      color: '#F97316',
      action: () => nav.push('duty-doctor')
    },
    {
      id: 'specialists',
      icon: '🔬',
      title: 'Консультации специалистов',
      description: 'Узкие специалисты онлайн',
      color: '#06B6D4',
      action: () => nav.push('doctor-list')
    },
    {
      id: 'tests',
      icon: '🧪',
      title: 'Анализы',
      description: 'Лабораторные исследования',
      color: '#EF4444',
      action: () => nav.push('all-services')
    },
    {
      id: 'travel-medicine',
      icon: '✈️',
      title: 'Медпомощь за рубежом',
      description: 'Страховка и консультации',
      color: '#F59E0B',
      action: () => nav.push('travel-medicine')
    },
    {
      id: 'school-medicine',
      icon: '🎓',
      title: 'Школьная медицина',
      description: 'Справки и осмотры',
      color: '#8B5CF6',
      action: () => nav.push('school-medicine')
    }
  ]

  const categories = [
    {
      title: 'Популярные услуги',
      items: services.slice(0, 4)
    },
    {
      title: 'Другие услуги',
      items: services.slice(4)
    }
  ]

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      {/* Header */}
      <Header onBack={() => nav.pop()} notificationCount={0} />

      {/* Content */}
      <div className="overflow-y-auto">
        {/* Hero Section */}
        <div className="px-4 py-3">
          <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 space-y-2">
            <h2 className="text-base font-700 text-white">Медицинские услуги</h2>
            <p className="text-xs text-[#AAB3C5] leading-4">Полный спектр медицинской помощи и консультаций с врачами</p>
          </div>
        </div>

        <Separator />

        {/* Services Grid */}
        {categories.map((category) => (
          <div key={category.title}>
            <div className="px-4 py-2">
              <h3 className="text-sm font-700 text-white mb-2">{category.title}</h3>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((service) => (
                  <button
                    key={service.id}
                    onClick={service.action}
                    className="relative rounded-[14px] p-3 text-left transition-all hover:opacity-90 overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15, transparent)`,
                      border: `1.5px solid ${service.color}`
                    }}
                  >
                    {/* Icon */}
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-0.5 pr-1">
                      <h4 className="text-xs font-700 text-white leading-tight">
                        {service.title}
                      </h4>
                      <p className="text-[10px] text-[#AAB3C5] leading-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow - Bottom Right */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={12} style={{ color: service.color }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {category.title !== categories[categories.length - 1].title && <Separator />}
          </div>
        ))}

        {/* Info Section */}
        <div className="px-4 py-3">
          <div className="bg-[#0D111A]/50 border border-[#2A3145]/50 rounded-[14px] p-3 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">💡</span>
              <div>
                <h4 className="text-xs font-700 text-white">Подписка премиум</h4>
                <p className="text-[10px] text-[#AAB3C5] leading-3 mt-0.5">
                  Получите доступ ко всем услугам с скидкой 20% при оформлении подписки
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-3" />
      </div>
    </div>
  )
}
