import { useState } from 'react'
import { Card, Button, Pill } from '../components/UI'
import { DOCTORS, CURRENT_USER } from '../data/mockData'

export default function PostConsultationScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      {/* Success Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00B956] mb-4 animate-scaleIn">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-[22px] font-700 text-[#F9FAFB] mb-2">Консультация завершена</h1>
        <p className="text-sm text-[#00B956] font-600">Начислено 980 ₸ бонусами Freedom</p>
      </div>

      <div className="px-4 space-y-4">
        {/* Result Card */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="flex gap-3 mb-4">
            <div className="text-4xl">{doctor.photo}</div>
            <div className="flex-1">
              <h3 className="font-700 text-[#F9FAFB]">{doctor.name}</h3>
              <p className="text-xs text-[#94A3B8]">{doctor.specialty}</p>
              <p className="text-xs text-[#94A3B8] mt-1">Длительность: {params.duration} мин</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
            <div>
              <h4 className="text-sm font-700 text-[#F9FAFB] mb-2">Диагноз</h4>
              <p className="text-sm text-[#94A3B8]">ОРВИ (острая респираторная вирусная инфекция)</p>
            </div>

            <div>
              <h4 className="text-sm font-700 text-[#F9FAFB] mb-2">Назначено</h4>
              <div className="space-y-2">
                <div className="text-xs text-[#94A3B8]">
                  • <span className="font-600">Амоксициллин 500мг</span> · 3 раза в день · 7 дней
                </div>
                <div className="text-xs text-[#94A3B8]">
                  • <span className="font-600">Парацетамол 500мг</span> · при температуре
                </div>
                <div className="text-xs text-[#94A3B8]">
                  • <span className="font-600">Полоскание горла</span> · 3-4 раза в день
                </div>
              </div>
            </div>

            <a href="#" className="text-xs text-[#00B956] font-600 hover:opacity-70 inline-block">
              → Сохранено в Мои обращения
            </a>
          </div>
        </Card>

        {/* Rating */}
        <Card className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Как прошла консультация?</h3>

          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition-transform ${rating >= star ? 'text-yellow-400 scale-110' : 'text-[#4B5563]'}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Review Input */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Оставить отзыв... (необязательно)"
            className="w-full bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-[12px] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none focus:border-[rgba(0,185,86,0.3)] resize-none h-20 mb-3"
          />

          <Button variant="secondary" size="sm" className="w-full">
            Отправить оценку
          </Button>
        </Card>

        {/* CTA Cards */}
        {/* Follow-up */}
        <Card variant="green" className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex gap-3">
            <span className="text-2xl">📅</span>
            <div className="flex-1">
              <h4 className="font-700 text-[#F9FAFB] text-sm mb-1">Продолжить наблюдение</h4>
              <p className="text-xs text-[#94A3B8] mb-3">Врач напишет через 3 дня</p>
              <Button variant="primary" size="sm" className="w-full">
                Добавить наблюдение
              </Button>
            </div>
          </div>
        </Card>

        {/* Pharmacy */}
        <Card className="animate-fadeIn" style={{ animationDelay: '250ms' }}>
          <div className="flex gap-3">
            <span className="text-2xl">💊</span>
            <div className="flex-1">
              <h4 className="font-700 text-[#F9FAFB] text-sm mb-1">Купить назначенное</h4>
              <p className="text-xs text-[#94A3B8] mb-3">Аптека Freedom · кешбэк 20%</p>
              <div className="text-xs text-[#94A3B8] mb-3 space-y-1">
                <div>• Амоксициллин 500мг</div>
                <div>• Парацетамол 500мг</div>
              </div>
              <Button
                onClick={() => nav.push('home')}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Перейти в аптеку
              </Button>
            </div>
          </div>
        </Card>

        {/* Sick Leave */}
        <Card className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <div className="flex gap-3">
            <span className="text-2xl">📄</span>
            <div className="flex-1">
              <h4 className="font-700 text-[#F9FAFB] text-sm mb-1">Оформить больничный</h4>
              <p className="text-xs text-[#94A3B8] mb-3">На основе консультации · 15 мин</p>
              <Button
                onClick={() => nav.push('sick-leave')}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Оформить
              </Button>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <button
          onClick={() => nav.reset('home')}
          className="text-center w-full text-sm text-[#94A3B8] hover:text-[#F9FAFB] py-4 transition-colors"
        >
          Вернуться в главную
        </button>
      </div>

      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}
