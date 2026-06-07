import { useState } from 'react'
import { Header, Card, Button } from '../components/UI'
import { FileText, Clock, CheckCircle } from 'lucide-react'

export default function SickLeaveScreenPremium({ nav }) {
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
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Больничный онлайн" subtitle="Официально · 15 минут" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        {/* Info */}
        <Card variant="elevated" className="animate-fadeIn border-l-4 border-[#00C853]">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-[#00C853]" />
            </div>
            <p className="text-xs text-[#AAB3C5] leading-6">
              Больничный лист выдаётся по результатам онлайн-консультации с врачом.
              Официальный документ принимается работодателем.
            </p>
          </div>
        </Card>

        {/* Steps */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4">Как это работает</h3>
          <div className="space-y-3">
            {[
              { num: '①', icon: Clock, text: 'Консультация с терапевтом (5-10 мин)' },
              { num: '②', icon: FileText, text: 'Врач оформляет больничный' },
              { num: '③', icon: CheckCircle, text: 'Документ в приложении + на email' }
            ].map((step) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-[#00C853]" />
                  </div>
                  <span className="text-sm text-[#AAB3C5]">{step.text}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Form */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4">Причина обращения</h3>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Опишите симптомы..."
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 resize-none h-24 mb-4 transition-all"
          />

          <h3 className="text-sm font-700 text-white mb-3">Работодатель</h3>
          <input
            type="text"
            placeholder="Название организации"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 mb-3 transition-all"
          />

          <input
            type="text"
            placeholder="ИНН (необязательно)"
            value={formData.inn}
            onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 mb-4 transition-all"
          />

          <h3 className="text-sm font-700 text-white mb-3">Период</h3>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="from-today"
              defaultChecked
              className="w-4 h-4 accent-[#00C853] cursor-pointer rounded"
            />
            <label htmlFor="from-today" className="text-sm text-white cursor-pointer">
              С сегодня
            </label>
          </div>

          <input
            type="date"
            value={formData.dateFrom}
            onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 transition-all"
          />
        </Card>

        {/* Price */}
        <Card className="animate-fadeIn">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#AAB3C5]">Консультация + оформление</span>
              <span className="font-700 text-white">6 900 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AAB3C5]">Кешбэк 20%</span>
              <span className="font-700 text-[#00C853]">−1 380 ₸</span>
            </div>
            <div className="border-t border-[#2A3145] pt-2 mt-2 flex justify-between">
              <span className="text-[#AAB3C5]">Итого</span>
              <span className="font-700 text-white">6 900 ₸</span>
            </div>
            <p className="text-xs text-[#00C853] font-600 mt-2">Вернётся 1 380 ₸</p>
          </div>
        </Card>

        {/* CTA */}
        <div className="space-y-3">
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
