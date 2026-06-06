import { Calendar, Clock, Video, ChevronRight } from 'lucide-react'

export function AppointmentCard({ doctor, appointmentDate, appointmentTime, timeUntil, onEnter }) {
  // Extract initials from doctor name
  const initials = doctor
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="px-4 py-4">
      {/* Section Title */}
      <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider mb-3 px-1">
        Ближайший приём
      </h3>

      {/* Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[28px] p-6 space-y-4">
        {/* Doctor Info */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-700 text-white">{initials}</span>
          </div>

          {/* Doctor Details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-700 text-white truncate">{doctor}</p>
            <p className="text-xs text-[#AAB3C5] mt-0.5">Терапевт</p>

            {/* Date/Time */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#00C853]" strokeWidth={2} />
                <span className="text-xs font-600 text-white">{appointmentDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#00C853]" strokeWidth={2} />
                <span className="text-xs font-600 text-white">{appointmentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2A3145]" />

        {/* Time Until & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#4A5268] font-500">Через</p>
            <p className="text-sm font-700 text-white mt-0.5">{timeUntil}</p>
          </div>

          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-[#00C853] hover:bg-[#00B85A] text-white font-600 text-sm transition-all active:scale-95 shadow-lg shadow-[#00C853]/20"
          >
            <Video size={16} strokeWidth={2} />
            <span>Войти</span>
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
