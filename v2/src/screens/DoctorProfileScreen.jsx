import { useState } from 'react'
import { Header, Card, Button, Pill, DoctorCard } from '../components/UI'
import { DOCTORS, REVIEWS_SAMPLE } from '../data/mockData'

export default function DoctorProfileScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const reviews = REVIEWS_SAMPLE.slice(0, showAllReviews ? undefined : 2)

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title={doctor.name} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Hero Card */}
        <Card className="text-center animate-fadeIn">
          <div className="text-7xl mb-4">{doctor.photo}</div>
          <h1 className="text-[20px] font-700 text-[#F9FAFB]">{doctor.name}</h1>
          <p className="text-sm text-[#94A3B8] mt-1">{doctor.specialty}</p>

          <div className="flex items-center justify-center gap-2 mt-3 mb-4">
            <span className="text-yellow-400">★</span>
            <span className="font-700 text-[#F9FAFB]">{doctor.rating}</span>
            <span className="text-xs text-[#94A3B8]">({doctor.reviews} отзывов)</span>
          </div>

          {doctor.status === 'online' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B956] text-white text-xs font-600 mb-4">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              онлайн · ответ ~{doctor.waitTime} мин
            </div>
          )}

          {/* Info Chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <Pill variant="gray" icon="🎓">
              КНМУ 2016
            </Pill>
            <Pill variant="gray" icon="📍">
              {doctor.city}
            </Pill>
            <Pill variant="gray" icon="🌐">
              {doctor.languages.join(' · ')}
            </Pill>
          </div>
        </Card>

        {/* About */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h2 className="text-sm font-700 text-[#F9FAFB] mb-3">О враче</h2>
          <p className={`text-sm text-[#94A3B8] leading-6 ${!aboutExpanded && 'line-clamp-3'}`}>
            {doctor.about}
          </p>
          <button
            onClick={() => setAboutExpanded(!aboutExpanded)}
            className="text-xs text-[#00B956] font-600 mt-2 hover:opacity-70"
          >
            {aboutExpanded ? 'Свернуть' : 'Читать далее...'}
          </button>
        </Card>

        {/* Services */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h2 className="text-sm font-700 text-[#F9FAFB] mb-3">Принимает по вопросам</h2>
          <div className="space-y-2">
            {doctor.services.map((service, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[#00B956]">•</span>
                <span className="text-sm text-[#94A3B8]">{service}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Price */}
        <Card variant="elevated" className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <h2 className="text-sm font-700 text-[#F9FAFB] mb-3">Цена онлайн консультации</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-[#94A3B8]">Стандартная цена</span>
              <span className="text-lg font-700 text-[#F9FAFB] line-through text-opacity-50">
                {doctor.price.toLocaleString()} ₸
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[#94A3B8]">С кешбэком 20%</span>
              <span className="text-xl font-700 text-[#00B956]">{doctor.cashback.toLocaleString()} ₸</span>
            </div>
            <p className="text-xs text-[#94A3B8] pt-2 border-t border-[rgba(255,255,255,0.08)]">
              💬 Длительность: до 30 минут
            </p>
            <p className="text-xs text-[#94A3B8]">
              📋 Включено: консультация + назначения + follow-up
            </p>
          </div>
        </Card>

        {/* Reviews */}
        <Card className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-700 text-[#F9FAFB]">Отзывы</h2>
            <button
              onClick={() => nav.push('doctor-reviews', { doctorId: doctor.id })}
              className="text-xs text-[#00B956] font-600 hover:opacity-70"
            >
              Все {doctor.reviews} →
            </button>
          </div>

          {reviews.map((review) => (
            <div key={review.id} className="bg-[#0D1117] rounded-[14px] p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-600 text-[#F9FAFB]">{review.authorInitials}</span>
                <span className="text-xs text-[#94A3B8]">{review.date}</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] leading-5">{review.text}</p>
            </div>
          ))}
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 sticky bottom-20 bg-gradient-to-t from-[#0D1117] from-80% to-transparent pt-4">
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
      </div>
    </div>
  )
}
