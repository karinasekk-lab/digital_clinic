import { Header, Card, Button } from '../components/UI'

export default function SecondOpinionScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24 relative">
      <Header title="🔍 Второе мнение врача" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Info */}
        <Card className="animate-fadeIn">
          <p className="text-sm text-[#94A3B8] leading-5">
            Получите мнение опытного специалиста по вашим анализам, снимкам или диагнозу
          </p>
        </Card>

        {/* How It Works */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Как работает</h3>
          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B956] flex items-center justify-center text-white text-xs font-700">
                ①
              </div>
              <p className="text-xs text-[#94A3B8]">Загрузите документы (анализы, снимки, заключение)</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B956] flex items-center justify-center text-white text-xs font-700">
                ②
              </div>
              <p className="text-xs text-[#94A3B8]">Выберите специалиста-эксперта</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00B956] flex items-center justify-center text-white text-xs font-700">
                ③
              </div>
              <p className="text-xs text-[#94A3B8]">Получите письменное заключение за 24 часа</p>
            </div>
          </div>
        </Card>

        {/* Upload Zone */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="border-2 border-dashed border-[#185FA5] rounded-lg p-6 text-center">
            <p className="text-3xl mb-2">📁</p>
            <p className="text-sm font-600 text-[#F9FAFB] mb-1">Загрузить документы</p>
            <p className="text-xs text-[#94A3B8] mb-3">PDF · JPG · DICOM</p>
            <Button variant="secondary" size="sm" className="w-full mb-2">
              Загрузить файл
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Сфотографировать
            </Button>
          </div>
        </Card>

        {/* Specialists */}
        <Card className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Специалисты</h3>
          <div className="flex gap-2 flex-wrap">
            {['Кардиолог', 'Онколог', 'Невролог'].map((specialist) => (
              <span
                key={specialist}
                className="text-xs px-3 py-1 rounded-full bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]"
              >
                {specialist}
              </span>
            ))}
          </div>
        </Card>

        {/* Pricing */}
        <Card className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Стоимость</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Письменное заключение</span>
              <span className="font-700 text-[#F9FAFB]">15 000 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Консультация + заключение</span>
              <span className="font-700 text-[#F9FAFB]">18 000 ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Срочно (4 часа)</span>
              <span className="font-700 text-[#F9FAFB]">25 000 ₸</span>
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
