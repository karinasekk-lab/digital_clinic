import { useEffect } from 'react'

export default function AnalysisProcessingScreenPremium({ nav }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      nav.push('analysis-result')
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#090D14] flex flex-col items-center justify-center px-4">
      <div className="relative w-40 h-40 mb-8">
        {/* Animated gradient circle */}
        <svg className="w-full h-full animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C853" />
              <stop offset="100%" stopColor="#00B85A" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-700 text-white mb-1 animate-pulse">65%</div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-700 text-white text-center mb-2">EmAI изучает ваши результаты</h2>

      {/* Pulsing dots */}
      <div className="flex gap-2 justify-center mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>

      <p className="text-xs text-[#4A5268] text-center italic">Не является медицинским диагнозом</p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
