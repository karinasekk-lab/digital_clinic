import { Star, ChevronRight, Dot } from 'lucide-react'

export function DoctorCard({ doctor, onSelect }) {
  const isOnline = doctor.status === 'online'

  return (
    <button
      onClick={() => onSelect?.(doctor.id)}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-[12px] hover:bg-[#171C2B]/80 transition-colors active:scale-95 group border border-transparent hover:border-[#2A3145]"
    >
      {/* Doctor Photo - Premium Style */}
      <div className="relative flex-shrink-0">
        {/* Photo Container */}
        <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-[#3B82F6]/10 to-[#00C853]/5 flex items-center justify-center border border-[#2A3145]">
          {/* Placeholder - Premium initials */}
          <span className="text-lg font-600 text-[#AAB3C5]">
            {doctor.photo}
          </span>
        </div>

        {/* Online Indicator - Subtle */}
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00C853] rounded-full border border-[#090D14]" />
        )}
      </div>

      {/* Doctor Info - Vertical Stack */}
      <div className="flex-1 min-w-0 text-left">
        {/* Name + Rating */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h4 className="font-600 text-white text-sm truncate">{doctor.name}</h4>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={12} className="text-[#FFA500]" fill="#FFA500" />
            <span className="text-xs font-500 text-[#AAB3C5]">{doctor.rating}</span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-xs text-[#6B7280] mb-1 truncate">{doctor.specialty}</p>

        {/* Availability + Price */}
        <div className="flex items-center gap-2 text-[10px]">
          {isOnline ? (
            <>
              <span className="text-[#00C853] font-500">Онлайн</span>
              <span className="text-[#4A5268]">•</span>
              <span className="text-[#AAB3C5]">~{doctor.waitTime} мин</span>
            </>
          ) : (
            <span className="text-[#6B7280]">По записи</span>
          )}
          <span className="text-[#4A5268]">•</span>
          <span className="text-[#AAB3C5] font-500">{doctor.price.toLocaleString()} ₸</span>
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
