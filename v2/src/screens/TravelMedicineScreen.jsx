import { Header, Card, Button } from '../components/UI'

export default function TravelMedicineScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24 relative">
      <Header title="✈️ Медпомощь за рубежом" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Orange Sub */}
        <p className="text-xs text-[#F97316] font-600">Врач онлайн из любой страны</p>

        {/* Hero */}
        <Card className="animate-fadeIn" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.05))' }}>
          <p className="font-700 text-[#F9FAFB] mb-2">Заболели за границей?</p>
          <p className="text-xs text-[#94A3B8] mb-3">Наш врач онлайн из любой точки мира</p>
          <p className="text-xs text-[#00B956] font-600">Русский язык · Казахский язык</p>
        </Card>

        {/* What We Do */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Что мы делаем</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span>🌍</span>
              <span className="text-xs text-[#94A3B8]">Консультация онлайн из любой страны</span>
            </div>
            <div className="flex gap-2">
              <span>📋</span>
              <span className="text-xs text-[#94A3B8]">Рекомендации на местном языке (перевод)</span>
            </div>
            <div className="flex gap-2">
              <span>🏥</span>
              <span className="text-xs text-[#94A3B8]">Помощь с выбором местной клиники</span>
            </div>
            <div className="flex gap-2">
              <span>📄</span>
              <span className="text-xs text-[#94A3B8]">Документы для страховой компании</span>
            </div>
            <div className="flex gap-2">
              <span>🚑</span>
              <span className="text-xs text-[#94A3B8]">Координация экстренной помощи</span>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Тарифы</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[#94A3B8]">Консультация</span>
              <span className="font-700 text-[#F9FAFB]">4 900 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#94A3B8]">Консультация + документы</span>
              <span className="font-700 text-[#F9FAFB]">7 900 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#94A3B8]">Годовая страховка путешественника</span>
              <span className="font-700 text-[#F9FAFB]">29 900 ₸</span>
            </div>
          </div>
        </Card>

        {/* How to Call */}
        <Card className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Как вызвать</h3>
          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-700">
                ①
              </div>
              <p className="text-xs text-[#94A3B8]">Откройте приложение (работает везде)</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-700">
                ②
              </div>
              <p className="text-xs text-[#94A3B8]">Нажмите "Связаться с врачом"</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center text-white text-xs font-700">
                ③
              </div>
              <p className="text-xs text-[#94A3B8]">Врач ответит за 5 минут</p>
            </div>
          </div>
        </Card>
      </div>

      {/* COMING SOON Overlay */}
      <div className="fixed inset-0 bg-[rgba(13,17,23,0.9)] backdrop-blur-sm flex items-center justify-center z-50 rounded-[40px] pointer-events-none">
        <div className="text-center">
          <p className="text-4xl mb-4">🔜</p>
          <p className="text-white font-700 text-lg mb-2">Скоро</p>
          <p className="text-[#94A3B8] text-sm">Уведомим о запуске</p>
        </div>
      </div>
    </div>
  )
}
