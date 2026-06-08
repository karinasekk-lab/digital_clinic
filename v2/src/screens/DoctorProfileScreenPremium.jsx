import { useState } from 'react'
import { Star, MapPin, Globe, Clock, FileText, ChevronLeft, MessageCircle } from 'lucide-react'
import { DOCTORS, REVIEWS_SAMPLE } from '../data/mockData'

export default function DoctorProfileScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [aboutExpanded, setAboutExpanded] = useState(false)

  const reviews = REVIEWS_SAMPLE.slice(0, 3)

  return (
    <div className="h-screen bg-[#090D14] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-b from-[#0D111A] via-[#0D111A] to-transparent border-b border-[#2A3145] px-4 py-3 flex items-center justify-between min-h-[60px]">
        <button
          onClick={() => nav.pop()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#171C2B] transition-colors active:scale-95"
        >
          <ChevronLeft size={24} className="text-[#AAB3C5]" strokeWidth={1.5} />
        </button>

        <div className="flex-1 text-center px-4">
          <h1 className="text-sm font-600 text-white truncate">{doctor.name}</h1>
          <p className="text-xs text-[#6B7280] mt-0.5">{doctor.specialty}</p>
        </div>

        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 space-y-0.5">
        {/* Quick Info Card */}
        <div className="px-4 pt-3">
          <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[14px] p-4 space-y-3">
            {/* Rating + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(Math.round(doctor.rating))].map((_, i) => (
                    <Star key={i} size={13} className="text-[#FFA500]" fill="#FFA500" />
                  ))}
                </div>
                <span className="font-600 text-white text-sm">{doctor.rating}</span>
                <span className="text-xs text-[#6B7280]">({doctor.reviews})</span>
              </div>

              {doctor.status === 'online' && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" />
                  <span className="text-xs font-500 text-[#00C853]">Онлайн сейчас</span>
                </div>
              )}
            </div>

            {/* Experience + Education + Location */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#0D111A] rounded-[10px] p-2">
                <p className="text-xs font-600 text-white">{doctor.experience} лет</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Опыт</p>
              </div>
              <div className="bg-[#0D111A] rounded-[10px] p-2">
                <p className="text-xs font-600 text-white">{doctor.city}</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Город</p>
              </div>
              <div className="bg-[#0D111A] rounded-[10px] p-2">
                <p className="text-xs font-600 text-white text-green-500">{doctor.price.toLocaleString()} ₸</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Цена</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="px-4">
          <div className="bg-[#0D111A] rounded-[12px] p-3 border border-[#2A3145]">
            <h3 className="text-xs font-600 text-white uppercase tracking-wider mb-2">Об услуге</h3>
            <p className={`text-xs text-[#AAB3C5] leading-5 ${!aboutExpanded && 'line-clamp-2'}`}>
              {doctor.about}
            </p>
            {doctor.about.length > 100 && (
              <button
                onClick={() => setAboutExpanded(!aboutExpanded)}
                className="text-xs text-[#3B82F6] font-500 mt-2 hover:text-[#60A5FA] transition-colors"
              >
                {aboutExpanded ? 'Свернуть' : 'Читать далее'}
              </button>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="px-4">
          <div className="bg-[#0D111A] rounded-[12px] p-3 border border-[#2A3145]">
            <h3 className="text-xs font-600 text-white uppercase tracking-wider mb-2">Принимает по вопросам</h3>
            <div className="flex flex-wrap gap-1.5">
              {doctor.services.slice(0, 4).map((service, i) => (
                <span
                  key={i}
                  className="inline-block px-2.5 py-1 text-xs text-[#AAB3C5] bg-[#171C2B] border border-[#2A3145] rounded-[8px]"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="px-4">
          <div className="bg-[#0D111A] rounded-[12px] p-3 border border-[#2A3145] space-y-2">
            <h3 className="text-xs font-600 text-white uppercase tracking-wider">Что включено</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#6B7280] flex-shrink-0 mt-0.5" />
                <span className="text-[#AAB3C5]">Консультация до 30 минут</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText size={14} className="text-[#6B7280] flex-shrink-0 mt-0.5" />
                <span className="text-[#AAB3C5]">Рецепты и назначения</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle size={14} className="text-[#6B7280] flex-shrink-0 mt-0.5" />
                <span className="text-[#AAB3C5]">Follow-up по результатам</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="px-4">
            <div className="bg-[#0D111A] rounded-[12px] p-3 border border-[#2A3145] space-y-2.5">
              <h3 className="text-xs font-600 text-white uppercase tracking-wider">Отзывы пациентов</h3>

              {reviews.map((review) => (
                <div key={review.id} className="bg-[#171C2B] border border-[#2A3145] rounded-[10px] p-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-600 text-white">{review.authorInitials}</span>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={11} className="text-[#FFA500]" fill="#FFA500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#AAB3C5] leading-4">{review.text}</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">{review.date}</p>
                </div>
              ))}

              <button
                onClick={() => nav.push('doctor-reviews', { doctorId: doctor.id })}
                className="w-full text-xs font-500 text-[#3B82F6] py-2 hover:text-[#60A5FA] transition-colors mt-1"
              >
                Все {doctor.reviews} отзывов →
              </button>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => nav.push('confirmation', { doctorId: doctor.id })}
            className="w-full bg-[#00C853] hover:bg-[#00B85A] text-white font-600 py-2.5 rounded-[10px] transition-colors active:scale-95 text-xs"
          >
            Записаться · {doctor.price.toLocaleString()} ₸
          </button>
          <button
            onClick={() => nav.push('slot-booking', { doctorId: doctor.id })}
            className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-600 py-2.5 rounded-[10px] transition-colors active:scale-95 text-xs"
          >
            Выбрать время
          </button>
        </div>
      </div>
    </div>
  )
}
