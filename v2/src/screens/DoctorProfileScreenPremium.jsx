import { useState } from 'react'
import { Star, MapPin, Globe, MessageCircle, FileText, ArrowRight } from 'lucide-react'
import { Header, Card, Button } from '../components/UI'
import { DOCTORS, REVIEWS_SAMPLE } from '../data/mockData'

export default function DoctorProfileScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const reviews = REVIEWS_SAMPLE.slice(0, showAllReviews ? undefined : 2)

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title={doctor.name} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6 overflow-y-auto">
        {/* Hero Card */}
        <Card variant="elevated" className="text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-700 text-white">{initials}</span>
          </div>
          <h1 className="text-xl font-700 text-white">{doctor.name}</h1>
          <p className="text-sm text-[#AAB3C5] mt-2">{doctor.specialty}</p>

          <div className="flex items-center justify-center gap-2 mt-4 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(Math.round(doctor.rating))].map((_, i) => (
                <Star key={i} size={14} className="text-[#FFA500]" fill="#FFA500" />
              ))}
            </div>
            <span className="font-700 text-white">{doctor.rating}</span>
            <span className="text-xs text-[#AAB3C5]">({doctor.reviews} отзывов)</span>
          </div>

          {doctor.status === 'online' && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 text-white text-xs font-600 mb-4">
              <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></span>
              онлайн · ответ ~{doctor.waitTime} мин
            </div>
          )}

          {/* Info Chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <div className="px-3 py-1.5 bg-[#171C2B] border border-[#2A3145] rounded-[12px] text-xs text-[#AAB3C5] font-600">
              🎓 КНМУ 2016
            </div>
            <div className="px-3 py-1.5 bg-[#171C2B] border border-[#2A3145] rounded-[12px] text-xs text-[#AAB3C5] font-600 flex items-center gap-1.5">
              <MapPin size={12} />
              {doctor.city}
            </div>
            <div className="px-3 py-1.5 bg-[#171C2B] border border-[#2A3145] rounded-[12px] text-xs text-[#AAB3C5] font-600 flex items-center gap-1.5">
              <Globe size={12} />
              {doctor.languages.join(' · ')}
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="animate-fadeIn">
          <h2 className="text-sm font-700 text-white mb-3">О враче</h2>
          <p className={`text-sm text-[#AAB3C5] leading-6 ${!aboutExpanded && 'line-clamp-3'}`}>
            {doctor.about}
          </p>
          <button
            onClick={() => setAboutExpanded(!aboutExpanded)}
            className="text-xs text-[#00C853] font-600 mt-2 hover:opacity-80 transition-opacity"
          >
            {aboutExpanded ? 'Свернуть' : 'Читать далее...'}
          </button>
        </Card>

        {/* Services */}
        <Card className="animate-fadeIn">
          <h2 className="text-sm font-700 text-white mb-3">Принимает по вопросам</h2>
          <div className="space-y-2">
            {doctor.services.map((service, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]"></span>
                <span className="text-sm text-[#AAB3C5]">{service}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Price */}
        <Card variant="elevated" className="animate-fadeIn">
          <h2 className="text-sm font-700 text-white mb-3">Цена онлайн консультации</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[#AAB3C5]">Стандартная цена</span>
              <span className="text-sm font-700 text-[#AAB3C5] line-through opacity-50">
                {doctor.price.toLocaleString()} ₸
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[#AAB3C5]">С кешбэком 20%</span>
              <span className="text-xl font-700 text-[#00C853]">{doctor.cashback.toLocaleString()} ₸</span>
            </div>
            <div className="pt-3 border-t border-[#2A3145] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#AAB3C5]">
                <MessageCircle size={14} className="flex-shrink-0" />
                Длительность: до 30 минут
              </div>
              <div className="flex items-center gap-2 text-xs text-[#AAB3C5]">
                <FileText size={14} className="flex-shrink-0" />
                Включено: консультация + назначения + follow-up
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews */}
        <Card className="animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-700 text-white">Отзывы</h2>
            <button
              onClick={() => nav.push('doctor-reviews', { doctorId: doctor.id })}
              className="text-xs text-[#00C853] font-600 hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              Все {doctor.reviews} <ArrowRight size={12} />
            </button>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="bg-[#171C2B] border border-[#2A3145] rounded-[16px] p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-600 text-white">{review.authorInitials}</span>
                <span className="text-xs text-[#AAB3C5]">{review.date}</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#FFA500]" fill="#FFA500" />
                ))}
              </div>
              <p className="text-xs text-[#AAB3C5] leading-5">{review.text}</p>
            </div>
          ))}
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={() => nav.push('confirmation', { doctorId: doctor.id })}
            size="md"
            className="w-full"
          >
            Начать сейчас · {doctor.price.toLocaleString()} ₸
          </Button>
          <Button
            onClick={() => nav.push('slot-booking', { doctorId: doctor.id })}
            variant="secondary"
            size="md"
            className="w-full"
          >
            Выбрать время →
          </Button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
