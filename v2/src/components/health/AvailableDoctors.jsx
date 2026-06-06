import { MapPin, Star, AlertCircle } from 'lucide-react'

export function AvailableDoctors({ doctors, onDoctorSelect, onViewAll }) {
  return (
    <div className="px-4 py-4 space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">
          Доступны сейчас
        </h3>
        <button onClick={onViewAll} className="text-xs text-[#00C853] font-600 hover:opacity-80">
          Все врачи →
        </button>
      </div>

      {/* Doctor Cards */}
      <div className="space-y-2">
        {doctors.slice(0, 3).map((doctor) => {
          const initials = doctor.name
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0].toUpperCase())
            .join('')

          return (
            <button
              key={doctor.id}
              onClick={() => onDoctorSelect?.(doctor.id)}
              className="w-full text-left bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 hover:border-[#00C853]/30 hover:bg-[#1E2433] transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00C853]/20 to-[#00B85A]/20 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-700 text-[#00C853]">{initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-700 text-white truncate">{doctor.name}</h4>
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="text-[#FFA500]" fill="#FFA500" />
                      <span className="text-xs font-600 text-white">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-xs text-[#AAB3C5] truncate">{doctor.specialty}</p>
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#00C853]/10 border border-[#00C853]/20">
                      <AlertCircle size={10} className="text-[#00C853]" fill="currentColor" />
                      <span className="text-[10px] font-600 text-[#00C853]">Онлайн</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-700 text-white">{doctor.price.toLocaleString()} ₸</p>
                  <p className="text-[10px] text-[#00C853] mt-0.5">{doctor.cashback.toLocaleString()} ₸</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
