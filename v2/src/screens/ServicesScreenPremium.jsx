import { ChevronRight, Check, User, ClipboardList, Shield, Home, Stethoscope, Beaker, Plane, BookOpen, Lightbulb } from 'lucide-react'
import { Header } from '../components/health/Header'
import { Separator } from '../components/health/Separator'

export default function ServicesScreenPremium({ nav }) {
  const services = [
    {
      id: 'health-manager',
      icon: User,
      title: 'Менеджер здоровья',
      subtitle: 'Персональный куратор',
      description: 'Выделенный специалист отслеживает ваше здоровье, координирует обследования и назначения',
      benefits: [
        'Персональный план здоровья',
        'Контроль обследований',
        'Рекомендации в одном месте'
      ],
      example: 'Менеджер распределит обследования на удобные дни',
      color: '#00C853',
      badge: 'Популярно',
      action: () => nav.push('health-manager')
    },
    {
      id: 'checkups',
      icon: ClipboardList,
      title: 'Чек-апы',
      subtitle: 'Комплексные обследования',
      description: 'Полная диагностика здоровья: анализы, УЗИ, ЭКГ, консультация врача в один день',
      benefits: [
        'Все в один день',
        'Результаты за 24 часа',
        'Включены консультации'
      ],
      example: 'Чек-ап: кровь, моча, УЗИ, прием терапевта от 8,000₸',
      color: '#3B82F6',
      badge: 'Часто',
      action: () => nav.push('checkups')
    },
    {
      id: 'prevention',
      icon: Shield,
      title: 'Профилактика',
      subtitle: 'Программы здоровья',
      description: 'Программы для здоровья: спорт, питание, сон, контроль стресса для всех возрастов',
      benefits: [
        'Персональные рекомендации',
        'Тренировки и рецепты',
        'Отслеживание прогресса'
      ],
      example: 'Программа "Здоровое сердце" с упражнениями и контролем давления',
      color: '#00C853',
      badge: 'Новое',
      action: () => nav.push('slot-booking', { serviceId: 'prevention' })
    },
    {
      id: 'house-calls',
      icon: Home,
      title: 'Домашние визиты',
      subtitle: 'Врач приходит к вам',
      description: 'Врач приедет на дом для консультации, осмотра, анализов без очередей и ожидания',
      benefits: [
        'Экономия времени',
        'Удобство дома',
        'Быстрое обслуживание'
      ],
      example: 'Визит терапевта от 5,000₸, вызов за 30 минут',
      color: '#3B82F6',
      badge: null,
      action: () => nav.push('duty-doctor')
    },
    {
      id: 'specialists',
      icon: Stethoscope,
      title: 'Консультации специалистов',
      subtitle: 'Узкие специалисты онлайн',
      description: 'Видеоконсультации с кардиологами, неврологами, эндокринологами и другими специалистами',
      benefits: [
        'Консультация за 30 минут',
        'Выписка рецептов',
        'Направления на анализы'
      ],
      example: 'Консультация кардиолога в день обращения, результаты в кабинете',
      color: '#00C853',
      badge: null,
      action: () => nav.push('doctor-list')
    },
    {
      id: 'tests',
      icon: Beaker,
      title: 'Лабораторные анализы',
      subtitle: 'Исследования крови и проб',
      description: 'Все виды анализов: общие, гормоны, биохимия, коагулограмма, срочные за 1 час',
      benefits: [
        '500+ видов анализов',
        'Забор дома или в филиалах',
        'Результаты в приложении'
      ],
      example: 'Анализ крови за 2,000₸, результат за 8 часов',
      color: '#3B82F6',
      badge: null,
      action: () => nav.push('slot-booking', { serviceId: 'tests' })
    },
    {
      id: 'travel-medicine',
      icon: Plane,
      title: 'Медпомощь за рубежом',
      subtitle: 'Страховка в путешествиях',
      description: 'Медицинская страховка для поездок: консультации, помощь в поиске врача, эвакуация',
      benefits: [
        'Действует в 195 странах',
        'Горячая линия 24/7',
        'От 2,000₸ за неделю'
      ],
      example: 'Страховка на отпуск в ОАЭ с консультацией врача',
      color: '#00C853',
      badge: null,
      action: () => nav.push('travel-medicine')
    },
    {
      id: 'school-medicine',
      icon: BookOpen,
      title: 'Школьная медицина',
      subtitle: 'Справки и осмотры',
      description: 'Справки для школы, садика, спорта, осмотры перед школой и после болезни за день',
      benefits: [
        'За день в день',
        'Без очередей',
        'От 1,500₸'
      ],
      example: 'Справка после болезни с осмотром педиатра в день обращения',
      color: '#3B82F6',
      badge: null,
      action: () => nav.push('school-medicine')
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
          <div className="space-y-1">
            <h1 className="text-lg font-700 text-white">Медицинские услуги</h1>
            <p className="text-xs text-[#AAB3C5]">Выбери нужный сервис и начни заботиться о здоровье</p>
          </div>
        </div>

        <Separator />

        {/* Services List */}
        <div className="px-4 py-3 space-y-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={service.action}
              className="w-full text-left transition-all active:opacity-70 group"
            >
              <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 space-y-3 group-hover:border-[#3B5469] transition-colors">
                {/* Header: Icon, Title, and Badge */}
                <div className="flex items-center gap-3">
                  {/* Icon Container */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    {service.icon && (() => {
                      const Icon = service.icon
                      return <Icon size={20} color={service.color} strokeWidth={2} />
                    })()}
                  </div>

                  {/* Title Section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-700 text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#AAB3C5] mt-0.5">{service.subtitle}</p>
                  </div>

                  {/* Badge */}
                  {service.badge && (
                    <div
                      className="flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-700 whitespace-nowrap"
                      style={{ backgroundColor: `${service.color}25`, color: service.color, border: `1px solid ${service.color}40` }}
                    >
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#AAB3C5] leading-4">
                  {service.description}
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 gap-2">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check size={14} className="text-[#00C853] flex-shrink-0" />
                      <span className="text-xs text-[#AAB3C5]">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Example Box */}
                <div
                  className="rounded-[12px] p-3 border"
                  style={{
                    backgroundColor: `${service.color}08`,
                    borderColor: `${service.color}20`
                  }}
                >
                  <p className="text-xs text-[#AAB3C5] leading-4">
                    <span style={{ color: service.color }} className="font-600">Пример: </span>
                    {service.example}
                  </p>
                </div>

                {/* CTA Link */}
                <div className="flex items-center justify-between pt-1">
                  <span
                    className="text-xs font-700"
                    style={{ color: service.color }}
                  >
                    Подробнее
                  </span>
                  <ChevronRight size={16} style={{ color: service.color }} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="px-4 py-3">
          <div
            className="rounded-[14px] p-4 border"
            style={{
              backgroundColor: '#00C85310',
              borderColor: '#00C85320'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#00C85315' }}>
                <Lightbulb size={16} color="#00C853" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-700 text-white">Рекомендация</h4>
                <p className="text-xs text-[#AAB3C5] leading-4 mt-1">
                  Начни с чек-апа для полной диагностики. Менеджер здоровья поможет составить персональный план
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-4" />
      </div>
    </div>
  )
}
