import { useEffect } from 'react'
import { MapPin, Lightbulb, Battery } from 'lucide-react'
import { DOCTORS } from '../data/mockData'

export default function ConnectingScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      nav.push('video-call', { doctorId: doctor.id })
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="min-h-screen bg-[#090D14] flex flex-col items-center justify-center px-4">
      {/* Animated Circles */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 border-4 border-[#00C853]/30 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 border-4 border-[#00C853]/50 rounded-full animate-pulse"></div>
        <div className="absolute inset-8 flex items-center justify-center">
          <div className="w-32 h-32 rounded-[20px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center">
            <span className="text-5xl font-700 text-white">{initials}</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-700 text-white text-center mb-2">Соединяем с врачом</h2>
      <p className="text-sm text-[#AAB3C5] text-center mb-8">
        {doctor.name} · {doctor.specialty}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-1 bg-[#2A3145] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-[#00C853] to-[#00B85A] rounded-full animate-loading"></div>
      </div>

      <p className="text-xs text-[#AAB3C5] text-center">Обычно менее 2 минут</p>

      {/* Tips */}
      <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
        <div className="flex items-center justify-center gap-3 text-sm text-[#AAB3C5]">
          <MapPin size={18} className="text-[#00C853] flex-shrink-0" />
          <span>Тихое место</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-sm text-[#AAB3C5]">
          <Lightbulb size={18} className="text-[#00C853] flex-shrink-0" />
          <span>Хорошее освещение</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-sm text-[#AAB3C5]">
          <Battery size={18} className="text-[#00C853] flex-shrink-0" />
          <span>Зарядка на устройстве</span>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => nav.pop()}
        className="mt-12 text-xs text-[#AAB3C5] hover:text-white transition-colors"
      >
        Отмена
      </button>

      <p className="mt-4 text-xs text-[#4A5268] text-center">
        Списание произойдёт после начала консультации
      </p>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading {
          animation: loading 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
