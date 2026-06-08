import { MessageCircle, Video } from 'lucide-react'

export function MedicalSupport({ onViewDoctors }) {
  const doctorInitials = 'АС'
  const doctorName = 'Айгуль Сейткали'
  const doctorSpecialty = 'Терапевт'
  const avatarColor = '#4ECDC4' // Teal color

  return (
    <div className="px-4 py-1 space-y-1">
      {/* Section Header */}
      <h3 className="text-sm font-700 text-white">Ваш лечащий врач</h3>

      {/* Doctor Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[14px] p-3 space-y-2">
        {/* Top Row: Avatar + Name/Info + Buttons */}
        <div className="flex items-start gap-3">
          {/* Avatar with Initials */}
          <div
            className="w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0 text-white font-700 text-sm"
            style={{ backgroundColor: `${avatarColor}30`, borderLeft: `3px solid ${avatarColor}` }}
          >
            {doctorInitials}
          </div>

          {/* Doctor Info + Middle Button */}
          <div className="flex-1 min-w-0">
            <h4 className="font-700 text-white text-sm leading-tight">{doctorName}</h4>
            <p className="text-xs text-[#AAB3C5] mt-0.5">{doctorSpecialty}</p>

            {/* Message Button */}
            <button className="mt-1.5 flex items-center gap-1.5 bg-[#0D111A] border border-[#2A3145] hover:border-[#3B82F6]/50 px-2.5 py-1.5 rounded-[8px] text-white transition-all active:scale-95">
              <MessageCircle size={13} color="#3B82F6" strokeWidth={2} />
              <span className="text-xs font-600">Написать</span>
            </button>
          </div>

          {/* Video Button */}
          <button className="flex-shrink-0 flex items-center gap-1.5 bg-[#00C853] hover:bg-[#00B85A] px-3 py-1.5 rounded-[8px] text-white transition-all active:scale-95">
            <Video size={13} color="#ffffff" strokeWidth={2} />
            <span className="text-xs font-600">Видео</span>
          </button>
        </div>

        {/* Online Status */}
        <div className="flex items-center gap-1.5 ml-15">
          <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full flex-shrink-0"></span>
          <p className="text-xs text-[#00C853] font-500">Онлайн сейчас</p>
        </div>
      </div>
    </div>
  )
}
