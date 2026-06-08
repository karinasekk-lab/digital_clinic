import { useState } from 'react'
import { ClipboardList, Baby, Waves, Activity, School } from 'lucide-react'
import { Header, Card, Button, IconContainer } from '../components/UI'

export default function SchoolMedicineScreen({ nav }) {
  const [activeTab, setActiveTab] = useState('parents')

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24 relative">
      <Header title="Школьная медицина" rightIcon={<School size={20} className="text-[#A855F7]" strokeWidth={2} />} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Purple Sub */}
        <p className="text-xs text-[#A855F7] font-600">Телемедицина для учреждений</p>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('parents')}
            className={`flex-1 px-4 py-2 rounded-lg font-600 text-sm transition-all ${
              activeTab === 'parents'
                ? 'bg-[#A855F7] text-white'
                : 'bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]'
            }`}
          >
            Для родителей
          </button>
          <button
            onClick={() => setActiveTab('schools')}
            className={`flex-1 px-4 py-2 rounded-lg font-600 text-sm transition-all ${
              activeTab === 'schools'
                ? 'bg-[#A855F7] text-white'
                : 'bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]'
            }`}
          >
            Для школ
          </button>
        </div>

        {/* Tab: Parents */}
        {activeTab === 'parents' && (
          <div className="space-y-3 animate-fadeIn">
            <Card className="animate-fadeIn">
              <p className="text-sm font-700 text-[#F9FAFB] mb-2">Врач для вашего ребёнка в школе</p>
              <p className="text-xs text-[#94A3B8]">Образование детей важнее всего, и мы помогаем заботиться об их здоровье</p>
            </Card>

            {/* Services */}
            <div className="space-y-2">
              {[
                {
                  icon: ClipboardList,
                  title: 'Справка в школу онлайн',
                  subtitle: 'Не выходя из дома'
                },
                {
                  icon: Baby,
                  title: 'Педиатр по вопросам ребёнка',
                  subtitle: 'Консультация онлайн'
                },
                {
                  icon: Waves,
                  title: 'Справка для секции / бассейна',
                  subtitle: 'За 15 минут'
                },
                {
                  icon: Activity,
                  title: 'Освобождение от физкультуры',
                  subtitle: 'Врачебное заключение'
                }
              ].map((service, idx) => (
                <Card
                  key={service.title}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex gap-3">
                    <IconContainer icon={service.icon} color="blue" size="md" />
                    <div className="flex-1">
                      <p className="font-600 text-sm text-[#F9FAFB]">{service.title}</p>
                      <p className="text-xs text-[#94A3B8] mt-1">{service.subtitle}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Schools */}
        {activeTab === 'schools' && (
          <div className="space-y-3 animate-fadeIn">
            <Card className="animate-fadeIn" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(168,85,247,0.05))' }}>
              <p className="text-sm font-700 text-[#F9FAFB] mb-2">Телемедицина для учебных заведений</p>
              <p className="text-xs text-[#94A3B8] mb-2">По Приказу №50 МЗ РК</p>
              <p className="text-xs text-[#A855F7] font-600">Обязательная телемедицина в школах</p>
            </Card>

            <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
              <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Что получает школа</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span>✓</span>
                  <span className="text-xs text-[#94A3B8]">Дежурный медик онлайн</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span className="text-xs text-[#94A3B8]">Первичная помощь детям</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span className="text-xs text-[#94A3B8]">Документооборот</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span className="text-xs text-[#94A3B8]">Отчётность для УЗО</span>
                </div>
              </div>
            </Card>

            <Button variant="secondary" size="md" className="w-full">
              Оставить заявку для школы
            </Button>
          </div>
        )}
      </div>

      {/* COMING SOON Overlay */}
      <div className="fixed inset-0 bg-[rgba(13,17,23,0.9)] backdrop-blur-sm flex items-center justify-center z-50 rounded-[40px] pointer-events-none">
        <div className="text-center">
          <p className="text-4xl mb-4">🔜</p>
          <p className="text-white font-700 text-lg mb-2">Скоро</p>
          <p className="text-[#94A3B8] text-sm">Уведомим о запуске</p>
        </div>
      </div>
    </div>
  )
}
