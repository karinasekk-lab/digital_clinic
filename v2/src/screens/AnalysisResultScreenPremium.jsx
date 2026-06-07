import { useState } from 'react'
import { Header, Card, Button } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { CheckCircle, TrendingUp, TrendingDown, Save, Share2 } from 'lucide-react'
import { ANALYSES } from '../data/mockData'

export default function AnalysisResultScreenPremium({ nav }) {
  const analysis = ANALYSES[0]
  const [expandedIndicators, setExpandedIndicators] = useState({})
  const { addToast } = useToast()

  const toggleIndicator = (name) => {
    setExpandedIndicators((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const getStatusColor = (status) => {
    if (status === 'normal') return '#00C853'
    if (status === 'high') return '#FFA500'
    if (status === 'low') return '#3B82F6'
    return '#AAB3C5'
  }

  const getStatusIcon = (status) => {
    if (status === 'high') return <TrendingUp size={14} />
    if (status === 'low') return <TrendingDown size={14} />
    return <CheckCircle size={14} />
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Результаты анализа" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        {/* Date */}
        <p className="text-xs text-[#AAB3C5] px-1">
          {analysis.type} · {analysis.date}
        </p>

        {/* Summary */}
        <Card variant="elevated" className="animate-fadeIn">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-700 text-white">Общий результат</h3>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30">
              <CheckCircle size={12} className="text-[#00C853]" fill="#00C853" />
              <span className="text-xs font-700 text-[#00C853]">Хорошо</span>
            </div>
          </div>
          <p className="text-base font-700 text-white mb-2">{analysis.summary}</p>
          <p className="text-xs text-[#AAB3C5]">
            {analysis.alertCount} показателя требуют внимания
          </p>
        </Card>

        {/* Indicators */}
        <div className="space-y-2">
          {analysis.indicators.map((indicator) => {
            const isExpanded = expandedIndicators[indicator.name]
            const percentage = ((indicator.value - indicator.min) / (indicator.max - indicator.min)) * 100
            const color = getStatusColor(indicator.status)

            return (
              <Card
                key={indicator.name}
                className="animate-fadeIn cursor-pointer hover:border-[#00C853]/30 transition-all"
                onClick={() => toggleIndicator(indicator.name)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-600 text-sm text-white">{indicator.name}</h4>
                    <p className="text-xs text-[#AAB3C5] mt-0.5">
                      {indicator.value} {indicator.unit} · норма: {indicator.min}—{indicator.max}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {getStatusIcon(indicator.status)}
                    <span className="text-xs font-700">
                      {indicator.status === 'normal' ? '✓' : indicator.status === 'high' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#171C2B] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all rounded-full"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: color
                    }}
                  ></div>
                </div>

                {/* Expansion */}
                {isExpanded && indicator.explanation && (
                  <div className="mt-3 pt-3 border-t border-[#2A3145]">
                    <p className="text-xs text-[#AAB3C5] leading-5">{indicator.explanation}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Recommendation */}
        <Card variant="elevated" className="animate-fadeIn border-l-4 border-[#00C853]">
          <h3 className="text-sm font-700 text-white mb-2">Рекомендация EmAI</h3>
          <p className="text-sm text-[#AAB3C5] leading-6 mb-4">{analysis.recommendation}</p>

          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => {
                addToast('Переход к выбору врача', 'info', 1500)
                nav.push('doctor-list')
              }}
              size="sm"
              className="w-full"
            >
              Начать консультацию с терапевтом
            </Button>
            <Button
              onClick={() => addToast('Откройте календарь для выбора времени', 'info', 2000)}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Выбрать удобное время →
            </Button>
            <Button
              onClick={() => {
                addToast('Переход в чат поддержки', 'info', 1500)
                nav.push('ai-chat')
              }}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Задать вопрос в чате
            </Button>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={() => addToast('PDF сохранён', 'success', 2000)}
            variant="secondary"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Сохранить в PDF
          </Button>
          <Button
            onClick={() => addToast('Отправлено врачу', 'success', 2000)}
            variant="secondary"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            <Share2 size={16} />
            Поделиться с врачом
          </Button>
        </div>
      </div>
    </div>
  )
}
