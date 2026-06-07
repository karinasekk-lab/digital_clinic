import { useState, useEffect } from 'react'
import { Mic, MicOff, Video, VideoOff, MessageCircle, Phone, FileText, MoreVertical } from 'lucide-react'
import { DOCTORS } from '../data/mockData'

export default function VideoCallScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(4)
  const [isRecording] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)

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

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="fixed inset-0 bg-[#090D14] z-50 flex flex-col">
      {/* Video placeholder with gradient */}
      <div className="flex-1 bg-gradient-to-br from-[#171C2B] via-[#090D14] to-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00C853] rounded-full"
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
          <div className="w-28 h-28 rounded-[20px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl font-700 text-white">{initials}</span>
          </div>
          <h2 className="text-xl font-700 text-white">{doctor.name}</h2>
          <p className="text-sm text-[#AAB3C5] mt-1">{doctor.specialty}</p>
        </div>

        {/* Self view corner */}
        <div className="absolute bottom-4 right-4 w-24 h-32 bg-gradient-to-br from-[#171C2B] to-[#090D14] rounded-[14px] border border-[#2A3145] overflow-hidden flex items-center justify-center shadow-lg">
          <div className="text-4xl">👤</div>
        </div>

        {/* Top strip */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent px-4 py-3 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-600 text-white">{doctor.name}</span>
            <span className="text-[#AAB3C5]"> · {doctor.specialty}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-700 text-[#00C853]">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            {isRecording && (
              <div className="flex items-center gap-1 px-2 py-1 bg-[#E74C3C]/20 rounded-full">
                <span className="w-2 h-2 bg-[#E74C3C] rounded-full animate-pulse"></span>
                <span className="text-[10px] text-[#E74C3C] font-700">Запись</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[#090D14]/80 backdrop-blur-md border-t border-[#2A3145] px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          {/* Mic Toggle */}
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMicOn
                ? 'bg-[#171C2B] border border-[#2A3145] text-[#AAB3C5] hover:bg-[#1E2433]'
                : 'bg-[#E74C3C]/20 border border-[#E74C3C]/30 text-[#E74C3C] hover:bg-[#E74C3C]/30'
            }`}
          >
            {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isCameraOn
                ? 'bg-[#171C2B] border border-[#2A3145] text-[#AAB3C5] hover:bg-[#1E2433]'
                : 'bg-[#E74C3C]/20 border border-[#E74C3C]/30 text-[#E74C3C] hover:bg-[#E74C3C]/30'
            }`}
          >
            {isCameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-[#E74C3C] flex items-center justify-center text-2xl hover:bg-[#d43d3c] transition-all active:scale-95 shadow-[0_4px_20px_rgba(231,76,60,0.4)]"
          >
            <Phone size={24} className="text-white" fill="white" />
          </button>

          {/* Chat Toggle */}
          <button className="w-12 h-12 rounded-full bg-[#171C2B] border border-[#2A3145] flex items-center justify-center text-[#AAB3C5] hover:bg-[#1E2433] transition-all">
            <MessageCircle size={18} />
          </button>

          {/* More Options */}
          <button className="w-12 h-12 rounded-full bg-[#171C2B] border border-[#2A3145] flex items-center justify-center text-[#AAB3C5] hover:bg-[#1E2433] transition-all">
            <MoreVertical size={18} />
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
