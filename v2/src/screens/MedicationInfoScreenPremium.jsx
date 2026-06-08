import { useState } from 'react'
import { Header, Card, Button, IconContainer } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { Search, Camera, ChevronDown, AlertTriangle, Pill } from 'lucide-react'
import { MEDICATIONS } from '../data/mockData'

export default function MedicationInfoScreenPremium({ nav }) {
  const [search, setSearch] = useState('')
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const { addToast } = useToast()

  const drug = selectedDrug || MEDICATIONS[0]

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Что за лекарство?" subtitle="AI расшифрует состав и действие" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        {!selectedDrug ? (
          <>
            {/* Search */}
            <div className="relative animate-fadeIn">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5268]" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Введите название лекарства..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[16px] pl-10 pr-4 py-3 text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 transition-all"
              />
            </div>

            {/* Camera Button */}
            <Button
              onClick={() => addToast('Откройте камеру для сканирования упаковки', 'info', 2000)}
              variant="secondary"
              size="md"
              className="w-full animate-fadeIn flex items-center justify-center gap-2"
              style={{ animationDelay: '50ms' }}
            >
              <Camera size={18} />
              Сфотографировать упаковку
            </Button>

            {/* Recent */}
            <div className="space-y-2 mt-6">
              <p className="text-xs font-700 uppercase text-[#4A5268] tracking-wider px-1">Недавний поиск</p>
              {MEDICATIONS.map((med, idx) => (
                <Card
                  key={idx}
                  className="cursor-pointer hover:border-[#00C853]/30 transition-all animate-fadeIn"
                  style={{ animationDelay: `${(idx + 1) * 50}ms` }}
                  onClick={() => setSelectedDrug(med)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-600 text-sm text-white">{med.name}</h4>
                      <p className="text-xs text-[#AAB3C5] mt-1">{med.type}</p>
                    </div>
                    <ChevronDown size={18} className="text-[#4A5268]" />
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Back */}
            <button
              onClick={() => setSelectedDrug(null)}
              className="text-[#00C853] font-600 text-sm hover:opacity-80 mb-2 transition-opacity flex items-center gap-1"
            >
              ← Назад
            </button>

            {/* Drug Header */}
            <Card variant="elevated" className="text-center animate-fadeIn">
              <div className="flex justify-center mx-auto mb-4">
                <IconContainer icon={Pill} color="green" size="lg" />
              </div>
              <h2 className="text-xl font-700 text-white">{drug.name}</h2>
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                <div className={`px-3 py-1.5 rounded-full text-xs font-600 ${
                  drug.category === 'prescription'
                    ? 'bg-[#FFA500]/10 border border-[#FFA500]/30 text-[#FFA500]'
                    : 'bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853]'
                }`}>
                  {drug.category === 'prescription' ? 'Рецептурный' : 'Без рецепта'}
                </div>
                <div className="px-3 py-1.5 rounded-full text-xs font-600 bg-[#171C2B] border border-[#2A3145] text-[#AAB3C5]">
                  {drug.type}
                </div>
              </div>
            </Card>

            {/* Accordion Sections */}
            {[
              { key: 'simple', title: 'Простыми словами', content: drug.description },
              { key: 'dosage', title: 'Как принимать', content: drug.dosage },
              { key: 'warnings', title: 'Важно знать', content: drug.warnings, isList: true }
            ].map((section) => (
              <Card
                key={section.key}
                className="cursor-pointer hover:border-[#00C853]/30 transition-all"
                onClick={() => toggleSection(section.key)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-700 text-white">{section.title}</h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#AAB3C5] transition-transform ${
                      expandedSections[section.key] ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {expandedSections[section.key] && (
                  <div className="mt-3 pt-3 border-t border-[#2A3145]">
                    {section.isList ? (
                      <div className="space-y-2">
                        {section.content.map((item, i) => (
                          <div key={i} className="flex gap-2 text-xs text-[#AAB3C5]">
                            <AlertTriangle size={14} className="text-[#FFA500] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : Array.isArray(section.content) ? (
                      <div className="space-y-2">
                        {section.content.map((item, i) => (
                          <div key={i} className="text-xs text-[#AAB3C5]">• {item}</div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#AAB3C5] leading-5">{section.content}</p>
                    )}
                  </div>
                )}
              </Card>
            ))}

            {/* Alternatives */}
            <Card>
              <h3 className="text-sm font-700 text-white mb-3">Аналоги дешевле</h3>
              <div className="space-y-2">
                {drug.alternatives.map((alt, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-[#171C2B] border border-[#2A3145] rounded-[12px]">
                    <span className="text-sm text-white">{alt.name}</span>
                    <span className="text-sm font-600 text-[#AAB3C5]">~{alt.price.toLocaleString()} ₸</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Button
              onClick={() => {
                addToast('Переход в чат с врачом', 'info', 1500)
                nav.push('ai-chat')
              }}
              size="md"
              className="w-full"
            >
              Спросить врача об этом лекарстве
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
