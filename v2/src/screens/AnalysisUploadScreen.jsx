import { Header, Card, Button, Pill } from '../components/UI'

export default function AnalysisUploadScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Понять мои анализы" subtitle="AI объяснит простым языком" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        <Card className="animate-fadeIn text-center">
          <p className="text-sm text-[#94A3B8] leading-6">
            Загрузите результаты анализов — AI разберёт показатели и подскажет что делать
          </p>
        </Card>

        {/* Upload Zone */}
        <Card
          className="border-2 border-dashed border-[#0F6E56] p-8 text-center animate-fadeIn cursor-pointer hover:border-[#00B956] transition-colors"
          style={{ animationDelay: '50ms' }}
        >
          <div className="text-4xl mb-3 text-[#0F6E56]">☁</div>
          <p className="text-sm font-700 text-[#00B956] mb-2">Загрузить файл</p>
          <p className="text-xs text-[#94A3B8] mb-4">PDF · JPG · PNG · до 10 МБ</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                nav.push('analysis-processing')
              }
            }}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer">
            или перетащите файл
          </label>
        </Card>

        {/* Camera Button */}
        <Button
          onClick={() => nav.push('analysis-processing')}
          variant="secondary"
          size="md"
          className="w-full"
        >
          📷 Сфотографировать
        </Button>

        {/* Previous */}
        <div className="space-y-2 mt-6">
          <p className="text-xs font-700 uppercase text-[#94A3B8]">Предыдущие анализы</p>
          <Card className="text-center py-8 text-[#94A3B8]">
            <p className="text-sm">Здесь будут сохранённые анализы</p>
          </Card>
        </div>

        {/* Privacy */}
        <Card className="text-center">
          <p className="text-xs text-[#4B5563]">
            🔒 Ваши данные конфиденциальны и защищены шифрованием
          </p>
        </Card>
      </div>
    </div>
  )
}
