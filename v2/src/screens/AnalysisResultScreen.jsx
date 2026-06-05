import { useState } from 'react'
import { Header, Card, Button, Pill } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { ANALYSES } from '../data/mockData'

export default function AnalysisResultScreen({ nav }) {
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
    if (status === 'normal') return '#00B956'
    if (status === 'high') return '#EF9F27'
    if (status === 'low') return '#185FA5'
    return '#94A3B8'
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Результаты анализа" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Date */}
        <p className="text-xs text-[#94A3B8]">
          {analysis.type} · {analysis.date}
        </p>

        {/* Summary */}
        <Card className="animate-fadeIn">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-700 text-[#F9FAFB]">Общий результат</h3>
            <Pill variant="green">✓</Pill>
          </div>
          <p className="text-[15px] font-600 text-[#F9FAFB] mb-2">{analysis.summary}</p>
          <p className="text-xs text-[#94A3B8]">
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
                className="animate-fadeIn cursor-pointer hover:border-[rgba(0,185,86,0.3)] transition-colors"
                onClick={() => toggleIndicator(indicator.name)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-600 text-sm text-[#F9FAFB]">{indicator.name}</h4>
                    <p className="text-xs text-[#94A3B8]">
                      {indicator.value} {indicator.unit} · норма: {indicator.min}—{indicator.max}
                    </p>
                  </div>
                  <span
                    className="text-xs font-700 px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {indicator.status === 'normal' ? '✓' : indicator.status === 'high' ? '↑' : '↓'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#0D1117] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: color
                    }}
                  ></div>
                </div>

                {/* Expansion */}
                {isExpanded && indicator.explanation && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                    <p className="text-xs text-[#94A3B8] leading-5">{indicator.explanation}</p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Recommendation */}
        <Card variant="green" className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-2">Рекомендация EmAI</h3>
          <p className="text-sm text-[#94A3B8] leading-6 mb-4">{analysis.recommendation}</p>

          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={() => {
                addToast('Переход к выбору врача', 'info', 1500)
                nav.push('doctor-list')
              }}
              variant="primary"
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
            className="w-full"
          >
            💾 Сохранить в PDF
          </Button>
          <Button
            onClick={() => addToast('Отправлено врачу', 'success', 2000)}
            variant="secondary"
            size="sm"
            className="w-full"
          >
            📤 Поделиться с врачом
          </Button>
        </div>
      </div>
    </div>
  )
}
