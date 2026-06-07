import { ChevronRight, Check } from 'lucide-react'
import { Header } from '../components/health/Header'
import { Separator } from '../components/health/Separator'

export default function ServicesScreenPremium({ nav }) {
  const services = [
    {
      id: 'health-manager',
      icon: '👤',
      title: 'Менеджер здоровья',
      subtitle: 'Персональный куратор',
      description: 'Выделенный специалист отслеживает ваше здоровье, координирует обследования и назначения, напоминает о профилактике',
      benefits: [
        'Персональный план оздоровления',
        'Контроль анализов и обследований',
        'Рекомендации врачей в одном месте'
      ],
      example: 'Менеджер напомнит о чек-апе, распределит обследования на удобные дни, объяснит результаты',
      color: '#A855F7',
      badge: 'Популярно',
      action: () => nav.push('health-manager')
    },
    {
      id: 'checkups',
      icon: '📋',
      title: 'Чек-апы',
      subtitle: 'Комплексные обследования',
      description: 'Полная диагностика здоровья: анализы, УЗИ, ЭКГ, консультация врача. От базового пакета до VIP',
      benefits: [
        'Все в один день',
        'Результаты за 24 часа',
        'Включены консультации'
      ],
      example: 'Базовый чек-ап: кровь, моча, УЗИ, прием терапевта. Стоимость от 8,000₸',
      color: '#3B82F6',
      badge: 'Часто',
      action: () => nav.push('checkups')
    },
    {
      id: 'prevention',
      icon: '🛡️',
      title: 'Профилактика',
      subtitle: 'Программы здоровья',
      description: 'Программы для сохранения здоровья: спорт, питание, сон. Для всех возрастов и состояний',
      benefits: [
        'Персональные рекомендации',
        'Тренировки и рецепты',
        'Отслеживание прогресса'
      ],
      example: 'Программа "Здоровое сердце" включает упражнения, питание, контроль давления',
      color: '#00C853',
      badge: 'Новое',
      action: () => nav.push('all-services')
    },
    {
      id: 'house-calls',
      icon: '🏠',
      title: 'Домашние визиты',
      subtitle: 'Врач приходит к вам',
      description: 'Врач приедет на дом для консультации, осмотра, анализов. Без очередей и ожидания',
      benefits: [
        'Экономия времени',
        'Удобство для лежачих больных',
        'Спокойная обстановка'
      ],
      example: 'Визит терапевта на дом от 5,000₸, вызов врача за 30 минут',
      color: '#F97316',
      badge: null,
      action: () => nav.push('duty-doctor')
    },
    {
      id: 'specialists',
      icon: '🔬',
      title: 'Консультации специалистов',
      subtitle: 'Узкие специалисты',
      description: 'Онлайн-консультации с кардиологами, неврологами, эндокринологами и другими специалистами',
      benefits: [
        'Видеоконсультация за 30 минут',
        'Выписка рецептов',
        'Направления на анализы'
      ],
      example: 'Консультация кардиолога онлайн в день обращения. Записаны в личный кабинет',
      color: '#06B6D4',
      badge: null,
      action: () => nav.push('doctor-list')
    },
    {
      id: 'tests',
      icon: '🧪',
      title: 'Лабораторные анализы',
      subtitle: 'Исследования крови и биопроб',
      description: 'Все виды анализов: общие, гормоны, биохимия, коагулограмма. Срочные анализы за 1 час',
      benefits: [
        'Ресурс 500+ видов анализов',
        'Забор дома или в филиалах',
        'Результаты в приложении'
      ],
      example: 'Развернутый анализ крови (общий + биохимия) за 2,000₸, результат за 8 часов',
      color: '#EF4444',
      badge: null,
      action: () => nav.push('all-services')
    },
    {
      id: 'travel-medicine',
      icon: '✈️',
      title: 'Медпомощь за рубежом',
      subtitle: 'Страховка в путешествиях',
      description: 'Полная медицинская страховка для поездок: консультации, помощь в поиске врача, эвакуация',
      benefits: [
        'Действует в 195 странах',
        'Горячая линия 24/7',
        'От 2,000₸ за неделю'
      ],
      example: 'Страховка на отпуск в ОАЭ: консультация врача + помощь по поиску клиники',
      color: '#F59E0B',
      badge: null,
      action: () => nav.push('travel-medicine')
    },
    {
      id: 'school-medicine',
      icon: '🎓',
      title: 'Школьная медицина',
      subtitle: 'Справки и осмотры',
      description: 'Справки для школы, садика, спорта. Осмотры перед школой и после болезни',
      benefits: [
        'За день в день',
        'Без очередей',
        'Цена от 1,500₸'
      ],
      example: 'Справка для школы после болезни с осмотром педиатра в день обращения',
      color: '#8B5CF6',
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
        <div className="px-4 py-2">
          <h2 className="text-base font-700 text-white mb-2">Медицинские услуги</h2>
          <p className="text-xs text-[#AAB3C5] leading-4">Выбери нужный сервис и начни заботиться о здоровье</p>
        </div>

        <Separator />

        {/* Services List */}
        <div className="px-4 py-2 space-y-2">
          {services.map((service, index) => (
            <div key={service.id}>
              <button
                onClick={service.action}
                className="w-full text-left transition-all active:opacity-70"
              >
                <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[14px] p-3 space-y-2">
                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-2xl flex-shrink-0">{service.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-700 text-white leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#AAB3C5] mt-0.5">{service.subtitle}</p>
                      </div>
                    </div>
                    {service.badge && (
                      <div
                        className="px-2 py-0.5 rounded-full text-[9px] font-700 whitespace-nowrap flex-shrink-0"
                        style={{ backgroundColor: `${service.color}20`, color: service.color }}
                      >
                        {service.badge}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#AAB3C5] leading-4 pl-10">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-1 pl-10">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-[#00C853] flex-shrink-0 mt-1" />
                        <span className="text-[10px] text-[#AAB3C5]">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Example */}
                  <div className="bg-[#0D111A]/50 rounded-[10px] p-2 pl-10 border border-[#2A3145]/50">
                    <p className="text-[10px] text-[#4A5268] leading-3">
                      <span className="text-[#AAB3C5] font-600">Пример: </span>
                      {service.example}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 pl-10 pt-1">
                    <span
                      className="text-xs font-700"
                      style={{ color: service.color }}
                    >
                      Узнать больше
                    </span>
                    <ChevronRight size={14} style={{ color: service.color }} />
                  </div>
                </div>
              </button>

              {index < services.length - 1 && <div className="h-px bg-[#2A3145] mx-0" />}
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="px-4 py-2 mt-2">
          <div className="bg-[#0D111A]/50 border border-[#2A3145]/50 rounded-[12px] p-3 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">💡</span>
              <div>
                <h4 className="text-xs font-700 text-white">Совет</h4>
                <p className="text-[10px] text-[#AAB3C5] leading-3 mt-0.5">
                  Начни с чек-апа, чтобы понять своё здоровье. Менеджер здоровья поможет сделать персональный план
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
