import { useState, useEffect } from 'react'
import { DOCTORS } from '../data/mockData'

export default function VideoCallScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(4)
  const [isRecording] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s === 59) {
          setMinutes((m) => m + 1)
          return 0
        }
        return s + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleEndCall = () => {
    nav.push('post-consultation', { doctorId: doctor.id, duration: `${minutes}:${seconds.toString().padStart(2, '0')}` })
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video placeholder with gradient */}
      <div className="flex-1 bg-gradient-to-br from-[#1E2235] via-[#0D1117] to-[#0A0E1A] flex items-center justify-center relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00B956] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Doctor illustration */}
        <div className="text-center z-10">
          <div className="text-9xl mb-4 animate-pulse">{doctor.photo}</div>
          <h2 className="text-xl font-700 text-[#F9FAFB]">{doctor.name}</h2>
          <p className="text-sm text-[#94A3B8]">{doctor.specialty}</p>
        </div>

        {/* Self view corner */}
        <div className="absolute bottom-4 right-4 w-24 h-32 bg-gradient-to-br from-[#243050] to-[#0D1117] rounded-[14px] border border-[rgba(255,255,255,0.1)] overflow-hidden flex items-center justify-center">
          <div className="text-4xl">👤</div>
        </div>

        {/* Top strip */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-[#F9FAFB]">
            <span className="font-600">{doctor.name}</span>
            <span className="text-[#94A3B8]"> · {doctor.specialty}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-700 text-[#00B956]">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            {isRecording && (
              <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(226,75,74,0.2)] rounded-full">
                <span className="w-2 h-2 bg-[#E24B4A] rounded-full animate-pulse"></span>
                <span className="text-[10px] text-[#E24B4A] font-700">Запись</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[rgba(0,0,0,0.8)] backdrop-blur-md border-t border-[rgba(255,255,255,0.1)] px-4 py-4">
        <div className="flex items-center justify-center gap-6">
          <button className="w-12 h-12 rounded-full bg-[#1E2235] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-lg hover:bg-[#243050] transition-colors">
            🎤
          </button>
          <button className="w-12 h-12 rounded-full bg-[#1E2235] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-lg hover:bg-[#243050] transition-colors">
            📷
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-[#E24B4A] flex items-center justify-center text-2xl hover:bg-[#d43d3c] transition-all active:scale-95 shadow-[0_4px_20px_rgba(226,75,74,0.4)]"
          >
            📞
          </button>

          <button className="w-12 h-12 rounded-full bg-[#1E2235] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-lg hover:bg-[#243050] transition-colors">
            💬
          </button>
          <button className="w-12 h-12 rounded-full bg-[#1E2235] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-lg hover:bg-[#243050] transition-colors">
            📋
          </button>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
