import { MessageCircle, AlertCircle } from 'lucide-react'

export function SupportCard({ onChatClick, onEmergencyClick }) {
  return (
    <div className="px-4 py-1.5">
      <div className="bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[16px] p-4 space-y-3">
        {/* Header */}
        <div>
          <h3 className="text-sm font-700 text-white">Нужна помощь?</h3>
          <p className="text-xs text-[#AAB3C5] mt-1">Мы рядом 24/7</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          {/* Support Chat Button */}
          <button
            onClick={onChatClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0D111A] border border-[#2A3145] hover:border-[#3B82F6]/50 rounded-[12px] py-2.5 text-xs font-700 text-white transition-all active:scale-95"
          >
            <MessageCircle size={14} color="#3B82F6" />
            Чат с поддержкой
          </button>

          {/* Emergency Button */}
          <button
            onClick={onEmergencyClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#EF4444]/15 border border-[#EF4444]/30 hover:border-[#EF4444]/50 rounded-[12px] py-2.5 text-xs font-700 text-[#EF4444] transition-all active:scale-95"
          >
            <AlertCircle size={14} />
            Экстренная помощь
          </button>
        </div>
      </div>
    </div>
  )
}
