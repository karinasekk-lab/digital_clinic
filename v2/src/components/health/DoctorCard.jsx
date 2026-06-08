import { Star } from 'lucide-react'

// Color palette for doctor initials
const DOCTOR_COLORS = {
  'doc-1': { bg: 'from-[#00C853] to-[#00B85A]', icon: '#00C853' }, // Green
  'doc-2': { bg: 'from-[#4ECDC4] to-[#44A08D]', icon: '#4ECDC4' }, // Teal
  'doc-3': { bg: 'from-[#FFB84D] to-[#FFA500]', icon: '#FFB84D' }, // Orange
  'doc-4': { bg: 'from-[#A78BFA] to-[#9333EA]', icon: '#A78BFA' }, // Purple
  'doc-5': { bg: 'from-[#3B82F6] to-[#2563EB]', icon: '#3B82F6' }, // Blue
}

export function DoctorCard({ doctor, onSelect }) {
  const isOnline = doctor.status === 'online'
  const colors = DOCTOR_COLORS[doctor.id] || DOCTOR_COLORS['doc-1']

  return (
    <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 space-y-3 hover:border-[#3B5469] transition-colors">
      {/* Top Row - Photo + Info + Price */}
      <div className="flex gap-3 items-start">
        {/* Doctor Photo - Large circular */}
        <div className="relative flex-shrink-0">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg shadow-[${colors.icon}]/30 ring-2 ring-[${colors.icon}]/20`}>
            <span className="text-2xl font-700 text-white">
              {doctor.photo}
            </span>
          </div>

          {/* Online Indicator */}
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00C853] rounded-full border-2 border-[#0D111A] shadow-lg" />
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          {/* Name */}
          <h4 className="font-700 text-white text-base">{doctor.name}</h4>

          {/* Specialty + Experience */}
          <p className="text-xs text-[#AAB3C5] mt-0.5">
            {doctor.specialty} · Стаж {doctor.experience} лет
          </p>

          {/* Rating + Online + Wait */}
          <div className="flex items-center gap-2 mt-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              <Star size={13} className="text-[#FFA500]" fill="#FFA500" />
              <span className="font-600 text-white">{doctor.rating}</span>
            </div>
            {isOnline && (
              <>
                <span className="text-[#4A5268]">•</span>
                <span className="text-[#00C853] font-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-[#00C853] rounded-full"></span>
                  онлайн
                </span>
                <span className="text-[#4A5268]">•</span>
                <span className="text-[#AAB3C5]">~{doctor.waitTime} мин</span>
              </>
            )}
          </div>
        </div>

        {/* Price Section - Right Side */}
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-[#6B7280] line-through">
            {doctor.price.toLocaleString()} ₸
          </p>
          <p className="text-lg font-700 text-[#00C853] mt-1">
            {(doctor.price - doctor.cashback).toLocaleString()} ₸
          </p>
          <p className="text-xs text-[#00C853] font-500">
            с кешбэком
          </p>
        </div>
      </div>

      {/* CTA Button - Full Width */}
      <button
        onClick={() => onSelect?.(doctor.id)}
        className="w-full bg-[#00C853] hover:bg-[#00B85A] text-white font-700 py-2.5 rounded-[10px] transition-colors active:scale-95 flex items-center justify-center gap-2 text-xs"
      >
        Записаться →
      </button>
    </div>
  )
}
