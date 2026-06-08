import { Star, ChevronRight } from 'lucide-react'

// Color palette for doctor initials
const DOCTOR_COLORS = {
  'doc-1': { bg: 'from-[#FF6B6B] to-[#FF8E72]', icon: '#FF6B6B' }, // Red
  'doc-2': { bg: 'from-[#4ECDC4] to-[#44A08D]', icon: '#4ECDC4' }, // Teal
  'doc-3': { bg: 'from-[#FFB84D] to-[#FFA500]', icon: '#FFB84D' }, // Orange
  'doc-4': { bg: 'from-[#6C5CE7] to-[#A29BFE]', icon: '#6C5CE7' }, // Purple
  'doc-5': { bg: 'from-[#00D2FC] to-[#3498DB]', icon: '#00D2FC' }, // Blue
}

export function DoctorCard({ doctor, onSelect }) {
  const isOnline = doctor.status === 'online'
  const colors = DOCTOR_COLORS[doctor.id] || DOCTOR_COLORS['doc-1']

  return (
    <button
      onClick={() => onSelect?.(doctor.id)}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#171C2B]/60 transition-colors active:scale-95 group border-b border-[#2A3145]/50 last:border-b-0"
    >
      {/* Doctor Photo - Beautiful gradient placeholder */}
      <div className="relative flex-shrink-0">
        <div className={`w-14 h-14 rounded-[12px] bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg shadow-[${colors.icon}]/20`}>
          <span className="text-lg font-700 text-white">
            {doctor.photo}
          </span>
        </div>

        {/* Online Indicator */}
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00C853] rounded-full border-2 border-[#090D14] shadow-lg" />
        )}
      </div>

      {/* Doctor Info */}
      <div className="flex-1 min-w-0">
        {/* Name + Rating */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h4 className="font-600 text-white text-sm">{doctor.name}</h4>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={12} className="text-[#FFA500]" fill="#FFA500" />
            <span className="text-xs font-500 text-[#AAB3C5]">{doctor.rating}</span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-xs text-[#6B7280] mb-1">{doctor.specialty}</p>

        {/* Status + Price + Cashback */}
        <div className="flex items-center gap-2 text-[10px] flex-wrap">
          {isOnline ? (
            <>
              <span className="text-[#00C853] font-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></span>
                Онлайн
              </span>
              <span className="text-[#4A5268]">•</span>
              <span className="text-[#AAB3C5]">~{doctor.waitTime} мин</span>
            </>
          ) : (
            <span className="text-[#6B7280]">По записи</span>
          )}

          <span className="text-[#4A5268]">•</span>

          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-[#AAB3C5] font-500">{doctor.price.toLocaleString()} ₸</span>
            {/* Cashback */}
            <span className="text-[#00C853] font-600 ml-0.5">+{doctor.cashback.toLocaleString()} ₸</span>
          </div>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight
        size={16}
        className="flex-shrink-0 text-[#4A5268] group-hover:text-[#6B7280] group-hover:translate-x-0.5 transition-all"
      />
    </button>
  )
}
