import { useState } from 'react'
import { Card, Button } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { CheckCircle, Calendar, Pill, FileText, Star } from 'lucide-react'
import { DOCTORS, CURRENT_USER } from '../data/mockData'

export default function PostConsultationScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const { addToast } = useToast()

  const handleSubmitRating = () => {
    if (rating === 0) {
      addToast('Выберите оценку', 'warning', 2000)
      return
    }
    addToast(`Спасибо за оценку ${rating} ★`, 'success', 2000)
    setRating(0)
    setReview('')
  }

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      {/* Success Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00C853]/20 border border-[#00C853]/30 mb-4 animate-scaleIn">
          <CheckCircle size={40} className="text-[#00C853]" fill="#00C853" />
        </div>
        <h1 className="text-2xl font-700 text-white mb-2">Консультация завершена</h1>
        <p className="text-sm text-[#00C853] font-600">Начислено 980 ₸ бонусами Freedom</p>
      </div>

      <div className="px-4 space-y-4">
        {/* Result Card */}
        <Card variant="elevated" className="animate-fadeIn">
          <div className="flex gap-3 mb-4">
            <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-700 text-white">{initials}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-700 text-white">{doctor.name}</h3>
              <p className="text-xs text-[#AAB3C5] mt-0.5">{doctor.specialty}</p>
              <p className="text-xs text-[#AAB3C5] mt-1">Длительность: {params.duration} мин</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#2A3145]">
            <div>
              <h4 className="text-sm font-700 text-white mb-2">Диагноз</h4>
              <p className="text-sm text-[#AAB3C5]">ОРВИ (острая респираторная вирусная инфекция)</p>
            </div>

            <div>
              <h4 className="text-sm font-700 text-white mb-2">Назначено</h4>
              <div className="space-y-2">
                <div className="text-xs text-[#AAB3C5]">
                  • <span className="font-600">Амоксициллин 500мг</span> · 3 раза в день · 7 дней
                </div>
                <div className="text-xs text-[#AAB3C5]">
                  • <span className="font-600">Парацетамол 500мг</span> · при температуре
                </div>
                <div className="text-xs text-[#AAB3C5]">
                  • <span className="font-600">Полоскание горла</span> · 3-4 раза в день
                </div>
              </div>
            </div>

            <a href="#" className="text-xs text-[#00C853] font-600 hover:opacity-80 inline-block transition-opacity">
              → Сохранено в Мои обращения
            </a>
          </div>
        </Card>

        {/* Rating */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4">Как прошла консультация?</h3>

          {/* Star Rating */}
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-transform active:scale-110 ${
                  rating >= star ? 'text-[#FFA500] scale-110' : 'text-[#4A5268]'
                }`}
              >
                <Star size={32} fill={rating >= star ? '#FFA500' : 'none'} />
              </button>
            ))}
          </div>

          {/* Review Input */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Оставить отзыв... (необязательно)"
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 focus:ring-1 focus:ring-[#00C853]/20 resize-none h-20 mb-4 transition-all"
          />

          <Button variant="secondary" size="sm" className="w-full" onClick={handleSubmitRating}>
            Отправить оценку
          </Button>
        </Card>

        {/* CTA Cards */}
        {/* Follow-up */}
        <Card variant="elevated" className="animate-fadeIn">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-[#00C853]" />
            </div>
            <div className="flex-1">
              <h4 className="font-700 text-white text-sm mb-1">Продолжить наблюдение</h4>
              <p className="text-xs text-[#AAB3C5] mb-3">Врач напишет через 3 дня</p>
              <Button
                onClick={() => addToast('Наблюдение добавлено', 'success', 2000)}
                size="sm"
                className="w-full"
              >
                Добавить наблюдение
              </Button>
            </div>
          </div>
        </Card>

        {/* Pharmacy */}
        <Card className="animate-fadeIn">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#171C2B] border border-[#2A3145] flex items-center justify-center flex-shrink-0">
              <Pill size={18} className="text-[#AAB3C5]" />
            </div>
            <div className="flex-1">
              <h4 className="font-700 text-white text-sm mb-1">Купить назначенное</h4>
              <p className="text-xs text-[#AAB3C5] mb-3">Аптека Freedom · кешбэк 20%</p>
              <div className="text-xs text-[#AAB3C5] mb-3 space-y-1">
                <div>• Амоксициллин 500мг</div>
                <div>• Парацетамол 500мг</div>
              </div>
              <Button
                onClick={() => {
                  addToast('Переход в аптеку', 'info', 1500)
                  nav.push('home')
                }}
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
        <Card className="animate-fadeIn">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#171C2B] border border-[#2A3145] flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-[#AAB3C5]" />
            </div>
            <div className="flex-1">
              <h4 className="font-700 text-white text-sm mb-1">Оформить больничный</h4>
              <p className="text-xs text-[#AAB3C5] mb-3">На основе консультации · 15 мин</p>
              <Button
                onClick={() => {
                  addToast('Переход к оформлению больничного', 'info', 1500)
                  nav.push('sick-leave')
                }}
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
          className="text-center w-full text-sm text-[#AAB3C5] hover:text-white py-4 transition-colors"
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
