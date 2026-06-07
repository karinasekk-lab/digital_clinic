import { ChevronRight, Heart, Clock } from 'lucide-react'

export function MedicalSupport({ onViewDoctors }) {
  return (
    <div className="px-4 py-2 space-y-2">
      {/* Section Header */}
      <h3 className="text-sm font-700 text-white">Медицинская поддержка</h3>

      {/* Outer Container Card */}
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-3 space-y-2">
        {/* Doctor Inner Card */}
        <div className="bg-[#0D111A]/50 border border-[#2A3145]/50 rounded-[12px] p-2.5 flex items-center gap-2.5">
          {/* Avatar - Premium icon instead of emoji */}
          <div
            className="w-10 h-10 rounded-[10px] bg-[#00C853]/15 flex items-center justify-center flex-shrink-0 border border-[#00C853]/20"
          >
            <Heart size={18} color="#00C853" strokeWidth={2} fill="#00C853" />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-700 text-white text-xs">Айгуль Сейткали</h4>
            <p className="text-[10px] text-[#AAB3C5] mt-0.5">Терапевт</p>
          </div>

          {/* CTA Button */}
          <button className="flex-shrink-0 bg-[#00C853] hover:bg-[#00B85A] text-white px-2 py-1.5 rounded-[8px] text-[10px] font-700 transition-all whitespace-nowrap">
            Консультация
          </button>
        </div>

        {/* Doctor Status */}
        <div className="flex items-center gap-2 text-[10px] text-[#AAB3C5] px-0.5">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 bg-[#00C853] rounded-full flex-shrink-0"></span>
            Онлайн
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            2 дня
          </span>
        </div>

        {/* View All Doctors Link */}
        <button
          onClick={onViewDoctors}
          className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-[#AAB3C5] hover:text-white transition-colors border-t border-[#2A3145]/50 pt-2"
        >
          Все врачи
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  )
}
