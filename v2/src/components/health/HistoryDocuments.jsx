import { FolderOpen, ChevronRight } from 'lucide-react'

export function HistoryDocuments({ onViewHistory }) {
  return (
    <div className="px-4 py-1">
      <button
        onClick={onViewHistory}
        className="w-full bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 text-left transition-all hover:border-[#3B5469] group"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-[#3B82F6]15 flex items-center justify-center flex-shrink-0">
            <FolderOpen size={18} color="#3B82F6" strokeWidth={2} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-700 text-white leading-tight">
              История и документы
            </h3>
            <p className="text-xs text-[#AAB3C5] mt-1">
              Результаты анализов, заключения врачей и медицинские документы
            </p>
          </div>

          {/* Chevron */}
          <ChevronRight
            size={18}
            color="#6B7280"
            className="flex-shrink-0 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </button>
    </div>
  )
}
