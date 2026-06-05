import { useState } from 'react'
import { SERVICES, getStats } from './data/services'
import './index.css'

function StatusBar() {
  return (
    <div className="h-6 flex items-center justify-between px-4 text-[11px] font-medium" style={{ background: '#0A0E1A', color: '#8A95B0', borderBottom: '1px solid #1E2235' }}>
      <span>🇰🇿 Almaty</span>
      <span>13:45</span>
      <span>●●●●●</span>
    </div>
  )
}

function Header({ stats }) {
  return (
    <div className="sticky top-0 z-40 bg-gradient-to-b from-slate-900 to-transparent backdrop-blur-md border-b border-slate-800">
      <StatusBar />
      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">Все услуги</h1>
            <p className="text-xs mt-1" style={{ color: '#8A95B0' }}>
              {stats.total} сервисов · {stats.active} доступно · {stats.soon} скоро
            </p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l4 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ item, status }) {
  const isActive = status === 'active'

  return (
    <button
      disabled={!isActive}
      className="w-full text-left rounded-xl p-3 transition-all active:scale-95 disabled:active:scale-100"
      style={{
        background: isActive ? 'rgba(15,110,86,0.08)' : 'rgba(100,116,139,0.05)',
        border: isActive ? '1px solid rgba(0,185,86,0.2)' : '1px solid rgba(100,116,139,0.15)',
        opacity: isActive ? 1 : 0.6,
        cursor: isActive ? 'pointer' : 'default'
      }}>
      <div className="flex items-start gap-3 relative">
        <div className="text-2xl pt-1">{item.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-white">{item.title}</div>
          <div className="text-xs mt-0.5" style={{ color: '#8A95B0' }}>{item.subtitle}</div>
        </div>
        {item.badge && (
          <div className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: '#EF4444', color: 'white' }}>
            {item.badge}
          </div>
        )}
        {!item.badge && !isActive && (
          <div className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(100,116,139,0.2)', color: '#8A95B0' }}>
            СКОРО
          </div>
        )}
      </div>
    </button>
  )
}

function ServiceSection({ section }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 px-4">
        <div className={`h-6 w-1 rounded-full ${section.colorClass}`} />
        <h2 className="text-sm font-bold text-white uppercase tracking-wide">{section.title}</h2>
      </div>
      <div className="px-4 grid grid-cols-2 gap-2">
        {section.items.map((item) => (
          <ServiceCard key={item.id} item={item} status={item.status} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const stats = getStats()

  return (
    <div className="min-h-screen" style={{ background: '#0A0E1A', color: '#E5E7EB' }}>
      <Header stats={stats} />

      <div className="pb-20">
        {Object.entries(SERVICES).map(([key, section]) => (
          <ServiceSection key={key} section={section} />
        ))}

        {/* Bottom info */}
        <div className="px-4 py-8 text-center text-xs border-t" style={{ borderColor: '#1E2235', color: '#8A95B0' }}>
          <p>Версия 2 · Полный каталог</p>
          <p>EmAI × Freedom · 2026</p>
        </div>
      </div>

      {/* Back button to v1 */}
      <div className="fixed bottom-4 right-4">
        <button
          className="px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-90"
          style={{ background: 'rgba(0,185,86,0.15)', border: '1px solid rgba(0,185,86,0.3)', color: '#00B956' }}>
          ← v1
        </button>
      </div>
    </div>
  )
}
