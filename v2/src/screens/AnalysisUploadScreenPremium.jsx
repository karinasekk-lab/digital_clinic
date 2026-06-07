import { Header, Card, Button } from '../components/UI'
import { Cloud, Camera, Lock } from 'lucide-react'

export default function AnalysisUploadScreenPremium({ nav }) {
  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Понять мои анализы" subtitle="AI объяснит простым языком" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        <Card className="animate-fadeIn">
          <p className="text-sm text-[#AAB3C5] leading-6 text-center">
            Загрузите результаты анализов — AI разберёт показатели и подскажет что делать
          </p>
        </Card>

        {/* Upload Zone */}
        <Card
          className="border-2 border-dashed border-[#00C853]/30 p-8 text-center animate-fadeIn cursor-pointer hover:border-[#00C853]/50 hover:bg-[#00C853]/5 transition-all"
          style={{ animationDelay: '50ms' }}
        >
          <div className="flex justify-center mb-3">
            <Cloud size={40} className="text-[#00C853]" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-700 text-[#00C853] mb-2">Загрузить файл</p>
          <p className="text-xs text-[#AAB3C5] mb-4">PDF · JPG · PNG · до 10 МБ</p>
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
          <label htmlFor="file-input" className="cursor-pointer text-xs text-[#AAB3C5] hover:text-white transition-colors">
            или перетащите файл
          </label>
        </Card>

        {/* Camera Button */}
        <Button
          onClick={() => nav.push('analysis-processing')}
          variant="secondary"
          size="md"
          className="w-full flex items-center justify-center gap-2"
        >
          <Camera size={18} />
          Сфотографировать
        </Button>

        {/* Previous */}
        <div className="space-y-2 mt-6">
          <p className="text-xs font-700 uppercase text-[#4A5268] tracking-wider px-1">Предыдущие анализы</p>
          <Card className="text-center py-8 text-[#AAB3C5]">
            <p className="text-sm">Здесь будут сохранённые анализы</p>
          </Card>
        </div>

        {/* Privacy */}
        <Card className="text-center flex items-center justify-center gap-2">
          <Lock size={14} className="text-[#00C853]" />
          <p className="text-xs text-[#AAB3C5]">
            Ваши данные конфиденциальны и защищены шифрованием
          </p>
        </Card>
      </div>
    </div>
  )
}
