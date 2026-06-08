import { Video, Moon, Baby, Eye, Users, Brain, Apple, Heart, Beaker, Pill, HelpCircle, Dna, BarChart3, FileText, Building2, Waves, Check, BookOpen, ClipboardList, Plane, Shield, User, TrendingUp } from 'lucide-react'
import { Header } from '../components/UI'

const SERVICES = {
  consultations: {
    title: 'ОНЛАЙН-КОНСУЛЬТАЦИИ',
    colorBorder: '#00C853',
    items: [
      { id: 'doctor-online', icon: Video, title: 'Врач онлайн', subtitle: 'Ответ за 3 минуты', status: 'active', price: '4 900 ₸' },
      { id: 'duty-doctor', icon: Moon, title: 'Дежурный врач 24/7', subtitle: 'Всегда на связи', status: 'active', price: '4 900 ₸' },
      { id: 'pediatrician', icon: Baby, title: 'Педиатр онлайн', subtitle: 'Для детей 0-18 лет', status: 'active', price: '5 500 ₸' },
      { id: 'second-opinion', icon: Eye, title: 'Второе мнение врача', subtitle: 'Загрузи документы → эксперт', status: 'soon' },
      { id: 'family-doctor', icon: Users, title: 'Семейный врач', subtitle: 'Постоянный врач по подписке', status: 'soon' },
      { id: 'psychologist', icon: Brain, title: 'Психолог онлайн', subtitle: 'Тревога, стресс, кризис', status: 'soon' },
      { id: 'dietician', icon: Apple, title: 'Диетолог / нутрициолог', subtitle: 'Питание, вес, здоровье', status: 'soon' },
      { id: 'gynecologist', icon: Heart, title: 'Гинеколог онлайн', subtitle: 'Женское здоровье', status: 'soon' }
    ]
  },
  ai_tools: {
    title: 'AI-ИНСТРУМЕНТЫ',
    colorBorder: '#3B82F6',
    items: [
      { id: 'analysis-understanding', icon: Beaker, title: 'Понять мои анализы', subtitle: 'PDF или фото → объяснение', status: 'active' },
      { id: 'medication-info', icon: Pill, title: 'Что за лекарство?', subtitle: 'Сфотографируй упаковку', status: 'active' },
      { id: 'symptom-checker', icon: HelpCircle, title: 'Проверить симптомы', subtitle: 'Насколько серьёзно?', status: 'active' },
      { id: 'ecg-analysis', icon: Heart, title: 'Расшифровка ЭКГ', subtitle: 'Фото плёнки → AI анализ', status: 'soon', badge: 'NEW' },
      { id: 'mri-analysis', icon: Dna, title: 'МРТ / КТ снимки', subtitle: 'Второе мнение специалиста', status: 'soon' },
      { id: 'health-diary', icon: BarChart3, title: 'Дневник здоровья', subtitle: 'Давление, сахар, вес', status: 'soon' }
    ]
  },
  documents: {
    title: 'ДОКУМЕНТЫ И СПРАВКИ',
    colorBorder: '#FFA500',
    items: [
      { id: 'sick-leave', icon: FileText, title: 'Больничный онлайн', subtitle: '15 минут · официально', status: 'active' },
      { id: 'work-certificate', icon: Building2, title: 'Справка для работы', subtitle: 'Форма 095/у', status: 'soon' },
      { id: 'sports-certificate', icon: Waves, title: 'Справка для спорта', subtitle: 'Бассейн, секция, фитнес', status: 'soon' },
      { id: 'prescription', icon: Pill, title: 'Рецепт онлайн', subtitle: 'QR-код в аптеку', status: 'soon' },
      { id: 'medical-book', icon: BookOpen, title: 'Медицинская книжка', subtitle: 'Для работников питания, торговли', status: 'soon' }
    ]
  },
  checkups: {
    title: 'ЧЕКАПЫ И ПРОФИЛАКТИКА',
    colorBorder: '#06B6D4',
    badge: 'NEW',
    items: [
      { id: 'basic-checkup', icon: Check, title: 'Базовый чекап', subtitle: 'Анализы + расшифровка + врач', status: 'soon', badge: 'NEW' },
      { id: 'mens-checkup', icon: User, title: 'Чекап для мужчин 35+', subtitle: 'Профильный набор обследований', status: 'soon' },
      { id: 'womens-checkup', icon: User, title: 'Чекап для женщин 35+', subtitle: 'Женское здоровье', status: 'soon' },
      { id: 'kids-checkup', icon: Baby, title: 'Детский чекап', subtitle: 'Ежегодное обследование', status: 'soon' }
    ]
  },
  school: {
    title: 'ШКОЛЬНАЯ МЕДИЦИНА',
    colorBorder: '#A855F7',
    badge: 'NEW',
    items: [
      { id: 'school-medicine', icon: Building2, title: 'Школьная медицина', subtitle: 'Телемедицина для учреждений', status: 'soon', badge: 'NEW' },
      { id: 'child-health', icon: Baby, title: 'Здоровье ребёнка', subtitle: 'Педиатр онлайн 0-18 лет', status: 'active' },
      { id: 'school-certificate', icon: ClipboardList, title: 'Справка в школу', subtitle: 'Не выходя из дома', status: 'soon' }
    ]
  },
  travel: {
    title: 'МЕДИЦИНА В ПУТЕШЕСТВИЯХ',
    colorBorder: '#F97316',
    badge: 'NEW',
    items: [
      { id: 'travel-medicine', icon: Plane, title: 'Медпомощь за рубежом', subtitle: 'Врач онлайн из любой страны', status: 'soon', badge: 'NEW' },
      { id: 'travel-insurance', icon: Shield, title: 'Медстрахование', subtitle: 'Для путешественников', status: 'soon' }
    ]
  },
  support: {
    title: 'СОПРОВОЖДЕНИЕ',
    colorBorder: '#EC4899',
    badge: 'NEW',
    items: [
      { id: 'health-manager', icon: User, title: 'Менеджер здоровья', subtitle: 'Персональный куратор', status: 'soon', badge: 'NEW' },
      { id: 'pregnancy-care', icon: Heart, title: 'Ведение беременности', subtitle: 'От зачатия до родов', status: 'soon' },
      { id: 'chronic-care', icon: TrendingUp, title: 'Хронические болезни', subtitle: 'Диабет, гипертония — контроль', status: 'soon' }
    ]
  }
}

function getScreenRoute(serviceId) {
  const routes = {
    // Consultations
    'doctor-online': 'doctor-list',
    'duty-doctor': 'doctor-list',
    'pediatrician': 'doctor-list',
    'second-opinion': 'doctor-list',
    'family-doctor': 'doctor-list',
    'psychologist': 'doctor-list',
    'dietician': 'doctor-list',
    'gynecologist': 'doctor-list',

    // AI Tools
    'analysis-understanding': 'analysis-upload',
    'medication-info': 'medication-info',
    'symptom-checker': 'ai-chat',
    'ecg-analysis': 'analysis-upload',
    'mri-analysis': 'analysis-upload',
    'health-diary': 'profile',

    // Documents
    'sick-leave': 'sick-leave',
    'work-certificate': 'all-services',
    'sports-certificate': 'all-services',
    'prescription': 'all-services',
    'medical-book': 'all-services',

    // Checkups
    'basic-checkup': 'slot-booking',
    'mens-checkup': 'slot-booking',
    'womens-checkup': 'slot-booking',
    'kids-checkup': 'slot-booking',

    // School
    'school-medicine': 'school-medicine',
    'child-health': 'doctor-list',
    'school-certificate': 'all-services',

    // Travel
    'travel-medicine': 'travel-medicine',
    'travel-insurance': 'all-services',

    // Support
    'health-manager': 'health-manager',
    'pregnancy-care': 'doctor-list',
    'chronic-care': 'doctor-list'
  }
  return routes[serviceId] || null
}

export default function AllServicesScreenV2Premium({ nav }) {
  const countServices = Object.values(SERVICES).reduce((sum, section) => sum + section.items.length, 0)
  const countActive = Object.values(SERVICES).reduce((sum, section) => sum + section.items.filter(i => i.status === 'active').length, 0)
  const countSoon = countServices - countActive

  const handleServiceTap = (serviceId, status) => {
    if (status === 'soon') {
      return
    }
    const route = getScreenRoute(serviceId)
    if (route) {
      nav.push(route, { serviceId })
    }
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Все услуги" onBack={() => nav.pop()} />

      <div className="px-4 space-y-6 pt-6">
        {/* Stats */}
        <div className="text-xs text-[#AAB3C5] text-center px-4 py-3 bg-[#171C2B] border border-[#2A3145] rounded-[16px]">
          <p className="font-600">
            {countServices} сервисов · <span className="text-[#00C853]">{countActive} доступно</span> · <span className="text-[#4A5268]">{countSoon} скоро</span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4">
          {['Все', 'Онлайн', 'AI', 'Документы', 'Чекапы', 'Скоро'].map((filter) => (
            <button
              key={filter}
              className="flex-shrink-0 px-4 py-2 rounded-full font-600 text-xs snap-center bg-[#171C2B] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/30 transition-all"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services by Section */}
        {Object.entries(SERVICES).map(([key, section]) => (
          <div key={key} className="space-y-3">
            {/* Section Header */}
            <div className="flex items-center gap-2 px-1">
              <div
                className="h-1.5 w-4 rounded-full"
                style={{ backgroundColor: section.colorBorder }}
              />
              <h2 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">{section.title}</h2>
              {section.badge && (
                <span className="text-[10px] font-700 px-2 py-0.5 rounded-full bg-[#E74C3C] text-white ml-auto">
                  {section.badge}
                </span>
              )}
            </div>

            {/* Service Cards */}
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleServiceTap(item.id, item.status)}
                  disabled={item.status === 'soon'}
                  className={`w-full text-left p-3 rounded-[16px] border transition-all ${
                    item.status === 'soon'
                      ? 'bg-[#171C2B] border-[#2A3145] opacity-50 cursor-not-allowed'
                      : 'bg-[#171C2B] border-[#2A3145] hover:border-[#00C853]/30'
                  }`}
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: item.status === 'soon' ? '#2A3145' : section.colorBorder
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${section.colorBorder}15` }}
                    >
                      {item.icon && (() => {
                        const Icon = item.icon
                        return <Icon size={20} color={section.colorBorder} strokeWidth={2} />
                      })()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-600 text-sm text-white">{item.title}</h4>
                          <p className="text-xs text-[#AAB3C5] mt-0.5">{item.subtitle}</p>
                        </div>
                        {item.status === 'soon' && (
                          <div className="flex-shrink-0 px-2 py-1 bg-[#2A3145] rounded text-[10px] font-700 text-[#AAB3C5]">
                            СКОРО
                          </div>
                        )}
                        {item.badge && item.status !== 'soon' && (
                          <div className="flex-shrink-0 px-2 py-1 bg-[#E74C3C] rounded text-[10px] font-700 text-white">
                            {item.badge}
                          </div>
                        )}
                      </div>
                      {item.price && (
                        <p className="text-xs text-[#00C853] font-600 mt-2">{item.price}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="text-center py-6 border-t border-[#2A3145]">
          <p className="text-xs text-[#4A5268]">
            Версия 2 · Полный каталог
            <br />
            EmAI × Freedom · 2026
          </p>
        </div>
      </div>
    </div>
  )
}
