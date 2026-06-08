import { ChevronRight, MessageCircle, Video } from 'lucide-react'

export function MedicalSupport({ onViewDoctors }) {
  const doctorPhoto = 'https://images.unsplash.com/photo-1594824476967-48c676781046?w=200&h=200&fit=crop'

  return (
    <div className="px-4 py-1 space-y-1">
      {/* Section Header */}
      <h3 className="text-sm font-700 text-white">Ваш лечащий врач</h3>

      {/* Doctor Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[14px] p-3 flex items-center gap-3">
        {/* Doctor Photo */}
        <img
          src={doctorPhoto}
          alt="Doctor"
          className="w-14 h-14 rounded-[10px] object-cover flex-shrink-0"
        />

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-700 text-white text-sm leading-tight">Айгуль Сейткали</h4>
          <p className="text-xs text-[#AAB3C5] mt-0.5">Терапевт</p>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full flex-shrink-0"></span>
            <p className="text-[10px] text-[#00C853] font-500">Онлайн сейчас</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 bg-[#0D111A] border border-[#2A3145] hover:border-[#3B82F6]/50 px-2.5 py-1.5 rounded-[8px] text-white transition-all active:scale-95">
            <MessageCircle size={14} color="#3B82F6" strokeWidth={2} />
            <span className="text-xs font-600">Написать</span>
          </button>
          <button className="flex items-center gap-1.5 bg-[#00C853] hover:bg-[#00B85A] px-3 py-1.5 rounded-[8px] text-white transition-all active:scale-95">
            <Video size={14} color="#ffffff" strokeWidth={2} />
            <span className="text-xs font-600">Видео</span>
          </button>
        </div>
      </div>
    </div>
  )
}
