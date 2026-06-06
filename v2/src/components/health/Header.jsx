import { Bell, ChevronLeft } from 'lucide-react'

export function Header({ onBack, notificationCount = 0 }) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-b from-[#0D111A] via-[#0D111A] to-transparent border-b border-[#2A3145] px-4 py-4 flex items-center justify-between min-h-[60px]">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#171C2B] transition-colors active:scale-95"
      >
        <ChevronLeft size={24} className="text-[#AAB3C5]" strokeWidth={1.5} />
      </button>

      <h1 className="text-xl font-700 text-white tracking-tight">Мое здоровье</h1>

      <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#171C2B] transition-colors active:scale-95">
        <Bell size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />
        {notificationCount > 0 && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#E84C3D] rounded-full flex items-center justify-center">
            <span className="text-xs font-700 text-white">{notificationCount}</span>
          </div>
        )}
      </button>
    </div>
  )
}
