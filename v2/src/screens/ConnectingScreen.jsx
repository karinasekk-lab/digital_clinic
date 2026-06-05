import { useEffect } from 'react'
import { DOCTORS } from '../data/mockData'

export default function ConnectingScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      nav.push('video-call', { doctorId: doctor.id })
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center px-4">
      {/* Animated Circles */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 border-4 border-[#0F6E56] rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 border-4 border-[#00B956] rounded-full animate-pulse"></div>
        <div className="absolute inset-8 flex items-center justify-center">
          <div className="text-6xl">{doctor.photo}</div>
        </div>
      </div>

      <h2 className="text-[20px] font-700 text-[#F9FAFB] text-center mb-2">Соединяем с врачом</h2>
      <p className="text-sm text-[#94A3B8] text-center mb-8">
        {doctor.name} · {doctor.specialty}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-1 bg-[#1E2235] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-[#0F6E56] to-[#00B956] rounded-full animate-loading"></div>
      </div>

      <p className="text-xs text-[#94A3B8] text-center">Обычно менее 2 минут</p>

      {/* Tips */}
      <div className="mt-12 flex flex-col gap-3 w-full">
        <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
          <span className="text-lg">📍</span>
          <span>Тихое место</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
          <span className="text-lg">💡</span>
          <span>Хорошее освещение</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
          <span className="text-lg">🔋</span>
          <span>Зарядка на устройстве</span>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => nav.pop()}
        className="mt-12 text-xs text-[#94A3B8] hover:text-[#F9FAFB] transition-colors"
      >
        Отмена
      </button>

      <p className="mt-4 text-xs text-[#4B5563] text-center">
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
