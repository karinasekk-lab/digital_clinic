import { User, Calendar, Pill as PillIcon, BarChart3, Link2, Phone, Check, Clock } from 'lucide-react'
import { Header, Card, Button, Pill } from '../components/UI'

export default function HealthManagerScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24 relative">
      <Header title="Менеджер здоровья" rightIcon={<User size={20} className="text-[#00B956]" strokeWidth={2} />} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Green Sub */}
        <p className="text-xs text-[#00B956] font-600">Персональный куратор вашего здоровья</p>

        {/* Hero */}
        <Card variant="green" className="animate-fadeIn">
          <p className="font-700 text-[#F9FAFB] mb-2">Один человек следит за вашим здоровьем</p>
          <p className="text-xs text-[#94A3B8]">Напоминания, координация, забота</p>
        </Card>

        {/* What Does Manager Do */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Что делает менеджер</h3>
          <div className="space-y-2">
            <div className="flex gap-2 items-start">
              <Calendar size={18} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs text-[#94A3B8]">Напоминает о плановых приёмах</span>
            </div>
            <div className="flex gap-2 items-start">
              <PillIcon size={18} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs text-[#94A3B8]">Контролирует приём лекарств</span>
            </div>
            <div className="flex gap-2 items-start">
              <BarChart3 size={18} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs text-[#94A3B8]">Следит за динамикой показателей</span>
            </div>
            <div className="flex gap-2 items-start">
              <Link2 size={18} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs text-[#94A3B8]">Координирует между специалистами</span>
            </div>
            <div className="flex gap-2 items-start">
              <Phone size={18} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span className="text-xs text-[#94A3B8]">Всегда на связи для вопросов</span>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <div className="space-y-2">
          {[
            {
              title: 'Базовый',
              price: '3 900 ₸/мес',
              features: ['1 человек', 'Напоминания', '1 консультация/мес']
            },
            {
              title: 'Семейный',
              price: '6 900 ₸/мес',
              features: ['До 4 человек', 'Полное сопровождение'],
              popular: true
            },
            {
              title: 'Премиум',
              price: '12 900 ₸/мес',
              features: ['Персональный менеджер 24/7']
            }
          ].map((plan) => (
            <Card
              key={plan.title}
              className={`animate-fadeIn ${plan.popular ? 'border border-[#00B956]' : ''}`}
              style={{ animationDelay: plan.popular ? '100ms' : '150ms' }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-700 text-[#F9FAFB]">{plan.title}</h3>
                {plan.popular && <Pill variant="green">ПОПУЛЯРНЫЙ</Pill>}
              </div>
              <p className="text-lg font-700 text-[#F9FAFB] mb-2">{plan.price}</p>
              <div className="space-y-1 mb-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="text-xs text-[#94A3B8] flex gap-2 items-start">
                    <Check size={16} className="text-[#00B956] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant="secondary" size="sm" className="w-full text-xs">
                Выбрать
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* COMING SOON Overlay */}
      <div className="fixed inset-0 bg-[rgba(13,17,23,0.9)] backdrop-blur-sm flex items-center justify-center z-50 rounded-[40px] pointer-events-none">
        <div className="text-center">
          <Clock size={48} className="text-[#00B956] mb-4 mx-auto" strokeWidth={1.5} />
          <p className="text-white font-700 text-lg mb-2">Скоро</p>
          <p className="text-[#94A3B8] text-sm">Уведомим о запуске</p>
        </div>
      </div>
    </div>
  )
}
