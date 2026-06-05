import { useState } from 'react'
import { Header, Card, Input, Button, Pill } from '../components/UI'
import { MEDICATIONS } from '../data/mockData'

export default function MedicationInfoScreen({ nav }) {
  const [search, setSearch] = useState('')
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const drug = selectedDrug || MEDICATIONS[0]

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Что за лекарство?" subtitle="AI расшифрует состав и действие" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {!selectedDrug ? (
          <>
            {/* Search */}
            <Input
              placeholder="Введите название лекарства..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon="🔍"
              className="animate-fadeIn"
            />

            {/* Camera Button */}
            <Button variant="secondary" size="md" className="w-full animate-fadeIn" style={{ animationDelay: '50ms' }}>
              📷 Сфотографировать упаковку
            </Button>

            {/* Recent */}
            <div className="space-y-2 mt-6">
              <p className="text-xs font-700 uppercase text-[#94A3B8]">Недавний поиск</p>
              {MEDICATIONS.map((med, idx) => (
                <Card
                  key={idx}
                  className="cursor-pointer hover:border-[rgba(0,185,86,0.3)] transition-colors"
                  onClick={() => setSelectedDrug(med)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-600 text-sm text-[#F9FAFB]">{med.name}</h4>
                      <p className="text-xs text-[#94A3B8] mt-1">{med.type}</p>
                    </div>
                    <span className="text-lg">→</span>
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
              className="text-[#00B956] font-600 text-sm hover:opacity-70 mb-2"
            >
              ← Назад
            </button>

            {/* Drug Header */}
            <Card className="text-center animate-fadeIn">
              <div className="text-6xl mb-3">💊</div>
              <h2 className="text-[20px] font-700 text-[#F9FAFB]">{drug.name}</h2>
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                <Pill variant={drug.category === 'prescription' ? 'amber' : 'green'}>
                  {drug.category === 'prescription' ? 'Рецептурный' : 'Без рецепта'}
                </Pill>
                <Pill variant="default">{drug.type}</Pill>
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
                className="cursor-pointer"
                onClick={() => toggleSection(section.key)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-700 text-[#F9FAFB]">{section.title}</h3>
                  <span className={`transition-transform ${expandedSections[section.key] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {expandedSections[section.key] && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                    {section.isList ? (
                      <div className="space-y-2">
                        {section.content.map((item, i) => (
                          <div key={i} className="flex gap-2 text-xs text-[#94A3B8]">
                            <span>⚠</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : Array.isArray(section.content) ? (
                      <div className="space-y-2">
                        {section.content.map((item, i) => (
                          <div key={i} className="text-xs text-[#94A3B8]">• {item}</div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#94A3B8] leading-5">{section.content}</p>
                    )}
                  </div>
                )}
              </Card>
            ))}

            {/* Alternatives */}
            <Card>
              <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Аналоги дешевле</h3>
              <div className="space-y-2">
                {drug.alternatives.map((alt, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-[#0D1117] rounded-[10px]">
                    <span className="text-sm text-[#F9FAFB]">{alt.name}</span>
                    <span className="text-sm font-600 text-[#94A3B8]">~{alt.price.toLocaleString()} ₸</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Button
              onClick={() => nav.push('ai-chat')}
              variant="primary"
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
