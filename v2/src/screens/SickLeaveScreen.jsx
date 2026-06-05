import { useState } from 'react'
import { Header, Card, Input, Button } from '../components/UI'

export default function SickLeaveScreen({ nav }) {
  const [formData, setFormData] = useState({
    reason: '',
    company: '',
    inn: '',
    dateFrom: new Date().toISOString().split('T')[0]
  })

  const handleConfirm = () => {
    nav.push('confirmation', { isSickLeave: true })
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Больничный онлайн" subtitle="Официально · 15 минут" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Info */}
        <Card variant="green" className="animate-fadeIn">
          <div className="flex gap-3">
            <span className="text-2xl">ℹ</span>
            <p className="text-xs text-[#94A3B8] leading-6">
              Больничный лист выдаётся по результатам онлайн-консультации с врачом.
              Официальный документ принимается работодателем.
            </p>
          </div>
        </Card>

        {/* Steps */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Как это работает</h3>
          <div className="space-y-3 text-sm">
            {[
              { num: '①', text: 'Консультация с терапевтом (5-10 мин)' },
              { num: '②', text: 'Врач оформляет больничный' },
              { num: '③', text: 'Документ в приложении + на email' }
            ].map((step) => (
              <div key={step.num} className="flex gap-3">
                <span className="text-[#00B956] font-700">{step.num}</span>
                <span className="text-[#94A3B8]">{step.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Form */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Причина обращения</h3>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Опишите симптомы..."
            className="w-full bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-[12px] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none focus:border-[rgba(0,185,86,0.3)] resize-none h-24 mb-4"
          />

          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Работодатель</h3>
          <Input
            placeholder="Название организации"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="mb-3"
          />

          <Input
            placeholder="ИНН (необязательно)"
            value={formData.inn}
            onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
            className="mb-4"
          />

          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Период</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="checkbox"
              id="from-today"
              defaultChecked
              className="w-4 h-4 accent-[#00B956]"
            />
            <label htmlFor="from-today" className="text-sm text-[#F9FAFB]">
              С сегодня
            </label>
          </div>

          <input
            type="date"
            value={formData.dateFrom}
            onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
            className="w-full bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-[12px] px-4 py-3 text-sm text-[#F9FAFB] outline-none focus:border-[rgba(0,185,86,0.3)]"
          />
        </Card>

        {/* Price */}
        <Card className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Консультация + оформление</span>
              <span className="font-700 text-[#F9FAFB]">6 900 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Кешбэк 20%</span>
              <span className="font-700 text-[#00B956]">−1 380 ₸</span>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-2 mt-2 flex justify-between">
              <span className="text-[#94A3B8]">Итого</span>
              <span className="font-700 text-[#F9FAFB]">6 900 ₸</span>
            </div>
            <p className="text-xs text-[#00B956] font-600 mt-2">Вернётся 1 380 ₸</p>
          </div>
        </Card>

        {/* CTA */}
        <div className="space-y-3 sticky bottom-20">
          <Button onClick={handleConfirm} size="md" className="w-full">
            Начать оформление
          </Button>
          <Button variant="secondary" size="sm" className="w-full">
            Задать вопрос
          </Button>
        </div>
      </div>
    </div>
  )
}
