import { Header, Card, Button, Pill, DoctorCard } from '../components/UI'
import { DOCTORS } from '../data/mockData'
import { useToast } from '../contexts/ToastContext'

export default function DutyDoctorScreen({ nav }) {
  const { addToast } = useToast()
  const onlineDoctors = DOCTORS.filter((d) => d.status === 'online')

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="🌙 Дежурный врач 24/7" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Status */}
        <div className="flex items-center gap-2 text-[#00B956]">
          <span className="w-2 h-2 bg-[#00B956] rounded-full animate-pulse"></span>
          <span className="text-sm font-600">Работает круглосуточно</span>
        </div>

        {/* Hero Card */}
        <Card variant="green" className="animate-fadeIn">
          <div className="space-y-2">
            <p className="font-700 text-[#F9FAFB] text-sm">Врач ответит в любое время суток</p>
            <p className="text-xs text-[#94A3B8]">Ночь, выходные, праздники — мы работаем</p>
          </div>
          <div className="mt-3 text-2xl">🌙 ✚</div>
        </Card>

        {/* When to Call */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Когда обращаться</h3>
          <div className="space-y-2 text-xs text-[#94A3B8]">
            <div className="flex gap-2">
              <span>•</span>
              <span>Резкое ухудшение самочувствия</span>
            </div>
            <div className="flex gap-2">
              <span>•</span>
              <span>Температура выше 38.5 ночью</span>
            </div>
            <div className="flex gap-2">
              <span>•</span>
              <span>Острая боль (не экстренная)</span>
            </div>
            <div className="flex gap-2">
              <span>•</span>
              <span>Вопрос не терпит до утра</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
            <p className="text-xs text-[#E24B4A] font-600">🚨 При угрозе жизни → звоните 103</p>
          </div>
        </Card>

        {/* Available Now */}
        <div>
          <h3 className="text-xs font-700 uppercase text-[#94A3B8] mb-3">Доступны сейчас</h3>
          <div className="space-y-2">
            {onlineDoctors.slice(0, 3).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onTap={() => nav.push('doctor-profile', { doctorId: doctor.id })}
                showPrice={true}
              />
            ))}
          </div>
        </div>

        {/* Pricing */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Тарифы</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">Ночной приём (22:00—8:00)</span>
              <span className="font-700 text-[#F9FAFB]">5 900 ₸</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">Дневной (8:00—22:00)</span>
              <span className="font-700 text-[#F9FAFB]">4 900 ₸</span>
            </div>
            <div className="text-xs text-[#00B956] font-600 mt-2">Кешбэк 20% на оба тарифа</div>
          </div>
        </Card>

        {/* CTA */}
        <Button
          onClick={() => {
            addToast('Переход к выбору врача', 'info', 1500)
            nav.push('doctor-list')
          }}
          size="md"
          className="w-full"
        >
          Вызвать дежурного врача
        </Button>
      </div>
    </div>
  )
}
