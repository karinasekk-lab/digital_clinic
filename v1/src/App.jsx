import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Shared Components ───────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div style={{ background: 'transparent' }} className="flex justify-between items-center px-5 pt-2 pb-1 text-xs text-white font-medium">
      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>09:41</span>
      <span style={{ letterSpacing: '0.02em' }}>▪▪▪ ⚡ 87%</span>
    </div>
  )
}

// Freedom SuperApp shell — always visible, lets user exit back to «Моё здоровье»
// FIX 6 — Support chat icon in header; version toggle for v1/v2
function FreedomShell({ onExit, onSupportClick, version, setVersion }) {
  return (
    <div className="sticky top-0 z-20 glass">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* EXIT to Freedom SuperApp */}
        <button
          onClick={onExit}
          className="flex items-center gap-1 transition-opacity active:opacity-60 flex-shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-xs font-medium whitespace-nowrap">Моё здоровье</span>
        </button>

        {/* App identity — centre */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <GreenCrossLogo size={15} />
          <span className="font-semibold text-white text-sm whitespace-nowrap tracking-tight">Цифровая клиника</span>
        </div>

        {/* Right actions: version toggle + support chat */}
        <div className="flex-shrink-0 flex gap-1.5">
          {/* Version toggle for v1/v2 */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
            <button onClick={() => setVersion('v1')}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all"
              style={{
                background: version === 'v1' ? 'rgba(0,185,86,0.2)' : 'transparent',
                color: version === 'v1' ? 'var(--green-500)' : 'var(--text-muted)'
              }}>
              v1
            </button>
            <div style={{ width: '1px', height: 12, background: 'var(--border)' }} />
            <button onClick={() => setVersion('v2')}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all"
              style={{
                background: version === 'v2' ? 'rgba(0,185,86,0.2)' : 'transparent',
                color: version === 'v2' ? 'var(--green-500)' : 'var(--text-muted)'
              }}>
              v2
            </button>
          </div>

          {/* Support chat */}
          <button onClick={onSupportClick} className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90"
            style={{ background: 'rgba(0,185,86,0.1)', border: '1px solid rgba(0,185,86,0.2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// FIX 1 — Compact profile bar below header
function CompactProfileBar() {
  return (
    <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
      <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #185FA5, #534AB7)', color: 'white' }}>
        АК
      </div>
      <div className="flex-1 min-w-0 text-xs text-white">
        <span className="font-semibold">Карина · 23 года</span>
        <span style={{ color: 'var(--text-secondary)' }}> · 3 обращения · </span>
        <span style={{ color: 'var(--green-500)' }}>ОСМС: Активен ✓</span>
      </div>
    </div>
  )
}

// VERSION 2 — Full services catalog (improved with proper icons and aligned buttons)
function ServicesCatalog({ navigate }) {
  // Icon components as SVG
  const IconVideo = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <path d="M23 7l-7 5 7 5V7z" fill="currentColor"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
  const IconRobot = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <rect x="3" y="2" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
      <path d="M9 15h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="6" y="20" width="2" height="2" fill="currentColor"/>
      <rect x="16" y="20" width="2" height="2" fill="currentColor"/>
    </svg>
  )
  const IconDocument = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
  const IconCheckCircle = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const catalog = {
    consultations: {
      title: 'ОНЛАЙН-КОНСУЛЬТАЦИИ',
      color: '#00B956',
      icon: IconVideo,
      services: [
        { title: 'Врач онлайн', sub: 'ответ за 3 мин', status: 'available', screen: 2 },
        { title: 'Дежурный врач 24/7', sub: 'всегда на связи', status: 'available', screen: 2 },
        { title: 'Педиатр онлайн', sub: 'для детей', status: 'available', screen: 2 },
        { title: 'Второе мнение врача', sub: 'Скоро', status: 'soon' },
        { title: 'Семейный врач', sub: 'Скоро', status: 'soon' },
        { title: 'Психолог онлайн', sub: 'Скоро', status: 'soon' },
        { title: 'Диетолог / нутрициолог', sub: 'Скоро', status: 'soon' },
      ]
    },
    ai: {
      title: 'AI-ИНСТРУМЕНТЫ',
      color: '#3B82F6',
      icon: IconRobot,
      services: [
        { title: 'Понять мои анализы', sub: 'расшифровка', status: 'available', screen: 7 },
        { title: 'Что за лекарство?', sub: 'AI объяснит', status: 'available', screen: 11 },
        { title: 'Расшифровка ЭКГ', sub: 'Скоро', status: 'soon' },
        { title: 'Снимки МРТ/КТ', sub: 'Скоро', status: 'soon' },
      ]
    },
    documents: {
      title: 'ДОКУМЕНТЫ',
      color: '#F59E0B',
      icon: IconDocument,
      services: [
        { title: 'Больничный онлайн', sub: 'ЭЛН · официально', status: 'available', screen: 3, ctx: { symptom: 'Справка для работы', symptomIcon: '📄', isSickLeave: true } },
        { title: 'Справка для работы', sub: 'Скоро', status: 'soon' },
        { title: 'Справка для бассейна', sub: 'Скоро', status: 'soon' },
        { title: 'Рецепт онлайн', sub: 'Скоро', status: 'soon' },
      ]
    },
    companion: {
      title: 'СОПРОВОЖДЕНИЕ',
      color: '#8B5CF6',
      icon: IconCheckCircle,
      services: [
        { title: 'Менеджер здоровья', sub: 'Скоро', status: 'soon' },
        { title: 'Ведение беременности', sub: 'Скоро', status: 'soon' },
        { title: 'Школьная медицина', sub: 'Скоро', status: 'soon' },
        { title: 'Медпомощь в путешествии', sub: 'Скоро', status: 'soon' },
        { title: 'Чекап / профилактика', sub: 'Скоро', status: 'soon' },
      ]
    }
  }

  return (
    <div className="px-4 space-y-5">
      {Object.entries(catalog).map(([key, section]) => {
        const SectionIcon = section.icon
        return (
          <div key={key}>
            <div className="flex items-center gap-2.5 mb-3">
              <SectionIcon color={section.color} />
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: section.color }}>
                {section.title}
              </div>
            </div>

            <div className="space-y-2">
              {section.services.map((svc, i) => (
                <button
                  key={i}
                  onClick={() => svc.status === 'available' && navigate(svc.screen, svc.ctx || {})}
                  disabled={svc.status === 'soon'}
                  className="w-full rounded-xl p-3 text-left transition-all active:scale-95 disabled:active:scale-100 h-16 flex items-center"
                  style={{
                    background: svc.status === 'available'
                      ? `rgba(${parseInt(section.color.slice(1,3),16)}, ${parseInt(section.color.slice(3,5),16)}, ${parseInt(section.color.slice(5,7),16)}, 0.08)`
                      : 'var(--bg-elevated)',
                    border: svc.status === 'available'
                      ? `1px solid ${section.color}33`
                      : '1px solid var(--border)',
                    opacity: svc.status === 'soon' ? 0.6 : 1,
                    cursor: svc.status === 'available' ? 'pointer' : 'default'
                  }}>
                  <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white">{svc.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: svc.status === 'available' ? section.color : 'var(--text-muted)' }}>
                        {svc.sub}
                      </div>
                    </div>
                    {/* Fixed-width right element (24px to match icon width) */}
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {svc.status === 'available' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: section.color }}>
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <span className="text-[10px] font-semibold px-1 py-0.5 rounded-full" style={{ background: 'rgba(100,116,139,0.2)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          СКОРО
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Inner navigation bar — for screens 2-14, sits below FreedomShell
function InnerNav({ title, sub, goBack }) {
  return (
    <div className="flex items-center px-4 py-2.5 gap-2" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={goBack}
        className="flex items-center gap-1 text-sm transition-opacity active:opacity-60 flex-shrink-0"
        style={{ color: 'var(--text-secondary)', minWidth: 70 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="font-medium">Назад</span>
      </button>
      <div className="flex-1 text-center min-w-0">
        <div className="font-semibold text-white text-sm truncate tracking-tight">{title}</div>
        {sub && <div className="text-[11px] font-medium truncate mt-0.5" style={{ color: 'var(--green-500)' }}>{sub}</div>}
      </div>
      <div style={{ minWidth: 70 }} />
    </div>
  )
}

// FIX 5 — Remove pharmacy (id 11) from nav, keep only 4 tabs
function BottomNav({ current, navigate }) {
  const tabs = [
    {
      id: 1, label: 'Главная',
      svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
    {
      id: 12, label: 'Мои записи',
      svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    },
    {
      id: 2, label: 'Врачи',
      svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.5 6.5a4 4 0 0 0 4 4h1a4 4 0 0 1 4 4v1a3 3 0 0 0 6 0v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="19.5" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="M4.5 6.5V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
    {
      id: 15, label: 'Профиль',
      svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
  ]
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-20"
      style={{ background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)' }}>
      <div className="flex" style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
        {tabs.map(t => {
          const active = current === t.id
          return (
            <button key={t.id} onClick={() => navigate(t.id)}
              className="flex-1 flex flex-col items-center pt-2 pb-2 gap-0.5 transition-all active:scale-90"
              style={{ color: active ? 'var(--green-500)' : 'var(--text-muted)' }}>
              {active && <div className="nav-indicator mb-1" />}
              <span className="leading-none">{t.svg}</span>
              <span className="text-[10px] font-medium mt-0.5">{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DoctorAvatar({ size = 48, initials = 'АС', colors = ['#00B956', '#0F6E56'], online = false }) {
  const ringPad = Math.max(2, size * 0.05)
  const innerSize = size - ringPad * 2 - 3
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* gradient ring */}
      <div style={{
        width: size, height: size, borderRadius: '50%', padding: ringPad,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'var(--bg-base)', padding: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%', fontSize: size * 0.3,
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: 'white',
          }}>
            {initials}
          </div>
        </div>
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 online-dot" style={{ width: size * 0.22, height: size * 0.22, borderWidth: size > 50 ? 2 : 1.5 }} />
      )}
    </div>
  )
}

function GreenCrossLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="12" y="2" width="8" height="28" rx="2" fill="#00B956"/>
      <rect x="2" y="12" width="28" height="8" rx="2" fill="#00B956"/>
    </svg>
  )
}

// ─── Screen 0: Splash ────────────────────────────────────────────────────────

function Screen0({ navigate, onExit }) {
  useEffect(() => {
    // Fast entry — always auto-navigate after brief icon flash
    localStorage.setItem('cdk_visited', '1')
    const t = setTimeout(() => navigate(1), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,185,86,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,185,86,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      </div>

      {/* icon */}
      <div className="relative fade-in-up" style={{ marginBottom: 28 }}>
        <div className="absolute inset-0 rounded-[32px] glow-pulse" style={{ background: 'rgba(0,185,86,0.25)', filter: 'blur(20px)', transform: 'scale(1.1)' }} />
        <img
          src="/icon.png"
          alt="Цифровая клиника"
          className="relative"
          style={{ width: 120, height: 120, borderRadius: 28, boxShadow: '0 8px 40px rgba(0,185,86,0.35)' }}
        />
      </div>

      {/* name + tagline */}
      <div className="fade-in-up-d1 text-center" style={{ marginBottom: 12 }}>
        <div className="font-bold text-white tracking-tight" style={{ fontSize: 22, lineHeight: 1.2 }}>Цифровая клиника</div>
        <div className="font-medium mt-1.5" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Врач онлайн · EmAI × Freedom</div>
      </div>

      {/* loading dots */}
      <div className="fade-in-up-d2 flex items-center gap-1.5 mt-4">
        <div className="w-1.5 h-1.5 rounded-full dot1" style={{ background: 'var(--green-500)' }} />
        <div className="w-1.5 h-1.5 rounded-full dot2" style={{ background: 'var(--green-500)' }} />
        <div className="w-1.5 h-1.5 rounded-full dot3" style={{ background: 'var(--green-500)' }} />
      </div>
    </div>
  )
}

// ─── Screen 1: Main ──────────────────────────────────────────────────────────

function Screen1({ navigate, onExit, version, setVersion }) {
  // F5.2 FIX — recover interrupted session
  const [pendingSession, setPendingSession] = useState(null)
  const [showSupport, setShowSupport] = useState(false) // FIX 6 — support chat modal

  useEffect(() => {
    const saved = localStorage.getItem('cdk_pending_session')
    if (saved) { try { setPendingSession(JSON.parse(saved)) } catch {} }
  }, [])

  function resumeSession()  { localStorage.removeItem('cdk_pending_session'); navigate(5) }
  function cancelSession()  { localStorage.removeItem('cdk_pending_session'); setPendingSession(null) }

  // FIX 3 & 4 — Rename "Ребёнок" → "Здоровье ребёнка", add "Психологическая помощь"
  const symptoms = [
    { icon: '🌡', label: 'Температура' },
    { icon: '🤧', label: 'Горло / нос' },
    { icon: '🤢', label: 'Живот' },
    { icon: '❤️', label: 'Давление' },
    { icon: '👶', label: 'Здоровье ребёнка' },
    { icon: '🧠', label: 'Психологическая помощь' },
  ]
  const extraSymptoms = [
    { icon: '💊', label: 'Другое' },
  ]
  // FIX 7 — Simplified language for users
  const services = [
    { icon: '📹', title: 'Врач онлайн', sub: 'прямо сейчас', border: '#00B956', screen: 2, badge: '● 12 онлайн' },
    { icon: '🔬', title: 'Понять мои анализы', sub: 'AI расшифровка', border: '#0F6E56', screen: 7 },
    { icon: '💊', title: 'Что за лекарство?', sub: 'AI объяснит', border: '#534AB7', screen: 11 },
    { icon: '📄', title: 'Больничный онлайн', sub: 'ЭЛН · официально', border: '#185FA5', screen: 3, ctx: { symptom: 'Справка для работы', symptomIcon: '📄', isSickLeave: true } },
  ]

  return (
    <div className="pb-24">
      <FreedomShell onExit={onExit} onSupportClick={() => setShowSupport(true)} version={version} setVersion={setVersion} />
      {/* FIX 1 — Compact profile bar */}
      <CompactProfileBar />
      {/* Sub-status: online doctors count */}

      {version === 'v1' ? (
        /* V1 — Compact layout */
        <div className="px-4 space-y-3 pt-3">

          {/* F5.2 FIX — interrupted session recovery banner */}
          {pendingSession && (
            <div className="rounded-2xl p-4 fade-in-up" style={{ background: 'rgba(239,159,39,0.08)', border: '1px solid rgba(239,159,39,0.35)' }}>
              <div className="font-semibold text-white text-sm mb-0.5">⚡ Незавершённая сессия</div>
              <div className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                Оплата прошла · Айгуль Сейткали ожидала вас
              </div>
              <div className="flex gap-2">
                <button onClick={resumeSession} className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-bold text-white">
                  Вернуться к врачу →
                </button>
                <button onClick={cancelSession} className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}>
                  Отменить · возврат
                </button>
              </div>
            </div>
          )}

          {/* Hero symptom section — FIX 4: 3x2 grid + separate row for "Другое" */}
        <div className="card-up-d1 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(160deg, #0A2218 0%, #051A10 100%)', border: '1px solid rgba(0,185,86,0.18)', boxShadow: '0 4px 24px rgba(0,185,86,0.08)' }}>
          <div className="p-4 pb-3">
            <div className="font-bold text-white text-lg tracking-tight mb-1">Что вас беспокоит?</div>
            <div className="text-xs font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>AI подберёт нужного врача за 2 вопроса</div>

            {/* Main 3x2 grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {symptoms.map((s, i) => (
                <button key={i} onClick={() => navigate(3, { symptom: s.label, symptomIcon: s.icon })}
                  className="rounded-xl py-2.5 px-3 text-sm text-white flex items-center gap-2 transition-all active:scale-95 text-left"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                  <span className="text-base leading-none">{s.icon}</span><span className="font-medium">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Extra row for "Другое" */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {extraSymptoms.map((s, i) => (
                <button key={i} onClick={() => navigate(3, { symptom: s.label, symptomIcon: s.icon })}
                  className="rounded-xl py-2.5 px-3 text-sm text-white flex items-center gap-2 transition-all active:scale-95 text-left"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                  <span className="text-base leading-none">{s.icon}</span><span className="font-medium">{s.label}</span>
                </button>
              ))}
            </div>

            <button onClick={() => navigate(3, { symptom: 'Общее', symptomIcon: '🤔' })}
              className="text-xs w-full text-center font-medium transition-opacity active:opacity-60" style={{ color: 'var(--text-secondary)' }}>
              Не знаю что выбрать — помогите определить →
            </button>
          </div>
        </div>

        {/* Quick services */}
        <div className="card-up-d2">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>Быстрые услуги</div>
          <div className="horizontal-scroll">
            {services.map((s, i) => (
              <button key={i} onClick={() => navigate(s.screen, s.ctx || {})}
                className="rounded-2xl p-3.5 flex flex-col items-start gap-1.5 transition-all active:scale-95 flex-shrink-0"
                style={{ background: 'var(--bg-elevated)', border: `1.5px solid ${s.border}33`, minWidth: 136,
                  boxShadow: `0 4px 16px ${s.border}18` }}>
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${s.border}22` }}>
                    {s.icon}
                  </div>
                  {s.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                      style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)' }}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className="font-semibold text-white text-sm leading-tight tracking-tight">{s.title}</div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active consultation */}
        <div className="card-up-d3 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #072518 0%, #041510 100%)', border: '1.5px solid rgba(0,185,86,0.4)', boxShadow: '0 4px 24px rgba(0,185,86,0.15)' }}>
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--green-500)' }}>● Следующий приём</div>
          </div>
          <div className="px-4 pb-4 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm tracking-tight">Айгуль Сейткали</div>
              <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Ср 14 мая · 14:00–14:30 · Видео</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-medium" style={{ color: 'var(--green-400)' }}>✓ Оплачено · 3 920 ₸</span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>· через 2 дня</span>
              </div>
            </div>
            <button onClick={() => navigate(5)} className="btn-primary px-4 py-2.5 text-sm font-bold text-white flex-shrink-0 transition-all active:scale-95">
              Войти →
            </button>
          </div>
        </div>
      </div>
      ) : (
        /* V2 — Full catalog layout */
        <div className="space-y-5 pt-5">
          <div className="px-4">
            <div className="font-bold text-white text-xl tracking-tight mb-1">Все услуги</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Полный каталог медицинских услуг</div>
          </div>
          <ServicesCatalog navigate={navigate} />
        </div>
      )}

      {/* FIX 6 — Support chat modal */}
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)', paddingBottom: 'env(safe-area-inset-bottom, 0)' }}>
          <div className="w-full rounded-t-3xl p-4 max-w-[390px] mx-auto animate-in" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderBottomWidth: 0, boxShadow: '0 -4px 24px rgba(0,0,0,0.3)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-white text-lg">💬 Поддержка</div>
              <button onClick={() => setShowSupport(false)} className="text-xl leading-none" style={{ color: 'var(--text-muted)' }}>✕</button>
            </div>

            <div className="rounded-2xl p-4 mb-4 text-center" style={{ background: 'rgba(0,185,86,0.1)', border: '1px solid rgba(0,185,86,0.2)' }}>
              <div className="text-xs font-semibold mb-1" style={{ color: 'var(--green-500)' }}>● Мы онлайн</div>
              <div className="text-sm text-white mb-3">Мы ответим в течение 5 минут</div>
              <button onClick={() => setShowSupport(false)} className="btn-primary w-full py-2.5 rounded-xl text-sm font-bold text-white">
                Написать в чат →
              </button>
            </div>

            <div className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
              Часы работы: Пн-Вс 08:00–22:00 <br/> WhatsApp, Telegram, Email
            </div>
          </div>
        </div>
      )}

      <BottomNav current={1} navigate={navigate} />
    </div>
  )
}

// ─── Screen 2: Doctors Online ─────────────────────────────────────────────────

const ALL_DOCTORS = [
  { initials: 'АС', name: 'Айгуль Сейткали',   spec: 'Терапевт',        exp: 12, rating: '4.91', online: true,  wait: '~2 мин',  price: '4 900 ₸', cashback: '3 920 ₸', colors: ['#00B956','#0F6E56'] },
  { initials: 'НА', name: 'Нурлан Абенов',      spec: 'Педиатр',         exp: 9,  rating: '4.88', online: true,  wait: '~5 мин',  price: '4 900 ₸', cashback: '3 920 ₸', colors: ['#185FA5','#534AB7'] },
  { initials: 'МК', name: 'Мадина Кажибекова',  spec: 'Кардиолог',       exp: 15, rating: '4.95', online: true,  wait: '~8 мин',  price: '5 900 ₸', cashback: '4 720 ₸', colors: ['#534AB7','#E24B4A'] },
  { initials: 'ДС', name: 'Дания Сарсенова',    spec: 'ЛОР',             exp: 7,  rating: '4.83', online: false, wait: '~20 мин', price: '4 900 ₸', cashback: '3 920 ₸', colors: ['#0F6E56','#185FA5'] },
  { initials: 'БК', name: 'Бекзат Кожахметов', spec: 'Невролог',         exp: 11, rating: '4.87', online: true,  wait: '~12 мин', price: '5 900 ₸', cashback: '4 720 ₸', colors: ['#534AB7','#185FA5'] },
  { initials: 'ГА', name: 'Гүлнара Ахметова',  spec: 'Дерматолог',       exp: 8,  rating: '4.79', online: false, wait: '~25 мин', price: '4 900 ₸', cashback: '3 920 ₸', colors: ['#E24B4A','#534AB7'] },
  { initials: 'РМ', name: 'Руслан Муратов',     spec: 'Гастроэнтеролог',  exp: 14, rating: '4.80', online: true,  wait: '~10 мин', price: '5 900 ₸', cashback: '4 720 ₸', colors: ['#185FA5','#0F6E56'] },
  { initials: 'ЗТ', name: 'Зарина Тлеубаева',  spec: 'Эндокринолог',     exp: 10, rating: '4.85', online: false, wait: '~30 мин', price: '5 900 ₸', cashback: '4 720 ₸', colors: ['#EF9F27','#0F6E56'] },
  { initials: 'АА', name: 'Алия Абдуова',       spec: 'Офтальмолог',      exp: 6,  rating: '4.76', online: true,  wait: '~7 мин',  price: '4 900 ₸', cashback: '3 920 ₸', colors: ['#00B956','#185FA5'] },
]

const SPEC_FILTERS = ['Все', 'Терапевт', 'Педиатр', 'Кардиолог', 'Невролог', 'ЛОР', 'Дерматолог', 'Гастроэнтеролог', 'Эндокринолог', 'Офтальмолог']
const SORT_OPTIONS = [
  { key: 'online', label: 'Онлайн сначала' },
  { key: 'rating', label: 'По рейтингу' },
  { key: 'price',  label: 'По цене' },
  { key: 'exp',    label: 'По опыту' },
]

function Screen2({ navigate, goBack, onExit }) {
  const [query, setQuery]   = useState('')
  const [spec, setSpec]     = useState('Все')
  const [sort, setSort]     = useState('online')
  const [showSort, setShowSort] = useState(false)

  const onlineCount = ALL_DOCTORS.filter(d => d.online).length

  let filtered = ALL_DOCTORS
    .filter(d => spec === 'Все' || d.spec === spec)
    .filter(d => {
      const q = query.toLowerCase()
      return !q || d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q)
    })

  if (sort === 'online')  filtered = [...filtered].sort((a,b) => b.online - a.online)
  if (sort === 'rating')  filtered = [...filtered].sort((a,b) => parseFloat(b.rating) - parseFloat(a.rating))
  if (sort === 'price')   filtered = [...filtered].sort((a,b) => parseInt(a.price) - parseInt(b.price))
  if (sort === 'exp')     filtered = [...filtered].sort((a,b) => b.exp - a.exp)

  return (
    <div className="pb-28" onClick={() => showSort && setShowSort(false)}>
      <FreedomShell onExit={onExit} />
      <InnerNav title="Врачи" sub={`● ${onlineCount} онлайн`} goBack={goBack} />

      {/* ── Search bar ── */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Имя врача или специализация…"
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'Inter, sans-serif', width: '100%' }}
          />
          {query ? (
            <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          ) : null}
        </div>
      </div>

      {/* ── Spec filter chips ── */}
      <div className="horizontal-scroll px-4 pb-2 gap-2" style={{ paddingBottom: 8 }}>
        {SPEC_FILTERS.map(s => (
          <button key={s} onClick={() => setSpec(s)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            style={spec === s ? {
              background: 'var(--green-500)', color: '#fff', border: '1px solid var(--green-500)'
            } : {
              background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)'
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* ── Sort + count row ── */}
      <div className="px-4 flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {filtered.length === 0 ? 'Не найдено' : `${filtered.length} врач${filtered.length === 1 ? '' : filtered.length < 5 ? 'а' : 'ей'}`}
        </span>
        <div className="relative">
          <button onClick={e => { e.stopPropagation(); setShowSort(s => !s) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            {SORT_OPTIONS.find(o => o.key === sort)?.label}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ transform: showSort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {showSort && (
            <div className="absolute right-0 top-9 z-30 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', minWidth: 170 }}
              onClick={e => e.stopPropagation()}>
              {SORT_OPTIONS.map(o => (
                <button key={o.key} onClick={() => { setSort(o.key); setShowSort(false) }}
                  className="w-full text-left px-4 py-3 text-sm font-medium transition-all"
                  style={{ color: sort === o.key ? 'var(--green-500)' : 'var(--text-primary)', background: sort === o.key ? 'rgba(0,185,86,0.08)' : 'transparent' }}>
                  {sort === o.key && <span className="mr-2">✓</span>}{o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Doctor cards ── */}
      <div className="px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <div className="font-semibold text-white mb-1">Врачи не найдены</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Попробуйте другой запрос или сбросьте фильтры</div>
            <button onClick={() => { setQuery(''); setSpec('Все') }}
              className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(0,185,86,0.12)', color: 'var(--green-500)', border: '1px solid rgba(0,185,86,0.3)' }}>
              Сбросить фильтры
            </button>
          </div>
        ) : filtered.map((d, i) => (
          <div key={i} className="rounded-2xl p-4 card-up" style={{
            animationDelay: `${i * 0.04}s`,
            background: 'var(--bg-elevated)',
            border: d.online ? '1px solid rgba(0,185,86,0.25)' : '1px solid var(--border)',
            boxShadow: d.online ? '0 4px 20px rgba(0,185,86,0.08)' : 'var(--shadow-card)'
          }}>
            <div className="flex items-start gap-3">
              <DoctorAvatar size={54} initials={d.initials} colors={d.colors} online={d.online} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm tracking-tight">{d.name}</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {d.spec} · Стаж {d.exp} лет
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>★ {d.rating}</span>
                  <span className="text-xs font-medium" style={{ color: d.online ? 'var(--green-500)' : 'var(--text-muted)' }}>
                    {d.online ? `● онлайн · ${d.wait}` : `○ занят · ${d.wait}`}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {d.online ? (
                  <>
                    <div className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>{d.price}</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--green-500)' }}>{d.cashback}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>с кешбэком</div>
                  </>
                ) : (
                  <div className="font-bold text-sm" style={{ color: 'var(--text-muted)' }}>{d.price}</div>
                )}
              </div>
            </div>
            {d.online ? (
              <button onClick={() => navigate(4, { fromAI: false, doctor: d })}
                className="btn-primary mt-3 w-full py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95">
                Начать консультацию →
              </button>
            ) : (
              <div className="flex gap-2 mt-3">
                <button disabled className="flex-1 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', cursor: 'default' }}>
                  Недоступен
                </button>
                <button onClick={() => navigate(13, { doctor: d })}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{ background: 'rgba(0,185,86,0.08)', color: 'var(--green-500)', border: '1px solid rgba(0,185,86,0.3)' }}>
                  Записаться →
                </button>
              </div>
            )}
          </div>
        ))}

        {filtered.length > 0 && (
          <>
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>или запишитесь на время</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>
            <button onClick={() => navigate(13)}
              className="w-full py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95"
              style={{ borderColor: 'rgba(0,185,86,0.4)', color: 'var(--green-500)', background: 'rgba(0,185,86,0.05)' }}>
              Выбрать дату и время →
            </button>
          </>
        )}

        <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, #072518, #041510)', border: '1px solid rgba(0,185,86,0.2)' }}>
          <div className="font-semibold text-white text-center text-sm">Оплата через FreedomPay</div>
          <div className="text-xs text-center mt-1 font-medium" style={{ color: 'var(--green-500)' }}>Кешбэк 20% · эффективная цена от 3 920 ₸</div>
        </div>
      </div>
      <BottomNav current={2} navigate={navigate} />
    </div>
  )
}

// ─── Screen 3: AI Anamnesis Chat ──────────────────────────────────────────────

// Symptom-specific question flows
const SYMPTOM_FLOWS = {
  'Горло / нос': {
    q1: 'Горло болит или першит?', a1: ['Болит', 'Першит', 'И то и другое'],
    q2: 'Есть температура?', a2: ['Да, выше 37.5', 'Нет', 'Не мерил'],
    getDiagnosis: (a1, a2) => a2 === 'Да, выше 37.5'
      ? { text: 'Похоже на ОРВИ или ангину. Рекомендую терапевта.', summary: `${a1} в горле + температура 37.5 → вероятно ОРВИ`, spec: 'терапевт' }
      : { text: 'Скорее всего фарингит или ОРВИ без температуры. Рекомендую терапевта.', summary: `${a1} в горле, без температуры → фарингит`, spec: 'терапевт' },
  },
  'Температура': {
    q1: 'Температура выше 38°?', a1: ['Да, выше 38', '37–38', 'Не мерил'],
    q2: 'Есть кашель или насморк?', a2: ['Да', 'Нет', 'Только кашель'],
    getDiagnosis: (a1, a2) => ({ text: 'Возможна вирусная инфекция. Рекомендую терапевта.', summary: `Температура ${a1} + ${a2} → вероятно ОРВИ`, spec: 'терапевт' }),
  },
  'Живот': {
    q1: 'Боль в животе острая или тупая?', a1: ['Острая', 'Тупая / ноющая', 'Спазмы'],
    q2: 'Есть тошнота или рвота?', a2: ['Да, тошнит', 'Была рвота', 'Нет'],
    getDiagnosis: (a1, a2) => ({ text: 'Рекомендую гастроэнтеролога или терапевта.', summary: `Боль ${a1} + ${a2} → нужна консультация`, spec: 'гастроэнтеролог' }),
  },
  'Давление': {
    q1: 'Давление повышено или пониженное?', a1: ['Высокое', 'Низкое', 'Не знаю'],
    q2: 'Есть головная боль или головокружение?', a2: ['Да, болит голова', 'Кружится голова', 'Нет'],
    getDiagnosis: (a1, a2) => ({ text: 'Рекомендую терапевта или кардиолога.', summary: `Давление ${a1} + ${a2}`, spec: 'кардиолог' }),
  },
  'Ребёнок': {
    q1: 'Сколько лет ребёнку?', a1: ['До 3 лет', '3–12 лет', 'Старше 12'],
    q2: 'Что беспокоит больше всего?', a2: ['Температура', 'Кашель / насморк', 'Живот / рвота'],
    getDiagnosis: (a1, a2) => ({ text: 'Рекомендую детского педиатра.', summary: `Ребёнок ${a1}, ${a2}`, spec: 'педиатр' }),
  },
  'Другое': {
    q1: 'Опишите основное беспокойство:', a1: ['Слабость / усталость', 'Кожные проблемы', 'Суставы / спина'],
    q2: 'Как давно это началось?', a2: ['Сегодня', 'Несколько дней', 'Давно'],
    getDiagnosis: (a1, a2) => ({ text: 'Рекомендую общую консультацию терапевта.', summary: `${a1}, началось: ${a2}`, spec: 'терапевт' }),
  },
  'Общее': {
    q1: 'Что вас беспокоит?', a1: ['Общее недомогание', 'Хроническая усталость', 'Не могу описать'],
    q2: 'Есть температура или боль?', a2: ['Да', 'Нет', 'Не уверен'],
    getDiagnosis: (a1, a2) => ({ text: 'Рекомендую терапевта для первичной консультации.', summary: `${a1}, температура/боль: ${a2}`, spec: 'терапевт' }),
  },
}

function Screen3({ navigate, goBack, onExit, ctx }) {
  const symptom = ctx?.symptom || 'Горло / нос'
  const flow = SYMPTOM_FLOWS[symptom] || SYMPTOM_FLOWS['Общее']

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'ai', text: flow.q1, chips: flow.a1, step: 0 }
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function handleChip(chip, chipStep) {
    if (chipStep !== step || typing) return
    const newAnswers = [...answers, chip]
    const withUser = [...messages, { type: 'user', text: chip }]
    setMessages(withUser)
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      if (chipStep === 0) {
        setMessages(m => [...m, { type: 'ai', text: flow.q2, chips: flow.a2, step: 1 }])
        setStep(1)
      } else if (chipStep === 1) {
        const diagnosis = flow.getDiagnosis(answers[0], chip)
        setMessages(m => [...m, { type: 'ai', text: `Понял. ${diagnosis.text}`, card: true, diagnosis, step: 2 }])
        setStep(2)
      }
      setAnswers(newAnswers)
    }, 1200)
  }

  return (
    <div className="flex flex-col" style={{ height: '100vh' }}>
      <FreedomShell onExit={onExit} />
      <InnerNav title={`${ctx?.symptomIcon || '🤖'} ${symptom}`} sub="AI подберёт врача" goBack={goBack} />
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ paddingBottom: 80 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.type === 'ai' && (
              <div className="flex gap-2 max-w-[90%] bubble-in">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1" style={{ background: 'linear-gradient(135deg, #052E16, #0A1A0A)', border: '1px solid rgba(0,185,86,0.25)' }}>
                  <GreenCrossLogo size={15} />
                </div>
                <div>
                  <div className="bubble-ai px-4 py-3">
                    <p className="text-white text-sm leading-relaxed">{m.text}</p>
                    {m.card && (
                      <div className="mt-3 rounded-xl p-3" style={{ background: 'var(--bg-base)', border: '1px solid rgba(0,185,86,0.15)' }}>
                        <div className="flex items-center gap-3 mb-3">
                          <DoctorAvatar size={44} initials="АС" online={true} />
                          <div>
                            <div className="font-semibold text-white text-sm tracking-tight">Айгуль Сейткали</div>
                            <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Терапевт · ★ 4.91 · 8 лет</div>
                            <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--green-500)' }}>● онлайн · ответ ~2 мин</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3 p-2 rounded-lg" style={{ background: 'rgba(0,185,86,0.06)', border: '1px solid rgba(0,185,86,0.12)' }}>
                          <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>4 900 ₸</span>
                          <span className="font-bold text-white text-sm">3 920 ₸</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)' }}>−20% кешбэк</span>
                        </div>
                        <button
                          onClick={() => navigate(4, { fromAI: true, symptom, diagnosis: m.diagnosis })}
                          className="btn-primary w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all active:scale-95">
                          Начать консультацию →
                        </button>
                      </div>
                    )}
                  </div>
                  {m.chips && m.step === step && !typing && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.chips.map((c, ci) => (
                        <button key={ci} onClick={() => handleChip(c, m.step)}
                          className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all active:scale-95"
                          style={{ borderColor: 'rgba(0,185,86,0.4)', color: 'var(--green-500)', background: 'rgba(0,185,86,0.06)' }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {m.type === 'user' && (
              <div className="bubble-user px-4 py-3 max-w-[72%] bubble-in">
                <p className="text-white text-sm font-medium">{m.text}</p>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex justify-start bubble-in">
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #052E16, #0A1A0A)', border: '1px solid rgba(0,185,86,0.25)' }}>
                <GreenCrossLogo size={15} />
              </div>
              <div className="bubble-ai px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full dot1" style={{ background: 'var(--green-500)' }} />
                <div className="w-2 h-2 rounded-full dot2" style={{ background: 'var(--green-500)' }} />
                <div className="w-2 h-2 rounded-full dot3" style={{ background: 'var(--green-500)' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-base)' }}>
        <div className="flex gap-2 items-center rounded-2xl px-4 py-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)' }}>
          <input placeholder="Добавить деталь..." className="flex-1 bg-transparent text-sm text-white outline-none" style={{ color: 'var(--text-primary)' }} />
          <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 4: Confirmation ───────────────────────────────────────────────────

// F1.1 FIX — doctor map by specialty
const DOCTOR_MAP = {
  'педиатр':         { name: 'Нурлан Абенов',    spec: 'Педиатр',          initials: 'НА', colors: ['#185FA5','#534AB7'], rating: '4.88' },
  'терапевт':        { name: 'Айгуль Сейткали',  spec: 'Терапевт',         initials: 'АС', colors: ['#00B956','#0F6E56'], rating: '4.91' },
  'кардиолог':       { name: 'Мадина Кажибекова',spec: 'Кардиолог',        initials: 'МК', colors: ['#534AB7','#E24B4A'], rating: '4.95' },
  'гастроэнтеролог': { name: 'Дежурный врач',    spec: 'Гастроэнтеролог',  initials: 'ДВ', colors: ['#0F6E56','#185FA5'], rating: '4.80' },
}

function Screen4({ navigate, goBack, onExit, ctx }) {
  const [payment, setPayment] = useState('freedom')
  const [payError, setPayError] = useState(null)  // F5.1 FIX

  const fromAI       = ctx?.fromAI === true
  const diagnosis    = ctx?.diagnosis
  const fromAnalysis = ctx?.fromAnalysis === true
  const fromHistory  = ctx?.fromHistory === true   // F4.2
  const isScheduled  = ctx?.scheduled === true
  const schedDate    = ctx?.date
  const schedTime    = ctx?.time

  // F1.1 FIX — resolve correct doctor from AI spec or explicit ctx.doctor
  const specKey  = diagnosis?.spec || 'терапевт'
  const assignedDoctor = ctx?.doctor || DOCTOR_MAP[specKey] || DOCTOR_MAP['терапевт']

  const isFree      = payment === 'osms'
  const fullPrice   = 4900
  const cashback    = 980

  function handlePay() {
    setPayError(null)
    // Simulate payment — in prod this calls FreedomPay SDK
    try {
      if (isScheduled) {
        navigate(14, { date: schedDate, time: schedTime, paid: true, payMethod: payment })
      } else {
        navigate(5)
      }
    } catch {
      setPayError('Оплата не прошла. Деньги не списаны — попробуйте ещё раз.')
    }
  }

  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title={isScheduled ? 'Оплата записи' : 'Подтверждение'} sub={isScheduled ? `${schedDate} · ${schedTime}` : undefined} goBack={goBack} />
      <div className="px-4 pt-4 space-y-3">

        {/* F4.2 — history context banner */}
        {fromHistory && (
          <div className="rounded-xl p-3 flex items-start gap-2.5 fade-in-up" style={{ background: 'rgba(24,95,165,0.1)', border: '1px solid rgba(24,95,165,0.3)' }}>
            <span className="text-base flex-shrink-0">📋</span>
            <div>
              <div className="text-xs font-semibold" style={{ color: '#60A5FA' }}>Врач увидит предыдущий визит</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>8 апр 2026 · ОРВИ · диагноз и назначения будут доступны</div>
            </div>
          </div>
        )}

        {/* F1.1 FIX — dynamic doctor card */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-4">
            <DoctorAvatar size={64} initials={assignedDoctor.initials} colors={assignedDoctor.colors} online={true} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-base tracking-tight">{assignedDoctor.name}</div>
              <div className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>{assignedDoctor.spec} · Стаж 8 лет</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>★ {assignedDoctor.rating}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--green-500)' }}>● онлайн · ~2 мин</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled appointment info */}
        {isScheduled && (
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: '#052E16', border: '1px solid #00B956' }}>
            <span className="text-2xl flex-shrink-0">📅</span>
            <div>
              <div className="text-sm font-semibold text-white">{schedDate} · {schedTime}–{schedTime?.replace(':00', ':30')}</div>
              <div className="text-xs mt-0.5" style={{ color: '#00B956' }}>Видеоконсультация · 30 минут</div>
            </div>
          </div>
        )}

        {/* AI reason — ONLY shown if user came through AI chat */}
        {fromAI && diagnosis && (
          <div className="rounded-xl p-3" style={{ background: '#052E16' }}>
            <div className="text-sm text-white mb-1">🤖 Подобрано по симптомам:</div>
            <div className="text-sm" style={{ color: '#9CA3AF' }}>{diagnosis.summary}</div>
            <div className="text-sm mt-1 font-medium" style={{ color: '#00B956' }}>→ нужен {diagnosis.spec}</div>
          </div>
        )}

        {/* Analysis reason — shown if came from analysis */}
        {fromAnalysis && (
          <div className="rounded-xl p-3" style={{ background: '#052E16' }}>
            <div className="text-sm text-white mb-1">🔬 По результатам анализов:</div>
            <div className="text-sm" style={{ color: '#9CA3AF' }}>С-реактивный белок и Витамин D требуют обсуждения</div>
            <div className="text-sm mt-1 font-medium" style={{ color: '#00B956' }}>→ рекомендован терапевт</div>
          </div>
        )}

        {/* Format */}
        {!isScheduled && (
          <div className="rounded-xl p-3 flex items-center gap-2" style={{ background: '#1E2235' }}>
            <span className="text-xl">📹</span>
            <span className="text-white text-sm">Видеоконсультация · сейчас · до 30 мин</span>
          </div>
        )}

        {/* Payment method */}
        <div className="rounded-2xl p-4 space-y-2.5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-1 accent-left" style={{ color: 'var(--text-muted)' }}>Способ оплаты</div>
          {[
            { id: 'freedom', label: 'FreedomPay', sub: 'Super Card ···· 4521 · Рекомендуется', icon: '💳' },
            { id: 'dms',     label: 'ДМС',        sub: 'Страховой полис', icon: '🛡' },
            { id: 'osms',    label: 'ОСМС',       sub: 'Гос. покрытие · бесплатно', icon: '🏥' },
          ].map(p => (
            <button key={p.id} className="w-full flex items-center gap-3 rounded-xl p-3 transition-all active:scale-[0.98]"
              onClick={() => setPayment(p.id)}
              style={{
                background: payment === p.id ? 'rgba(0,185,86,0.07)' : 'var(--bg-surface)',
                border: `1.5px solid ${payment === p.id ? 'rgba(0,185,86,0.45)' : 'var(--border)'}`,
                boxShadow: payment === p.id ? '0 0 12px rgba(0,185,86,0.12)' : 'none'
              }}>
              <span className="text-lg flex-shrink-0">{p.icon}</span>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm text-white font-semibold">{p.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.sub}</div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={{ borderColor: payment === p.id ? 'var(--green-500)' : 'var(--border-strong)' }}>
                {payment === p.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green-500)' }} />}
              </div>
            </button>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="rounded-2xl p-4 space-y-2.5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-1 accent-left" style={{ color: 'var(--text-muted)' }}>Итого</div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Консультация</span>
            <span className="text-white font-medium">4 900 ₸</span>
          </div>
          {!isFree && (
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-secondary)' }}>Кешбэк 20% Freedom</span>
              <span className="font-medium" style={{ color: 'var(--green-500)' }}>−980 ₸</span>
            </div>
          )}
          {isFree && (
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-secondary)' }}>Покрытие ОСМС</span>
              <span className="font-medium" style={{ color: 'var(--green-500)' }}>−4 900 ₸</span>
            </div>
          )}
          <div className="h-px" style={{ background: 'var(--border)' }} />
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">К оплате</span>
            <span className="font-bold text-xl tracking-tight" style={{ color: isFree ? 'var(--green-500)' : 'white' }}>
              {isFree ? 'Бесплатно' : `3 920 ₸`}
            </span>
          </div>
          <div className="rounded-xl p-2.5 text-center text-xs font-medium" style={{ background: isFree ? 'rgba(0,185,86,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isFree ? 'rgba(0,185,86,0.2)' : 'var(--border)'}` }}>
            {isFree
              ? <span style={{ color: 'var(--green-500)' }}>🛡 Покрывается полисом ОСМС</span>
              : <span style={{ color: 'var(--text-secondary)' }}>🔒 Оплата через FreedomPay · <span style={{ color: 'var(--green-500)' }}>+980 ₸ бонусами</span></span>
            }
          </div>
        </div>

        {/* F1.3 FIX — collapsible guarantee (doesn't slow urgent flow) */}
        <details className="rounded-2xl" style={{ background: 'rgba(0,185,86,0.06)', border: '1px solid rgba(0,185,86,0.2)' }}>
          <summary className="flex items-center gap-2 p-3.5 cursor-pointer list-none">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.9 10.15 9 11.35C17.1 23.15 21 18.25 21 13V7L12 2z" stroke="#00B956" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#00B956" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-sm font-semibold flex-1" style={{ color: 'var(--green-500)' }}>🛡 Гарантия возврата</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>подробнее ▾</span>
          </summary>
          <div className="px-3.5 pb-3.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Если врач не подключится в течение 5 минут — деньги вернутся автоматически. Никаких звонков и объяснений.
          </div>
        </details>

        {/* F5.1 FIX — payment error state */}
        {payError && (
          <div className="rounded-xl p-3 fade-in-up" style={{ background: 'rgba(226,75,74,0.1)', border: '1px solid rgba(226,75,74,0.3)' }}>
            <div className="text-sm font-semibold" style={{ color: '#F87171' }}>⚠ {payError}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Деньги не списаны. Попробуйте другой способ оплаты.</div>
          </div>
        )}

        <button
          onClick={handlePay}
          className="btn-primary w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95">
          {isScheduled
            ? (isFree ? '✓ Забронировать · ОСМС' : 'Оплатить 3 920 ₸ · забронировать')
            : (isFree ? 'Начать · бесплатно по ОСМС' : 'Оплатить 3 920 ₸ · начать сейчас')
          }
        </button>
        <button onClick={goBack} className="w-full text-center text-sm py-2" style={{ color: 'var(--text-muted)' }}>
          {isScheduled ? 'Изменить время' : 'Выбрать другого врача'}
        </button>
      </div>
    </div>
  )
}

// ─── Screen 5: Connecting ─────────────────────────────────────────────────────

function Screen5({ navigate, goBack, onExit }) {
  const [showEnter, setShowEnter] = useState(false)
  const [pct, setPct] = useState(0)
  const [showEscape, setShowEscape] = useState(false)
  const [showEscapeMenu, setShowEscapeMenu] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setPct(p => { if (p >= 60) { clearInterval(interval); return 60 } return p + 2 }), 50)
    const t2 = setTimeout(() => { setShowEnter(true); setPct(100) }, 3000)
    // Show escape hatch after 8 seconds (doctor is late)
    const t3 = setTimeout(() => setShowEscape(true), 8000)
    return () => { clearInterval(interval); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <FreedomShell onExit={onExit} />
      <InnerNav title="Соединяем…" goBack={goBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">
        <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
          <div className="absolute rounded-full pulse-ring" style={{ width: 180, height: 180, background: 'rgba(0,185,86,0.10)' }} />
          <div className="absolute rounded-full pulse-ring-2" style={{ width: 140, height: 140, background: 'rgba(0,185,86,0.13)' }} />
          <div className="w-20 h-20 rounded-full glow-pulse flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, #00C760, #00A84E)', position: 'relative', zIndex: 10, boxShadow: 'var(--shadow-green)' }}>
            📹
          </div>
        </div>

        <div className="text-center">
          <div className="font-bold text-xl text-white tracking-tight">Соединяем с врачом</div>
          <div className="text-sm mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Айгуль Сейткали · Терапевт</div>
        </div>

        <div className="w-full rounded-full overflow-hidden h-1.5" style={{ background: 'var(--bg-elevated)' }}>
          <div className="h-full rounded-full transition-all duration-200" style={{ background: 'linear-gradient(90deg, #00C760, #00B956)', width: `${pct}%` }} />
        </div>
        <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Обычно менее 2 минут</div>

        <div className="w-full rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-3">
            <DoctorAvatar size={44} initials="АС" online={true} />
            <div>
              <div className="font-semibold text-white tracking-tight">Айгуль Сейткали</div>
              <div className="text-sm font-medium" style={{ color: 'var(--green-500)' }}>● онлайн</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {['📍 Тихое место', '💡 Освещение', '🔋 Зарядка'].map((t, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>

        {showEnter ? (
          <button onClick={() => navigate(6)}
            className="btn-primary w-full py-4 rounded-2xl font-bold text-lg text-white fade-in-up">
            Войти в консультацию →
          </button>
        ) : (
          <button onClick={goBack} className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Отмена</button>
        )}

        {/* Escape hatch — appears if doctor is slow to connect */}
        {showEscape && !showEnter && (
          <div className="w-full fade-in-up">
            {!showEscapeMenu ? (
              <button onClick={() => setShowEscapeMenu(true)}
                className="w-full py-3 rounded-2xl text-sm font-semibold border transition-all active:scale-95"
                style={{ borderColor: 'rgba(239,159,39,0.4)', color: '#EF9F27', background: 'rgba(239,159,39,0.06)' }}>
                ⚠️ Врач задерживается — что делать?
              </button>
            ) : (
              <div className="rounded-2xl p-4 space-y-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)' }}>
                <div className="font-semibold text-white text-sm">Врач не подключается?</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Если врач не вышел в течение 5 минут — мы автоматически отменим сеанс и вернём деньги. Никаких действий с вашей стороны не требуется.
                </div>
                <div className="h-px" style={{ background: 'var(--border)' }} />
                <button onClick={goBack}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{ background: 'rgba(239,159,39,0.1)', color: '#EF9F27', border: '1px solid rgba(239,159,39,0.3)' }}>
                  Отменить сеанс · вернуть деньги
                </button>
                <button onClick={() => setShowEscapeMenu(false)}
                  className="w-full text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                  Продолжить ожидание
                </button>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          {showEnter ? 'Нажмите — войдёте в видеозвонок' : '🛡 Списание только после начала консультации'}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 6: Consultation Done ─────────────────────────────────────────────

function Screen6({ navigate, goBack, onExit, navigateHome }) {
  const [rating, setRating] = useState(0)
  const [ratingDone, setRatingDone] = useState(false)
  const [hovered, setHovered] = useState(0)

  function submitRating(star) {
    setRating(star)
    setTimeout(() => setRatingDone(true), 400)
  }

  const ratingLabels = ['', 'Плохо', 'Терпимо', 'Нормально', 'Хорошо', 'Отлично!']

  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Итоги консультации" goBack={goBack} />
      <div className="px-4 pt-6 space-y-4">
        {/* Success header */}
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 glow-pulse"
            style={{ background: 'linear-gradient(135deg, #072518, #052010)', border: '2px solid rgba(0,185,86,0.5)', boxShadow: 'var(--shadow-green)' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20 L16 28 L32 12" stroke="#00B956" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="checkmark-anim" />
            </svg>
          </div>
          <div className="font-bold text-xl text-white tracking-tight">Консультация завершена</div>
          <div className="text-sm mt-1 font-medium" style={{ color: 'var(--green-500)' }}>Начислено 980 ₸ бонусами Freedom</div>
        </div>

        {/* Doctor rating */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          {!ratingDone ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <DoctorAvatar size={44} initials="АС" />
                <div>
                  <div className="font-semibold text-white text-sm tracking-tight">Айгуль Сейткали</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Оцените консультацию</div>
                </div>
              </div>
              <div className="flex justify-center gap-3 mb-2">
                {[1,2,3,4,5].map(star => (
                  <button key={star}
                    onClick={() => submitRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-all active:scale-90"
                    style={{ fontSize: 36, lineHeight: 1, filter: (hovered || rating) >= star ? 'none' : 'grayscale(1) opacity(0.35)' }}>
                    ⭐
                  </button>
                ))}
              </div>
              <div className="text-center text-sm font-semibold h-5" style={{ color: 'var(--green-500)' }}>
                {hovered > 0 ? ratingLabels[hovered] : rating > 0 ? ratingLabels[rating] : ''}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-2 gap-2">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ fontSize: 28, filter: s <= rating ? 'none' : 'grayscale(1) opacity(0.3)' }}>⭐</span>
                ))}
              </div>
              <div className="font-semibold text-white">{ratingLabels[rating]}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--green-500)' }}>Спасибо за отзыв!</div>
            </div>
          )}
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
          <div className="font-semibold text-white mb-2 tracking-tight">Айгуль Сейткали · Терапевт · 14 мин</div>
          <div className="h-px mb-3" style={{ background: 'var(--border)' }} />
          <div className="text-sm text-white mb-1"><span style={{ color: 'var(--text-secondary)' }}>Диагноз:</span> ОРВИ</div>
          <div className="text-sm text-white mb-2 leading-relaxed"><span style={{ color: 'var(--text-secondary)' }}>Назначено:</span> амоксициллин 500мг, парацетамол 500мг, полоскание горла</div>
          <button style={{ color: 'var(--green-500)' }} className="text-sm font-semibold">→ Сохранено в Мои обращения</button>
        </div>

        {/* N8 FIX — reduced from 5 cards to 3, grouped actions */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #072518, #041510)', border: '1.5px solid rgba(0,185,86,0.4)', boxShadow: '0 4px 20px rgba(0,185,86,0.1)' }}>
          <div className="font-semibold text-white tracking-tight mb-0.5">Следующие шаги</div>
          <div className="text-xs mb-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Врач напишет через 3 дня для контроля</div>
          <div className="flex gap-2">
            <button onClick={() => navigate(11, { query: 'амоксициллин' })}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{ border: '1.5px solid rgba(0,185,86,0.4)', color: 'var(--green-500)', background: 'rgba(0,185,86,0.07)' }}>
              💊 Купить в аптеке
            </button>
            <button onClick={() => navigate(12, { sickLeave: true })}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{ border: '1.5px solid rgba(15,110,86,0.4)', color: '#34D399', background: 'rgba(15,110,86,0.07)' }}>
              📄 Больничный
            </button>
          </div>
        </div>

        <button onClick={navigateHome}
          className="btn-primary w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95">
          Вернуться на главную
        </button>

        <button onClick={() => navigate(12)} className="w-full text-center text-sm py-2 font-medium" style={{ color: 'var(--text-muted)' }}>
          Мои обращения →
        </button>
      </div>
    </div>
  )
}

// ─── Screen 7: Upload Analysis ────────────────────────────────────────────────

function Screen7({ navigate, goBack, onExit }) {
  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="🔬 Разобрать анализы" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          Загрузите результаты — AI объяснит простым языком и подскажет что делать дальше.
        </p>

        <button onClick={() => navigate(8)}
          className="w-full rounded-2xl flex flex-col items-center justify-center py-12 border border-dashed gap-3 transition-all active:scale-95"
          style={{ borderColor: '#0F6E56', background: 'var(--bg-elevated)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(15,110,86,0.15)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#0F6E56" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div className="font-semibold text-white text-base">Выбрать файл</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Из галереи, файлов или WhatsApp</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PDF · фото бумажного бланка</div>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: '#374151' }} />
          <span className="text-xs" style={{ color: '#9CA3AF' }}>или</span>
          <div className="flex-1 h-px" style={{ background: '#374151' }} />
        </div>

        <button onClick={() => navigate(8)}
          className="w-full py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>
          <span>📷</span> Сфотографировать
        </button>

        <p className="text-xs text-center" style={{ color: '#374151' }}>
          🔒 Данные конфиденциальны · не передаются третьим лицам
        </p>
      </div>
    </div>
  )
}

// ─── Screen 8: Analyzing ──────────────────────────────────────────────────────

function Screen8({ navigate, onExit }) {
  const [pct, setPct] = useState(0)

  // F3.3 FIX — progress goes to 100% smoothly before navigating, no freeze at 65%
  useEffect(() => {
    const interval = setInterval(() => setPct(p => Math.min(p + 1.5, 100)), 40)
    const timer = setTimeout(() => { setPct(100); setTimeout(() => navigate(9), 350) }, 2500)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [navigate])

  const r = 45, circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0D1117' }}>
      <FreedomShell onExit={onExit} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        <svg width="160" height="160" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#1E2235" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="#0F6E56" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.05s' }} />
        </svg>
        <div className="absolute text-3xl font-bold text-white">{Math.round(pct)}%</div>
      </div>
      <div className="text-center">
        <div className="font-bold text-xl text-white">EmAI изучает ваши результаты</div>
        <div className="text-sm mt-2 italic" style={{ color: '#9CA3AF' }}>Это не диагноз. Интерпретацию подтвердит врач.</div>
      </div>
      <div className="flex gap-3">
        <div className="w-3 h-3 rounded-full dot1" style={{ background: '#0F6E56' }} />
        <div className="w-3 h-3 rounded-full dot2" style={{ background: '#0F6E56' }} />
        <div className="w-3 h-3 rounded-full dot3" style={{ background: '#0F6E56' }} />
      </div>
      </div>
    </div>
  )
}

// ─── Screen 9: Analysis Results ───────────────────────────────────────────────

function Screen9({ navigate, goBack, onExit }) {
  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Результаты анализа" goBack={goBack} />
      <div className="px-4 pt-4 space-y-3">
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', borderLeft: '4px solid #0F6E56' }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: '#0F6E56' }}>✓</span>
            <span className="font-semibold" style={{ color: '#0F6E56' }}>В норме</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Большинство показателей в пределах нормы — гемоглобин, лейкоциты, глюкоза.</p>
        </div>

        {/* F3.2 FIX — reference ranges shown alongside values */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', borderLeft: '4px solid #EF9F27' }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: '#EF9F27' }}>⚠</span>
            <span className="font-semibold" style={{ color: '#EF9F27' }}>На что обратить внимание</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'С-реактивный белок', value: '8.4', unit: 'мг/л', norm: '< 5.0', color: '#EF9F27',
                plain: 'Немного повышен — возможно воспаление. Стоит обсудить с врачом, но не критично.' },
              { name: 'Витамин D', value: '18', unit: 'нг/мл', norm: '30–100', color: '#EF9F27',
                plain: 'Ниже нормы — очень распространено. Врач скорее всего назначит добавку.' },
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(239,159,39,0.07)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{f.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold" style={{ color: f.color }}>{f.value} {f.unit}</span>
                    <span style={{ color: 'var(--text-muted)' }}>норма: {f.norm}</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.plain}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', borderLeft: '4px solid #E24B4A' }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: '#E24B4A' }}>!</span>
            <span className="font-semibold" style={{ color: '#E24B4A' }}>Рекомендуем показаться врачу</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Не срочно, но лучше обсудить — особенно С-реактивный белок.</p>
        </div>

        <button onClick={() => navigate(10)}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white mt-2 transition-all active:scale-95"
          style={{ background: '#00B956' }}>
          Получить рекомендации →
        </button>
      </div>
    </div>
  )
}

// ─── Screen 10: Recommended Doctor ───────────────────────────────────────────

function Screen10({ navigate, goBack, onExit }) {
  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Рекомендации" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          Рекомендуем онлайн-консультацию терапевта Цифровой клиники
        </p>

        {/* N4 FIX — consistent price 4900₸ */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center gap-3 mb-3">
            <DoctorAvatar size={56} initials="АС" colors={['#00B956','#0F6E56']} online={true} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white tracking-tight">Айгуль Сейткали</div>
              <div className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Терапевт · ★ 4.91 · 8 лет</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-white">3 920 ₸</span>
                <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>4 900 ₸</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)' }}>−20% кешбэк</span>
              </div>
            </div>
          </div>
          <div className="h-px mb-3" style={{ background: 'var(--border)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            📋 По вашим анализам: С-реактивный белок и Витамин D — нужно обсудить с врачом.
          </p>
        </div>

        <button onClick={() => navigate(4, { fromAnalysis: true })}
          className="btn-primary w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95">
          Записаться · сейчас онлайн →
        </button>
        <button onClick={() => navigate(13)}
          className="w-full py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
          Выбрать удобное время →
        </button>
        <button onClick={() => navigate(3, { symptom: 'Общее', symptomIcon: '🤔' })}
          className="w-full py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95"
          style={{ borderColor: '#0F6E56', color: '#0F6E56' }}>
          Задать вопрос AI →
        </button>
      </div>
    </div>
  )
}

// ─── Screen 11: Drug Info ─────────────────────────────────────────────────────

function Screen11({ navigate, goBack, onExit, ctx }) {
  const [query, setQuery] = useState(ctx?.query || '')
  const [open, setOpen] = useState(null)
  const showResult = query.length > 2

  // Drug database — keyed by normalised search string
  const DRUGS = {
    амоксициллин: {
      title: 'Амоксициллин 500 мг', tag: 'Антибиотик', tagColor: '#534AB7',
      sections: [
        { key: 'simple', title: 'Простыми словами', content: 'Убивает бактерии. Применяется при ангине, ОРВИ с осложнениями, отите.' },
        { key: 'how', title: 'Как принимать', content: '3 раза в день · 7–10 дней · не прерывать курс' },
        { key: 'warn', title: 'Важно', content: '⚠ Не с алкоголем · Сообщите об аллергии на пенициллин', amber: true },
        { key: 'alt', title: 'Аналоги дешевле', content: 'Флемоксин · Оспамокс' },
      ]
    },
    парацетамол: {
      title: 'Парацетамол 500 мг', tag: 'Жаропонижающее / Анальгетик', tagColor: '#0F6E56',
      sections: [
        { key: 'simple', title: 'Простыми словами', content: 'Снижает температуру и снимает боль. Безопасен при ОРВИ, головной боли, зубной боли.' },
        { key: 'how', title: 'Как принимать', content: '1 таблетка до 4 раз в день · не чаще чем каждые 4–6 часов · запивать водой' },
        { key: 'warn', title: 'Важно', content: '⚠ Не превышать 4 г/сутки · Осторожно при болезнях печени · Не сочетать с алкоголем', amber: true },
        { key: 'alt', title: 'Аналоги', content: 'Панадол · Эффералган · Тайленол' },
      ]
    },
    ибупрофен: {
      title: 'Ибупрофен 400 мг', tag: 'НПВС / Противовоспалительное', tagColor: '#EF9F27',
      sections: [
        { key: 'simple', title: 'Простыми словами', content: 'Снимает воспаление, боль и температуру. Эффективен при боли в суставах, мышцах, зубной боли.' },
        { key: 'how', title: 'Как принимать', content: '1 таблетка 3 раза в день · после еды · не дольше 5 дней без назначения врача' },
        { key: 'warn', title: 'Важно', content: '⚠ Не принимать на голодный желудок · Противопоказан при язве · Осторожно при астме', amber: true },
        { key: 'alt', title: 'Аналоги', content: 'Нурофен · Адвил · МИГ 400' },
      ]
    },
  }

  // Match query to drug
  const q = query.toLowerCase().trim()
  const drugKey = Object.keys(DRUGS).find(k => q.includes(k) || k.includes(q.slice(0, 5)))
  const drug = drugKey ? DRUGS[drugKey] : DRUGS['амоксициллин'] // fallback

  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="💊 Что за лекарство?" sub="AI расшифрует" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">
        <div className="flex items-center gap-2 rounded-full px-4 py-3" style={{ background: '#1E2235' }}>
          <span style={{ color: '#9CA3AF' }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Введите название лекарства..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: '#374151' }} />
          <span className="text-xs" style={{ color: '#9CA3AF' }}>или</span>
          <div className="flex-1 h-px" style={{ background: '#374151' }} />
        </div>

        <button className="w-full py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2"
          style={{ borderColor: '#534AB7', color: '#534AB7' }}>
          <span>📷</span> Сфотографировать упаковку
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs" style={{ color: '#9CA3AF' }}>Недавние:</span>
          {['Амоксициллин', 'Парацетамол'].map(d => (
            <button key={d} onClick={() => setQuery(d)}
              className="px-3 py-1 rounded-full text-xs border"
              style={{ borderColor: '#534AB7', color: '#534AB7' }}>{d}</button>
          ))}
        </div>

        {showResult && (
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#1E2235' }}>
            <div className="font-bold text-white text-lg">{drug.title}</div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: drug.tagColor, color: 'white' }}>{drug.tag}</span>
            <div className="space-y-1">
              {drug.sections.map(s => (
                <div key={s.key}>
                  <button onClick={() => setOpen(open === s.key ? null : s.key)}
                    className="w-full flex items-center justify-between py-2.5 border-b"
                    style={{ borderColor: '#374151' }}>
                    <span className="font-medium text-sm text-white">{s.title}</span>
                    <span style={{ color: '#9CA3AF' }}>{open === s.key ? '▲' : '▼'}</span>
                  </button>
                  {open === s.key && (
                    <div className="py-2 text-sm" style={{ color: s.amber ? '#EF9F27' : '#9CA3AF' }}>
                      {s.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => navigate(2)}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white mt-1"
              style={{ background: '#00B956' }}>
              Спросить врача об этом лекарстве →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen 12: My Consultations ─────────────────────────────────────────────

function Screen12({ navigate, goBack, onExit, ctx }) {
  const [cancelled, setCancelled] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const isSickLeave = ctx?.sickLeave === true  // F2.2 FIX

  const hasUpcoming = !cancelled

  return (
    <div className="pb-24">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Мои обращения" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">

        {/* F2.2 FIX — sick leave document block */}
        {isSickLeave && (
          <div className="rounded-2xl p-4 fade-in-up" style={{ background: 'linear-gradient(135deg,#0A1E3A,#0D2844)', border: '1.5px solid rgba(24,95,165,0.5)', boxShadow: '0 4px 20px rgba(24,95,165,0.15)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(24,95,165,0.2)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#60A5FA" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm tracking-tight">Листок нетрудоспособности</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: '#60A5FA' }}>ЭЛН № 2026-KZ-041892 · Оформляется</div>
              </div>
              <div className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: '#60A5FA', boxShadow: '0 0 8px rgba(96,165,250,0.7)' }} />
            </div>
            <div className="text-xs p-3 rounded-xl mb-3 leading-relaxed" style={{ background: 'rgba(24,95,165,0.12)', color: '#93C5FD' }}>
              Готов через 15–20 минут. Появится здесь и в разделе «Документы».
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#34D399" strokeWidth="2"/></svg>
              <span className="text-[11px] font-medium" style={{ color: '#34D399' }}>ЭЦП врача · принимается всеми работодателями РК · МСФО</span>
            </div>
          </div>
        )}

        {/* Profile row */}
        <div className="flex items-center gap-3 rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-card)' }}>
          <DoctorAvatar size={48} initials="АК" colors={['#185FA5','#534AB7']} />
          <div className="flex-1">
            <div className="font-semibold text-white tracking-tight">Карина</div>
            <div className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>{hasUpcoming ? '1 предстоящий' : '0 предстоящих'} · 1 завершена</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm" style={{ color: 'var(--green-500)' }}>980 ₸</div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>кешбэк</div>
          </div>
        </div>

        {/* Upcoming appointment */}
        {hasUpcoming && !confirmCancel && (
          <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(160deg, #0A2218, #051510)', border: '1.5px solid rgba(0,185,86,0.35)', boxShadow: '0 4px 20px rgba(0,185,86,0.1)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)' }}>● Предстоящий</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>через 2 дня 3 ч</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <DoctorAvatar size={48} initials="АС" online={true} />
              <div>
                <div className="font-bold text-white tracking-tight">Айгуль Сейткали</div>
                <div className="text-sm mt-0.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Терапевт · ★ 4.91</div>
              </div>
            </div>
            <div className="space-y-1.5 mb-3 p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.25)' }}>
              <div className="flex items-center gap-2 text-sm text-white font-medium">
                <span>📅</span> Ср 14 мая · 14:00–14:30
              </div>
              <div className="flex items-center gap-2 text-sm text-white font-medium">
                <span>📹</span> Видеоконсультация · онлайн
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-1" style={{ color: 'var(--green-400)' }}>
                <span>✓</span><span>Оплачено · FreedomPay ···· 4521 · 3 920 ₸</span>
              </div>
            </div>
            <button onClick={() => navigate(5)}
              className="btn-primary w-full py-3 rounded-xl font-bold text-sm text-white mb-2">
              Войти в консультацию →
            </button>
            <div className="flex gap-2">
              <button onClick={() => setConfirmCancel(true)}
                className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all active:scale-95"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)' }}>
                Отменить запись
              </button>
              <button className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all active:scale-95 flex items-center justify-center gap-1"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                Поддержка
              </button>
            </div>
          </div>
        )}

        {/* Cancel confirmation dialog */}
        {confirmCancel && (
          <div className="rounded-2xl p-5 fade-in-up" style={{ background: 'rgba(30,10,10,0.9)', border: '1.5px solid rgba(220,38,38,0.4)', boxShadow: '0 4px 24px rgba(220,38,38,0.15)' }}>
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚠️</div>
              <div className="font-bold text-white text-base tracking-tight">Отменить запись?</div>
              <div className="text-sm mt-1.5 font-medium" style={{ color: 'var(--text-secondary)' }}>Ср 14 мая · 14:00 · Айгуль Сейткали</div>
              {/* Clear refund guarantee — key lesson from feedback */}
              <div className="mt-3 p-3 rounded-xl text-left space-y-1.5" style={{ background: 'rgba(0,185,86,0.07)', border: '1px solid rgba(0,185,86,0.2)' }}>
                <div className="text-xs font-semibold" style={{ color: 'var(--green-500)' }}>🛡 Автоматический возврат</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  3 920 ₸ вернутся на вашу карту FreedomPay ···· 4521 <b className="text-white">автоматически в течение 5 минут</b>. Никаких звонков в клинику, никаких объяснений.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setConfirmCancel(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>
                Оставить
              </button>
              <button onClick={() => { setCancelled(true); setConfirmCancel(false) }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', boxShadow: '0 4px 16px rgba(220,38,38,0.35)' }}>
                Отменить · вернуть деньги
              </button>
            </div>
          </div>
        )}

        {/* Cancellation confirmed — positive framing, clear ownership */}
        {cancelled && (
          <div className="rounded-2xl p-4 fade-in-up" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,185,86,0.12)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#00B956" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="#00B956" strokeWidth="2"/></svg>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Запись отменена</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--green-500)' }}>Возврат 3 920 ₸ обрабатывается</div>
              </div>
            </div>
            <div className="text-xs leading-relaxed p-2.5 rounded-xl" style={{ background: 'rgba(0,185,86,0.06)', color: 'var(--text-secondary)' }}>
              Деньги вернутся на карту FreedomPay ···· 4521 автоматически. Мы возьмём это на себя — ничего делать не нужно.
            </div>
          </div>
        )}

        {/* Empty state — shown when no upcoming and no past */}
        {cancelled && (
          <div className="flex flex-col items-center py-10 gap-4 fade-in-up">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="10" width="36" height="32" rx="5" stroke="var(--text-muted)" strokeWidth="2.5" fill="none"/>
                <line x1="6" y1="20" x2="42" y2="20" stroke="var(--text-muted)" strokeWidth="2"/>
                <line x1="16" y1="6" x2="16" y2="14" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="32" y1="6" x2="32" y2="14" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="24" cy="32" r="7" stroke="var(--text-muted)" strokeWidth="2" fill="none"/>
                <line x1="21" y1="29" x2="27" y2="35" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
                <line x1="27" y1="29" x2="21" y2="35" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg tracking-tight">Нет предстоящих записей</div>
              <div className="text-sm mt-1.5 leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>Запишитесь к врачу прямо сейчас — онлайн, без очередей</div>
            </div>
            <button onClick={() => navigate(2)}
              className="btn-primary px-8 py-3 rounded-2xl font-bold text-sm text-white transition-all active:scale-95">
              Найти врача →
            </button>
          </div>
        )}

        {/* Past consultation */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-2.5 px-1" style={{ color: 'var(--text-muted)' }}>История</div>
          <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="flex items-center gap-3 mb-3">
              <DoctorAvatar size={44} initials="НА" colors={['#185FA5', '#534AB7']} />
              <div className="flex-1">
                <div className="font-bold text-white text-sm tracking-tight">Нурлан Абенов · Педиатр</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>8 апр 2026 · ОРВИ · 14 мин</div>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,185,86,0.12)', color: 'var(--green-400)' }}>✓ Завершено</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(6)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-all active:scale-95"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>
                Назначения →
              </button>
              {/* F4.1 FIX — repeat booking to same doctor with history context */}
              <button onClick={() => navigate(4, { doctor: DOCTOR_MAP['педиатр'], fromHistory: true })}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white btn-primary transition-all active:scale-95">
                Записаться снова
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => navigate(1)}
          className="btn-primary w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:scale-95">
          + Новое обращение
        </button>
      </div>
      <BottomNav current={12} navigate={navigate} />
    </div>
  )
}

// ─── Screen 13: Slot Picker ───────────────────────────────────────────────────

function Screen13({ navigate, goBack, onExit }) {
  const [day, setDay] = useState('today')
  const [time, setTime] = useState('14:00')
  const days = [
    { id: 'today', label: 'Сегодня',  dateLabel: 'Сегодня' },
    { id: 'wed',   label: 'Ср 14',    dateLabel: 'Среда, 14 мая' },
    { id: 'thu',   label: 'Чт 15',    dateLabel: 'Четверг, 15 мая' },
    { id: 'fri',   label: 'Пт 16',    dateLabel: 'Пятница, 16 мая' },
  ]
  const selectedDay = days.find(d => d.id === day)
  const slots = [
    { t: '09:00', busy: false }, { t: '10:00', busy: true },
    { t: '11:00', busy: false }, { t: '12:00', busy: false },
    { t: '14:00', busy: false }, { t: '15:00', busy: false },
    { t: '16:00', busy: false }, { t: '17:00', busy: true },
  ]
  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Выбрать время" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#1E2235' }}>
          <DoctorAvatar size={52} initials="АС" />
          <div>
            <div className="font-bold text-white">Айгуль Сейткали</div>
            <div className="text-sm" style={{ color: '#9CA3AF' }}>Терапевт · ★ 4.91</div>
          </div>
          <div className="ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: '#052E16', color: '#00B956', border: '1px solid #00B956' }}>
            📹 Онлайн
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-white mb-2">Выберите дату</div>
          <div className="horizontal-scroll">
            {days.map(d => (
              <button key={d.id} onClick={() => setDay(d.id)}
                className="px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-all"
                style={{ background: day === d.id ? '#00B956' : '#1E2235', color: day === d.id ? 'white' : '#9CA3AF' }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-white mb-2">Выберите время</div>
          <div className="grid grid-cols-2 gap-2">
            {slots.map(s => (
              <button key={s.t} onClick={() => !s.busy && setTime(s.t)} disabled={s.busy}
                className="py-3 rounded-xl text-sm font-medium border transition-all leading-tight"
                style={{
                  background: time === s.t && !s.busy ? '#052E16' : '#1E2235',
                  borderColor: time === s.t && !s.busy ? '#00B956' : '#374151',
                  color: s.busy ? '#374151' : time === s.t ? '#00B956' : 'white',
                }}>
                {s.t}{s.busy ? <><br/><span className="text-xs">занят</span></> : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ background: '#052E16', border: '1px solid #00B956' }}>
          <div className="font-semibold text-white">📅 {selectedDay.dateLabel} · {time} — {time.replace(':00', ':30')}</div>
          <div className="text-sm mt-1" style={{ color: '#9CA3AF' }}>Видеоконсультация · 30 минут</div>
          <div className="text-sm mt-1 text-white">4 900 ₸ → <span style={{ color: '#00B956' }}>3 920 ₸ кешбэком 20%</span></div>
        </div>

        <button onClick={() => navigate(4, { scheduled: true, date: selectedDay.dateLabel, time, doctor: { name: 'Айгуль Сейткали', spec: 'Терапевт', initials: 'АС' } })}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95"
          style={{ background: '#00B956' }}>
          Перейти к оплате →
        </button>
      </div>
    </div>
  )
}

// ─── Screen 14: Booked ────────────────────────────────────────────────────────

function Screen14({ navigate, goBack, onExit, ctx, navigateHome }) {
  const [reminder, setReminder] = useState(true)
  const [calAdded, setCalAdded] = useState(false)
  // F5.3 FIX — simulate doctor cancellation (in prod: pushed via WebSocket/push notification)
  const [doctorCancelled, setDoctorCancelled] = useState(false)
  const dateLabel = ctx?.date || 'Среда, 14 мая'
  const timeLabel = ctx?.time || '14:00'
  const paid = ctx?.paid === true
  const payMethod = ctx?.payMethod || 'freedom'
  return (
    <div className="pb-8">
      <FreedomShell onExit={onExit} />
      <InnerNav title={doctorCancelled ? 'Врач отменил запись' : 'Запись подтверждена'} goBack={goBack} />
      <div className="px-4 pt-6 space-y-4">

        {/* F5.3 — doctor cancelled state */}
        {doctorCancelled && (
          <div className="rounded-2xl p-4 fade-in-up" style={{ background: 'rgba(226,75,74,0.08)', border: '1.5px solid rgba(226,75,74,0.35)', boxShadow: '0 4px 20px rgba(226,75,74,0.1)' }}>
            <div className="font-bold text-white mb-1">Айгуль Сейткали отменила приём</div>
            <div className="text-sm mb-3 font-medium" style={{ color: 'var(--text-secondary)' }}>{dateLabel} · {timeLabel}</div>
            <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(0,185,86,0.08)', border: '1px solid rgba(0,185,86,0.2)' }}>
              <div className="text-xs font-semibold" style={{ color: 'var(--green-500)' }}>✓ Возврат {payMethod === 'osms' ? 'ОСМС' : '3 920 ₸'} — обрабатывается автоматически</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Ничего делать не нужно. Деньги вернутся в течение 5 минут.</div>
            </div>
            <button onClick={() => navigate(13)}
              className="btn-primary w-full py-3 rounded-xl font-bold text-sm text-white">
              Выбрать другое время → бесплатно
            </button>
          </div>
        )}

        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 glow-pulse"
            style={{ background: '#052E16', border: '3px solid #00B956' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect x="4" y="8" width="36" height="32" rx="4" stroke="#00B956" strokeWidth="2.5" fill="none"/>
              <line x1="4" y1="16" x2="40" y2="16" stroke="#00B956" strokeWidth="2"/>
              <line x1="14" y1="4" x2="14" y2="12" stroke="#00B956" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="30" y1="4" x2="30" y2="12" stroke="#00B956" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 26 L19 31 L30 22" stroke="#00B956" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="checkmark-anim"/>
            </svg>
          </div>
          <div className="font-bold text-2xl text-white">Вы записаны!</div>
          <div className="text-sm mt-1" style={{ color: '#00B956' }}>Начислено 980 ₸ бонусами Freedom</div>
        </div>

        <div className="rounded-2xl p-4" style={{ background: '#1E2235' }}>
          <div className="flex items-center gap-3 mb-3">
            <DoctorAvatar size={52} initials="АС" />
            <div className="font-bold text-white">Айгуль Сейткали · Терапевт</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2"><span className="flex-shrink-0">📅</span><span className="text-white">{dateLabel} · {timeLabel}–{timeLabel.replace(':00', ':30')}</span></div>
            <div className="flex items-center gap-2"><span className="flex-shrink-0">📹</span><span className="text-white">Видеоконсультация · онлайн</span></div>
            <div className="flex items-center gap-2"><span className="flex-shrink-0">⏱</span><span style={{ color: '#9CA3AF' }}>До приёма: 2 дня 3 часа</span></div>
          </div>
        </div>

        {/* Payment receipt — shown when paid via slot picker */}
        {paid && (
          <div className="rounded-2xl p-4 space-y-2.5" style={{ background: '#1E2235', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🧾</span>
              <span className="font-semibold text-white">Чек об оплате</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9CA3AF' }}>Способ оплаты</span>
              <span className="text-white font-medium text-right">
                {payMethod === 'freedom' ? 'FreedomPay ···· 4521' : payMethod === 'dms' ? 'ДМС' : 'ОСМС'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9CA3AF' }}>Консультация</span>
              <span className="text-white">4 900 ₸</span>
            </div>
            {payMethod !== 'osms' && (
              <div className="flex justify-between text-sm">
                <span style={{ color: '#9CA3AF' }}>Кешбэк 20%</span>
                <span style={{ color: '#00B956' }}>−980 ₸</span>
              </div>
            )}
            {payMethod === 'osms' && (
              <div className="flex justify-between text-sm">
                <span style={{ color: '#9CA3AF' }}>Покрытие ОСМС</span>
                <span style={{ color: '#00B956' }}>−4 900 ₸</span>
              </div>
            )}
            <div className="h-px" style={{ background: '#2A3040' }} />
            <div className="flex justify-between font-bold">
              <span className="text-white">Оплачено</span>
              <span style={{ color: payMethod === 'osms' ? '#00B956' : 'white' }}>
                {payMethod === 'osms' ? 'Бесплатно' : '3 920 ₸'}
              </span>
            </div>
            {payMethod !== 'osms' && (
              <div className="text-xs text-center py-1.5 rounded-lg" style={{ background: '#052E16', color: '#4ADE80' }}>
                ✓ 980 ₸ кешбэка начислено на Freedom
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: '#1E2235' }}>
          <div className="flex items-center gap-2">
            <span>🔔</span>
            <span className="text-white text-sm">Напомним за 15 минут</span>
          </div>
          <button onClick={() => setReminder(!reminder)}
            className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
            style={{ background: reminder ? '#00B956' : '#374151' }}>
            <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
              style={{ left: reminder ? '26px' : '2px' }} />
          </button>
        </div>

        <div className="rounded-2xl p-4 space-y-3" style={{ background: '#052E16' }}>
          {[
            'За 15 мин придёт пуш-уведомление',
            'Откройте Freedom → Цифровая клиника',
            'Мои обращения → Войти',
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: '#00B956' }}>{i + 1}</div>
              <span style={{ color: '#9CA3AF' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Guarantee — what happens if something goes wrong */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(0,185,86,0.06)', border: '1px solid rgba(0,185,86,0.2)' }}>
          <div className="flex items-center gap-2 mb-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.9 10.15 9 11.35C17.1 23.15 21 18.25 21 13V7L12 2z" stroke="#00B956" strokeWidth="2" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#00B956" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold text-white text-sm">Гарантия Цифровой клиники</span>
          </div>
          {[
            { icon: '↩️', text: 'Врач не подключился → автовозврат за 5 минут' },
            { icon: '🚫', text: 'Отмена за 2 ч и ранее → 100% возврат автоматически' },
            { icon: '💬', text: 'Любой вопрос → поддержка отвечает за 5 минут, не 50' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs mb-1.5">
              <span className="flex-shrink-0">{item.icon}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setCalAdded(true)}
          className="btn-primary w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95"
          style={calAdded ? { background: '#0F6E56' } : {}}>
          {calAdded ? '✓ Добавлено в календарь' : '📅 Добавить в календарь'}
        </button>

        {/* Quick support access */}
        <div className="flex gap-2">
          <button onClick={navigateHome}
            className="flex-1 py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
            На главную
          </button>
          <button className="flex-1 py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95 flex items-center justify-center gap-1.5"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            Поддержка
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 15: Profile ───────────────────────────────────────────────────────

function Screen15({ navigate, goBack, onExit }) {
  const stats = [
    { label: 'Консультаций', value: '3' },
    { label: 'Кешбэк', value: '2 940 ₸' },
    { label: 'ОСМС', value: '✓' },
  ]
  return (
    <div className="pb-24">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Профиль" goBack={goBack} />
      <div className="px-4 pt-4 space-y-4">
        <div className="flex flex-col items-center py-4 gap-3">
          <DoctorAvatar size={80} initials="АК" colors={['#185FA5', '#534AB7']} />
          <div className="text-center">
            <div className="font-bold text-xl text-white">Карина</div>
            <div className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>Алматы · 23 года</div>
          </div>
          <div className="flex gap-3 w-full">
            {stats.map((s, i) => (
              <div key={i} className="flex-1 rounded-xl py-3 px-2 text-center" style={{ background: '#1E2235' }}>
                <div className="font-bold text-white">{s.value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {[
          { icon: '🛡', label: 'ОСМС · Активен', sub: 'Гос. страховое покрытие', color: '#00B956' },
          { icon: '📋', label: 'Мои обращения', sub: '3 визита с апреля 2026', screen: 12 },
          { icon: '🔔', label: 'Уведомления', sub: 'Напоминания включены' },
          { icon: '🔒', label: 'Конфиденциальность', sub: 'Данные защищены Freedom' },
        ].map((item, i) => (
          <button key={i} onClick={() => item.screen && navigate(item.screen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
            style={{ background: '#1E2235' }}>
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <div className="font-medium text-white text-sm">{item.label}</div>
              <div className="text-xs mt-0.5" style={{ color: item.color || '#9CA3AF' }}>{item.sub}</div>
            </div>
            {item.screen && <span style={{ color: '#374151' }}>›</span>}
          </button>
        ))}
      </div>
      <BottomNav current={15} navigate={navigate} />
    </div>
  )
}

// ─── Screen 16: Freedom "Моё здоровье" shell ─────────────────────────────────

// SVG icons matching Freedom design
function FIcon({ type, size = 20 }) {
  const s = size
  if (type === 'notes') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="3" fill="#22C55E" opacity="0.2"/>
      <rect x="4" y="2" width="16" height="20" rx="3" stroke="#22C55E" strokeWidth="1.5"/>
      <line x1="8" y1="8" x2="16" y2="8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="16" y2="12" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="16" x2="13" y2="16" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
  if (type === 'shield') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#3B82F6" opacity="0.2"/>
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="#3B82F6" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  if (type === 'plus-sq') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0D9488"/>
      <line x1="12" y1="6" x2="12" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="6" y1="12" x2="18" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
  if (type === 'doc') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#D97706"/>
      <rect x="6" y="4" width="9" height="12" rx="1.5" fill="white" opacity="0.9"/>
      <rect x="9" y="10" width="9" height="10" rx="1.5" fill="white" opacity="0.7"/>
      <line x1="8" y1="8" x2="13" y2="8" stroke="#D97706" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="13" y2="11" stroke="#D97706" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
  if (type === 'ruler') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="20" height="4" rx="2" fill="#EC4899" opacity="0.3"/>
      <rect x="2" y="10" width="20" height="4" rx="2" stroke="#EC4899" strokeWidth="1.5"/>
      <line x1="6" y1="10" x2="6" y2="14" stroke="#EC4899" strokeWidth="1.5"/>
      <line x1="10" y1="10" x2="10" y2="13" stroke="#EC4899" strokeWidth="1"/>
      <line x1="14" y1="10" x2="14" y2="13" stroke="#EC4899" strokeWidth="1"/>
      <line x1="18" y1="10" x2="18" y2="14" stroke="#EC4899" strokeWidth="1.5"/>
    </svg>
  )
  if (type === 'scale') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="18" rx="7" ry="2" fill="#60A5FA" opacity="0.3"/>
      <ellipse cx="12" cy="18" rx="7" ry="2" stroke="#60A5FA" strokeWidth="1.5"/>
      <line x1="12" y1="18" x2="12" y2="10" stroke="#60A5FA" strokeWidth="1.5"/>
      <path d="M7 10 Q12 6 17 10" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="1.5" fill="#60A5FA"/>
    </svg>
  )
  if (type === 'blood') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3 C12 3 5 10 5 15 a7 7 0 0 0 14 0 C19 10 12 3 12 3z" fill="#EF4444" opacity="0.3"/>
      <path d="M12 3 C12 3 5 10 5 15 a7 7 0 0 0 14 0 C19 10 12 3 12 3z" stroke="#EF4444" strokeWidth="1.5"/>
    </svg>
  )
  if (type === 'ecg') return (
    <svg width={s} height={s} viewBox="0 0 60 30" fill="none">
      <path d="M0 15 L10 15 L14 5 L18 25 L22 10 L26 20 L30 15 L60 15" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return null
}

function Screen16({ navigate }) {
  const FBG    = '#0D0B18'
  const FCARD  = '#17132A'
  const FPURPLE = '#8B5CF6'
  const FGREEN  = '#10B981'

  const medicines = [
    { name: 'Урсосан 250 мг\n№50 капс.', price: '7 895 ₸', cashback: '6 316 ₸' },
    { name: 'Джес №28\nтабл.п.п.о.',     price: '5 840 ₸', cashback: '4 672 ₸', badge: '-6%' },
    { name: 'Ибупрофен\n400мг №50',      price: '890 ₸',   cashback: '712 ₸' },
  ]
  const doctors = [
    { spec: 'Терапевт',    count: '39 врачей', bg: '#0F2340' },
    { spec: 'Педиатр',     count: '38 врачей', bg: '#0D1F30' },
    { spec: 'Офталь­молог', count: '11 врачей', bg: '#1A0F35' },
  ]
  const articles = [
    { title: 'Почему сосудосуживающие капли со временем перестают работать', date: '20.04.2026', bg: '#1A1035' },
    { title: 'Почему при дефиците калорий организм «перестаёт худеть»',       date: '21.04.2026', bg: '#0F1A10' },
  ]

  return (
    <div style={{ background: FBG, minHeight: '100vh', paddingBottom: 80 }}>

      {/* ── Status bar ── */}
      <div className="flex justify-between items-center px-5 pt-3 pb-1 text-xs text-white font-semibold">
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>15:42</span>
        <div className="flex items-center gap-2">
          {/* signal */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
            <rect x="0"  y="7"  width="3" height="5" rx="0.5"/>
            <rect x="4"  y="5"  width="3" height="7" rx="0.5"/>
            <rect x="8"  y="3"  width="3" height="9" rx="0.5"/>
            <rect x="12" y="0"  width="3" height="12" rx="0.5"/>
          </svg>
          {/* wifi */}
          <svg width="16" height="12" viewBox="0 0 20 14" fill="none">
            <path d="M10 2.5C13.5 2.5 16.5 4 18.5 6.5L20 5C17.5 2 14 .5 10 .5S2.5 2 0 5l1.5 1.5C3.5 4 6.5 2.5 10 2.5Z" fill="white"/>
            <path d="M10 6c2.5 0 4.5 1 6 2.5L17.5 7C15.5 5.5 13 4.5 10 4.5S4.5 5.5 2.5 7L4 8.5C5.5 7 7.5 6 10 6Z" fill="white"/>
            <circle cx="10" cy="12" r="2" fill="white"/>
          </svg>
          {/* battery green */}
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-3 rounded border-2 border-white flex items-center px-0.5">
              <div className="h-1.5 rounded-sm" style={{ background: '#22C55E', width: '85%' }}/>
            </div>
            <svg width="3" height="5" viewBox="0 0 3 5"><rect width="3" height="5" rx="1" fill="white"/></svg>
          </div>
        </div>
      </div>

      {/* ── Top nav bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* back arrow — plain, no circle */}
        <button className="p-1 -ml-1">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M10 1L1 10L10 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* title center */}
        <div className="text-center">
          <div className="font-bold text-white" style={{ fontSize: 17, letterSpacing: '-0.3px' }}>Моё здоровье</div>
          <div className="flex items-center justify-center gap-1 text-xs font-medium" style={{ color: '#A78BFA', marginTop: 1 }}>
            г. Алматы
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* avatar with › badge */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full overflow-hidden" style={{ border: '2px solid rgba(139,92,246,0.6)', background: 'linear-gradient(145deg,#F97316,#EA580C)' }}>
            <svg viewBox="0 0 36 36" width="36" height="36">
              <rect width="36" height="36" fill="url(#bgGrad)"/>
              <ellipse cx="18" cy="17" rx="8" ry="9" fill="#FDDCB5"/>
              <path d="M10 16 Q10 8 18 7 Q26 8 26 16 Q26 12 18 11 Q10 12 10 16Z" fill="#1C0A00"/>
              <rect x="11" y="5" width="14" height="8" rx="2.5" fill="#B45309"/>
              <ellipse cx="18" cy="5" rx="6" ry="2.5" fill="#FCD34D"/>
              <ellipse cx="18" cy="18" rx="1.5" ry="1.2" fill="#E8966A"/>
              <ellipse cx="14" cy="19" rx="2" ry="1.5" fill="#1C0A00"/>
              <ellipse cx="22" cy="19" rx="2" ry="1.5" fill="#1C0A00"/>
              <path d="M16 23 Q18 25 20 23" stroke="#C2410C" strokeWidth="1" fill="none" strokeLinecap="round"/>
              <ellipse cx="18" cy="34" rx="12" ry="8" fill="#6D28D9"/>
            </svg>
          </div>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#2A2545', border: '1px solid rgba(255,255,255,0.15)' }}>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── HERO: purple profile zone ── */}
      <div style={{ background: 'linear-gradient(180deg, #3B1F7A 0%, #2D1669 40%, #1C0F4A 75%, #0D0B18 100%)', paddingTop: 12, paddingBottom: 28 }}>
        {/* large centered avatar */}
        <div className="flex flex-col items-center">
          <div style={{ width: 108, height: 108, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(167,139,250,0.6)', boxShadow: '0 0 40px rgba(139,92,246,0.5)', background: 'linear-gradient(145deg, #F97316 0%, #EA580C 40%, #C2410C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {/* 3D-style Kazakh girl illustration */}
            <svg viewBox="0 0 108 108" width="108" height="108">
              {/* bg gradient */}
              <defs>
                <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FDBA74"/>
                  <stop offset="100%" stopColor="#EA580C"/>
                </radialGradient>
                <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#FDDCB5"/>
                  <stop offset="100%" stopColor="#F5A97F"/>
                </radialGradient>
              </defs>
              <rect width="108" height="108" fill="url(#bgGrad)"/>
              {/* neck */}
              <rect x="45" y="68" width="18" height="16" rx="4" fill="#FDDCB5"/>
              {/* body / dress */}
              <ellipse cx="54" cy="102" rx="28" ry="18" fill="#7C3AED"/>
              <rect x="30" y="88" width="48" height="30" rx="8" fill="#6D28D9"/>
              {/* gold ornament on dress */}
              <path d="M40 90 Q54 84 68 90" stroke="#FCD34D" strokeWidth="1.5" fill="none"/>
              {/* head */}
              <ellipse cx="54" cy="52" rx="22" ry="24" fill="url(#skinGrad)"/>
              {/* hair */}
              <path d="M32 50 Q32 28 54 26 Q76 28 76 50 Q76 38 54 34 Q32 38 32 50Z" fill="#1C0A00"/>
              {/* traditional headdress — сәукеле */}
              <ellipse cx="54" cy="32" rx="22" ry="8" fill="#92400E"/>
              <rect x="38" y="18" width="32" height="16" rx="4" fill="#B45309"/>
              <ellipse cx="54" cy="18" rx="14" ry="5" fill="#FCD34D"/>
              {/* headdress feather/ornament */}
              <ellipse cx="54" cy="12" rx="5" ry="8" fill="#1C0A00"/>
              <ellipse cx="54" cy="11" rx="3" ry="6" fill="#6D28D9"/>
              <circle cx="54" cy="9" r="2.5" fill="#FCD34D"/>
              {/* side ornaments */}
              <circle cx="36" cy="28" r="3" fill="#FCD34D"/>
              <circle cx="72" cy="28" r="3" fill="#FCD34D"/>
              {/* braid left */}
              <path d="M33 58 Q28 70 30 82 Q32 88 35 86 Q32 74 35 62Z" fill="#1C0A00"/>
              {/* braid right */}
              <path d="M75 58 Q80 70 78 82 Q76 88 73 86 Q76 74 73 62Z" fill="#1C0A00"/>
              {/* eyes */}
              <ellipse cx="46" cy="56" rx="3.5" ry="3" fill="#1C0A00"/>
              <ellipse cx="62" cy="56" rx="3.5" ry="3" fill="#1C0A00"/>
              <circle cx="47" cy="55" r="1" fill="white"/>
              <circle cx="63" cy="55" r="1" fill="white"/>
              {/* eyebrows */}
              <path d="M42 50 Q46 48 50 50" stroke="#1C0A00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M58 50 Q62 48 66 50" stroke="#1C0A00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* nose */}
              <ellipse cx="54" cy="62" rx="2" ry="1.5" fill="#E8966A"/>
              {/* smile */}
              <path d="M49 68 Q54 73 59 68" stroke="#C2410C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* cheeks blush */}
              <ellipse cx="41" cy="63" rx="5" ry="3" fill="#F97316" opacity="0.35"/>
              <ellipse cx="67" cy="63" rx="5" ry="3" fill="#F97316" opacity="0.35"/>
              {/* necklace */}
              <path d="M42 80 Q54 86 66 80" stroke="#FCD34D" strokeWidth="1.5" fill="none"/>
              <circle cx="54" cy="83" r="2" fill="#FCD34D"/>
            </svg>
          </div>

          {/* name */}
          <div className="flex items-center gap-2 mt-4">
            <span className="font-bold text-white" style={{ fontSize: 26, letterSpacing: '-0.5px' }}>Карина</span>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M2 2l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* ID pill */}
          <div className="mt-2 px-5 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.35)' }}>
            <span className="text-white font-medium" style={{ fontSize: 14 }}>021128000033 · 23 года</span>
          </div>

          {/* two mini cards */}
          <div className="flex gap-3 mt-5 px-4 w-full">
            {/* Мои записи */}
            <div className="flex-1 rounded-2xl p-3.5" style={{ background: 'rgba(20,14,45,0.75)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                {/* Roadmap / map pin icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#10B981" opacity="0.9"/>
                  <circle cx="12" cy="9" r="2.5" fill="white"/>
                </svg>
                <span className="font-semibold text-sm" style={{ color: '#10B981' }}>Мои записи</span>
              </div>
              <div className="font-medium" style={{ color: '#6B7280', fontSize: 13 }}>Нет записей</div>
            </div>

            {/* Статус ОСМС */}
            <div className="flex-1 rounded-2xl p-3.5" style={{ background: 'rgba(20,14,45,0.75)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                {/* blue verified badge */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#3B82F6"/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-sm" style={{ color: '#60A5FA' }}>Статус ОСМС</span>
              </div>
              <div className="flex items-center gap-1 font-semibold" style={{ color: '#60A5FA', fontSize: 13 }}>
                Проверить
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3 mt-3">

        {/* ── Цифровая клиника hero banner ── */}
        <button onClick={() => navigate(0)} className="w-full rounded-2xl overflow-hidden text-left transition-all active:scale-[0.98] relative"
          style={{ background: 'linear-gradient(135deg, #011a0d, #022c18, #043d22)', border: '1.5px solid #00B956' }}>
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00B956, transparent)' }}/>
          <div className="p-4 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img src="/icon.png" alt="Цифровая клиника" style={{ width: 64, height: 64, borderRadius: 16, boxShadow: '0 0 20px rgba(0,185,86,0.4)' }}/>
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                style={{ background: '#00B956', color: 'white' }}>
                <span className="w-1 h-1 rounded-full bg-white"/>12
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-base leading-tight">Цифровая клиника</div>
              <div className="text-xs mt-0.5" style={{ color: '#4ADE80' }}>EmAI · онлайн консультации</div>
              <div className="text-xs mt-1.5" style={{ color: '#6B7280' }}>Врач за 2 минуты · от 3 920 ₸</div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,185,86,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#00B956" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </button>

        {/* ── Services grid: big left + 2 small right ── */}
        <div className="rounded-2xl overflow-hidden flex gap-2" style={{ height: 168 }}>

          {/* LEFT — Запись на приём */}
          <div className="flex-[1.1] relative rounded-2xl overflow-hidden flex flex-col justify-between p-3"
            style={{ background: 'linear-gradient(160deg, #0B2240 0%, #0A1830 100%)' }}>
            {/* text top */}
            <div>
              <div className="font-bold text-white leading-tight" style={{ fontSize: 15 }}>Запись на приём</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: '#64748B' }}>В клинику</div>
            </div>
            {/* 3D heart + stethoscope illustration */}
            <div className="absolute bottom-0 right-0">
              <svg viewBox="0 0 110 100" width="110" height="100">
                {/* stethoscope tube */}
                <path d="M20 30 Q15 55 25 72 Q35 88 55 88 Q75 88 82 72" stroke="#4ADE80" strokeWidth="5" fill="none" strokeLinecap="round"/>
                {/* stethoscope head */}
                <circle cx="20" cy="26" r="9" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="1.5"/>
                <circle cx="20" cy="26" r="5" fill="#475569"/>
                {/* heart body */}
                <path d="M55 78 C55 78 30 62 30 46 C30 38 36 33 43 33 C47 33 51 35 55 39 C59 35 63 33 67 33 C74 33 80 38 80 46 C80 62 55 78 55 78Z" fill="#F472B6"/>
                {/* heart shine */}
                <path d="M43 36 Q46 34 49 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                {/* ECG line on heart */}
                <path d="M36 50 L42 50 L45 42 L49 58 L53 44 L57 56 L60 50 L74 50" stroke="#C084FC" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-2 flex-1">

            {/* Аптека */}
            <div className="flex-1 rounded-2xl flex items-center justify-between px-3"
              style={{ background: 'linear-gradient(135deg, #0E2A3A 0%, #0A1F2E 100%)' }}>
              <span className="font-semibold text-white" style={{ fontSize: 14 }}>Аптека</span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)', boxShadow: '0 4px 12px rgba(14,165,233,0.35)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Справки */}
            <div className="flex-1 rounded-2xl flex items-center justify-between px-3"
              style={{ background: 'linear-gradient(135deg, #2D1A06 0%, #1C1005 100%)' }}>
              <span className="font-semibold text-white" style={{ fontSize: 14 }}>Справки</span>
              {/* folder icon */}
              <svg viewBox="0 0 48 44" width="44" height="44">
                {/* folder back */}
                <rect x="2" y="12" width="44" height="28" rx="5" fill="#D97706"/>
                {/* folder tab */}
                <path d="M2 12 L2 8 Q2 6 4 6 L18 6 Q21 6 22 9 L24 12Z" fill="#F59E0B"/>
                {/* folder front shadow */}
                <rect x="2" y="18" width="44" height="22" rx="5" fill="#F59E0B"/>
                {/* paper 1 */}
                <rect x="10" y="8" width="22" height="28" rx="3" fill="white" opacity="0.95"/>
                {/* paper 2 (behind) */}
                <rect x="14" y="6" width="22" height="28" rx="3" fill="#F1F5F9" opacity="0.85"/>
                {/* lines on paper */}
                <rect x="13" y="16" width="14" height="2" rx="1" fill="#94A3B8" opacity="0.6"/>
                <rect x="13" y="21" width="10" height="2" rx="1" fill="#94A3B8" opacity="0.6"/>
              </svg>
            </div>

          </div>
        </div>

        {/* ── Показатели здоровья ── */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-semibold text-white" style={{ fontSize: 16 }}>Показатели здоровья</span>
            <span className="font-semibold text-sm" style={{ color: FGREEN }}>Все</span>
          </div>
          <div className="flex gap-2.5">
            {/* Рост — pink ruler */}
            <div className="flex-1 rounded-2xl p-3" style={{ background: FCARD }}>
              <div className="flex items-center gap-1.5 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="9" width="20" height="6" rx="2" stroke="#C084FC" strokeWidth="1.8" transform="rotate(-45 12 12)" />
                  <path d="M5 17l2-2M8 14l1-1M11 11l1-1M14 8l1-1" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-sm" style={{ color: '#C084FC' }}>Рост</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Указать</span>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M1 1l5.5 5.5L1 12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            {/* Вес — blue scale */}
            <div className="flex-1 rounded-2xl p-3" style={{ background: FCARD }}>
              <div className="flex items-center gap-1.5 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="14" rx="3" stroke="#60A5FA" strokeWidth="1.8"/>
                  <path d="M3 10h18" stroke="#60A5FA" strokeWidth="1.5"/>
                  <path d="M9 6V4M15 6V4" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-sm" style={{ color: '#60A5FA' }}>Вес</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Указать</span>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M1 1l5.5 5.5L1 12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            {/* Группа крови — red drop */}
            <div className="flex-1 rounded-2xl p-3" style={{ background: FCARD }}>
              <div className="flex items-center gap-1.5 mb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C12 3 5 10 5 15a7 7 0 0014 0C19 10 12 3 12 3Z" stroke="#F87171" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold text-[11px] leading-tight" style={{ color: '#F87171' }}>Группа крови</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">Указать</span>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M1 1l5.5 5.5L1 12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Страхование banner — real image ── */}
        <div className="rounded-2xl overflow-hidden" style={{ height: 140, position: 'relative' }}>
          <img src="/img-insurance.jpg" alt="Страхование" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center' }}/>
          {/* slight gradient overlay for legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(60,20,120,0.55) 0%, rgba(60,20,120,0.15) 100%)' }}/>
          <div className="absolute bottom-0 left-0 p-4">
            <button className="px-5 py-2 rounded-full font-semibold text-white text-sm"
              style={{ background: 'rgba(139,92,246,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(167,139,250,0.4)' }}>
              Оформить
            </button>
          </div>
        </div>

        {/* ── Аптека ── */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-semibold text-white" style={{ fontSize: 16 }}>Аптека</span>
            <span className="font-semibold text-sm" style={{ color: FGREEN }}>Все</span>
          </div>
          <div className="horizontal-scroll gap-3">
            {medicines.map((m, i) => (
              <div key={i} className="rounded-2xl flex-shrink-0 overflow-hidden relative" style={{ background: 'white', width: 148 }}>
                {m.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-bold text-white z-10" style={{ background: '#1F2937' }}>{m.badge}</div>
                )}
                <div className="w-full h-[100px] flex items-center justify-center" style={{ background: '#F5F5F5' }}>
                  <svg viewBox="0 0 90 70" width="90" height="70">
                    <rect x="8" y="8" width="74" height="54" rx="6" fill="white"/>
                    <rect x="12" y="12" width="66" height="46" rx="4" fill={i===0?'#FEF3C7':i===1?'#DBEAFE':'#FCE7F3'}/>
                    <text x="45" y="42" textAnchor="middle" fontSize="10" fill="#1F2937" fontFamily="Arial" fontWeight="700">
                      {i===0?'УРСОСАН':i===1?'ДЖЕ С':'ИБУПРОФЕН'}
                    </text>
                  </svg>
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-medium leading-tight whitespace-pre-line" style={{ color: '#111827' }}>{m.name}</div>
                  <div className="mt-2">
                    <div className="font-bold text-sm px-2 py-1 rounded-lg inline-block" style={{ background: '#111827', color: 'white' }}>{m.price} ₸</div>
                  </div>
                  <div className="mt-1.5 text-xs font-semibold px-2 py-1 rounded-lg inline-block" style={{ background: '#0D2E1A', color: '#10B981' }}>{m.cashback} ₸ с кешбэком</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Врачи ── */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-semibold text-white" style={{ fontSize: 16 }}>Врачи</span>
            <span className="font-semibold text-sm" style={{ color: FGREEN }}>Все</span>
          </div>
          <div className="horizontal-scroll gap-2.5">
            {doctors.map((d, i) => (
              <div key={i} className="rounded-2xl flex-shrink-0 overflow-hidden" style={{ background: FCARD, width: 120 }}>
                {/* doctor silhouette placeholder */}
                <div className="w-full flex items-end justify-center" style={{ background: d.bg, height: 96 }}>
                  <svg viewBox="0 0 60 70" width="60" height="70">
                    <ellipse cx="30" cy="22" rx="14" ry="16" fill={i===0?'#F9A8D4':i===1?'#FDE68A':'#C4B5FD'}/>
                    <rect x="8" y="40" width="44" height="30" rx="8" fill={i===0?'#2563EB':i===1?'#059669':'#7C3AED'}/>
                    <rect x="19" y="37" width="22" height="10" rx="4" fill={i===0?'#FBCFE8':i===1?'#FEF08A':'#DDD6FE'}/>
                  </svg>
                </div>
                <div className="px-2 py-2 text-center">
                  <div className="text-xs font-semibold text-white leading-tight">{d.spec}</div>
                  <div className="text-[10px] mt-0.5 font-medium" style={{ color: '#A78BFA' }}>{d.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Почитать о здоровье ── */}
        <div className="pb-2">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-semibold text-white" style={{ fontSize: 16 }}>Почитать о здоровье</span>
            <span className="font-semibold text-sm" style={{ color: FGREEN }}>Все</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {articles.map((a, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: FCARD }}>
                <div style={{ height: 96, background: a.bg, position: 'relative', overflow: 'hidden' }}>
                  {/* placeholder illustration */}
                  <svg viewBox="0 0 160 96" width="100%" height="96" style={{ position: 'absolute', inset: 0 }}>
                    {i===0
                      ? <><circle cx="50" cy="48" r="28" fill="#4C1D95" opacity="0.5"/><ellipse cx="52" cy="40" rx="14" ry="16" fill="#C4B5FD" opacity="0.8"/><circle cx="110" cy="45" r="22" fill="#1E3A5F" opacity="0.6"/><path d="M95 45 Q110 30 125 45 Q110 60 95 45z" fill="#93C5FD" opacity="0.9"/></>
                      : <><circle cx="80" cy="55" r="36" fill="#166534" opacity="0.4"/><ellipse cx="80" cy="36" rx="22" ry="28" fill="#86EFAC" opacity="0.65"/></>
                    }
                  </svg>
                </div>
                <div className="p-2.5">
                  <div className="text-xs text-white leading-snug font-medium">{a.title}</div>
                  <div className="text-[10px] mt-1.5 font-medium" style={{ color: '#6B7280' }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Freedom bottom nav ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] flex z-20"
        style={{ background: FBG, borderTop: '1px solid rgba(139,92,246,0.2)' }}>
        {[
          { label: 'Главная',  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 4l9 8v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 21v-9h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
          { label: 'Здоровье', active: true, svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21s-8-5.5-8-11.5C4 7 6 5 8.5 5c1.5 0 3 .8 3.5 2C12.5 5.8 14 5 15.5 5 18 5 20 7 20 9.5 20 15.5 12 21 12 21z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg> },
          { label: 'Карта',    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 20L3 17V4l6 3M9 20l6-3M9 20V7M15 17l6 3V7l-6-3M15 17V4M9 7l6-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: 'Сервисы',  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/></svg> },
          { label: 'Профиль',  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
        ].map((t, i) => (
          <button key={i} className="flex-1 flex flex-col items-center py-2.5 gap-0.5"
            style={{ color: t.active ? '#A78BFA' : '#4B5563' }}>
            {t.svg}
            <span className="text-[10px] font-medium">{t.label}</span>
            {t.active && <div className="w-4 h-0.5 rounded-full mt-0.5" style={{ background: '#A78BFA' }}/>}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Screen 17: История обращений ────────────────────────────────────────────

const CONSULTATIONS = [
  {
    id: 'consult-1',
    date: '2024-05-20 14:30',
    doctor: 'Айгуль Сейткали',
    specialty: 'Терапевт',
    complaint: 'Боль в горле',
    diagnosis: 'ОРВИ, фарингит',
    status: 'completed',
    messages: [
      { role: 'patient', text: 'Добрый день, беспокоит боль в горле уже 3 дня', time: '14:00' },
      { role: 'doctor', text: 'Здравствуйте! Когда началось? Есть температура?', time: '14:02' },
      { role: 'patient', text: 'С понедельника. Температура была до 37.5, вчера прошла', time: '14:03' },
      { role: 'doctor', text: 'Понял. Похоже на вирусное воспаление. Назначу противовоспалительное', time: '14:05' },
      { role: 'patient', text: 'Спасибо! Сколько дней лечиться?', time: '14:06' },
      { role: 'doctor', text: 'Обычно 7-10 дней. Следите за состоянием, если хуже - звоните', time: '14:07' },
    ],
    conclusion: {
      diagnosis: 'ОРВИ, острый фарингит',
      recommendations: ['Постельный режим', 'Теплое питье (чай, молоко)', 'Полоскание горла', 'Избегать холодного'],
      medications: ['Амоксициллин 500мг 3x в день (7 дней)', 'Спрей для горла Каметон 4x в день'],
      followUp: '7 дней. Если не улучшится - повторная консультация'
    }
  },
  {
    id: 'consult-2',
    date: '2024-05-10 10:15',
    doctor: 'Нурлан Абенов',
    specialty: 'Педиатр',
    complaint: 'Плановый осмотр',
    diagnosis: 'Здоров',
    status: 'completed',
    messages: [
      { role: 'doctor', text: 'Привет Карина! Как дела? Как себя чувствуешь?', time: '10:00' },
      { role: 'patient', text: 'Хорошо! Но немного устаю в конце дня', time: '10:01' },
      { role: 'doctor', text: 'Это нормально в твоём возрасте. Спи достаточно?', time: '10:02' },
      { role: 'patient', text: 'Примерно 7 часов в день', time: '10:03' },
      { role: 'doctor', text: 'Хорошо. Всё хорошо. Давление в норме, анализы отличные. Продолжай так же', time: '10:05' },
    ],
    conclusion: {
      diagnosis: 'Здоров. Общее состояние: отличное',
      recommendations: ['Продолжить текущий образ жизни', 'Спорт 3-4 раза в неделю', 'Сбалансированное питание'],
      medications: [],
      followUp: 'Плановый осмотр через 6 месяцев'
    }
  },
  {
    id: 'consult-3',
    date: '2024-04-28 16:45',
    doctor: 'Мадина Кажибекова',
    specialty: 'Кардиолог',
    complaint: 'Тахикардия, сердцебиение',
    diagnosis: 'Синусовая тахикардия. Стресс-зависимая',
    status: 'completed',
    messages: [
      { role: 'patient', text: 'Добрый день. Последние дни часто чувствую учащённое сердцебиение', time: '16:30' },
      { role: 'doctor', text: 'Добрый день. Когда это началось? При физической нагрузке или в покое?', time: '16:32' },
      { role: 'patient', text: 'Даже в покое. Может быть из-за стресса на работе?', time: '16:34' },
      { role: 'doctor', text: 'Вполне возможно. Давайте ЭКГ сделаем чтобы исключить аритмию', time: '16:36' },
      { role: 'patient', text: 'Хорошо, сейчас?', time: '16:37' },
      { role: 'doctor', text: 'Да, минутку. *ЭКГ в норме* Отлично! Только стресс. Релаксируй, медитация помогает', time: '16:40' },
    ],
    conclusion: {
      diagnosis: 'Синусовая тахикардия стресс-зависимая. Аритмии нет',
      recommendations: ['Снизить стресс', 'Медитация/йога 15-20 мин в день', 'Ограничить кофе', 'Спорт для расслабления'],
      medications: ['Валериана если приступы - по 1 таб вечером'],
      followUp: 'ЭКГ повторить через месяц'
    }
  },
]

function Screen17({ navigate, goBack, onExit }) {
  const [tab, setTab] = useState('consultations') // 'consultations' or 'prescriptions'

  return (
    <div className="pb-24">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Мои записи" sub={`${CONSULTATIONS.length} записей`} goBack={goBack} />

      {/* Tab switcher */}
      <div className="sticky top-14 z-10 px-4 pt-3 pb-2 flex gap-2" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
        <button onClick={() => setTab('consultations')}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: tab === 'consultations' ? 'rgba(0,185,86,0.15)' : 'rgba(100,116,139,0.1)',
            color: tab === 'consultations' ? 'var(--green-500)' : 'var(--text-secondary)',
            border: tab === 'consultations' ? '1px solid rgba(0,185,86,0.3)' : '1px solid rgba(100,116,139,0.2)'
          }}>
          📋 Обращения
        </button>
        <button onClick={() => setTab('prescriptions')}
          className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: tab === 'prescriptions' ? 'rgba(0,185,86,0.15)' : 'rgba(100,116,139,0.1)',
            color: tab === 'prescriptions' ? 'var(--green-500)' : 'var(--text-secondary)',
            border: tab === 'prescriptions' ? '1px solid rgba(0,185,86,0.3)' : '1px solid rgba(100,116,139,0.2)'
          }}>
          📄 Выписки
        </button>
      </div>

      <div className="px-4 pt-4 space-y-3">

        {/* CONSULTATIONS TAB */}
        {tab === 'consultations' && CONSULTATIONS.map((c, i) => (
          <button key={c.id} onClick={() => navigate(18, { consultationId: c.id })}
            className="w-full rounded-2xl p-4 text-left transition-all active:scale-95 card-up"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', animationDelay: `${i * 0.05}s` }}>

            <div className="flex items-start gap-3">
              {/* Doctor avatar */}
              <div className="w-12 h-12 rounded-full flex-shrink-0" style={{
                background: 'linear-gradient(135deg, #185FA5, #534AB7)',
                border: '2px solid rgba(0,185,86,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 'bold', color: 'white'
              }}>
                {c.doctor.split(' ').map(w => w[0]).join('')}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="font-bold text-white text-sm">{c.doctor}</div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)' }}>
                    ✓ {c.status === 'completed' ? 'Завершено' : 'Ожидание'}
                  </span>
                </div>

                <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {c.specialty} • {c.date}
                </div>

                <div className="text-sm text-white mb-1.5 leading-tight">
                  <span style={{ color: 'var(--text-secondary)' }}>Диагноз:</span> {c.diagnosis}
                </div>

                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {c.complaint}
                </div>
              </div>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}

        {/* PRESCRIPTIONS TAB */}
        {tab === 'prescriptions' && CONSULTATIONS.filter(c => c.conclusion.medications.length > 0).map((c, i) => (
          <button key={c.id} onClick={() => navigate(18, { consultationId: c.id })}
            className="w-full rounded-2xl p-4 text-left transition-all active:scale-95 card-up"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', animationDelay: `${i * 0.05}s` }}>

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.1))',
                border: '1px solid rgba(59,130,246,0.3)'
              }}>
                <span style={{ fontSize: 18 }}>📄</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm mb-1">{c.conclusion.diagnosis}</div>
                <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {c.doctor} • {c.date}
                </div>

                {/* Medications list */}
                <div className="space-y-1 mb-3">
                  {c.conclusion.medications.slice(0, 2).map((med, mi) => (
                    <div key={mi} className="text-xs" style={{ color: '#60A5FA' }}>
                      💊 {med.length > 50 ? med.substring(0, 50) + '...' : med}
                    </div>
                  ))}
                  {c.conclusion.medications.length > 2 && (
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      +{c.conclusion.medications.length - 2} ещё
                    </div>
                  )}
                </div>

                {/* Quick action buttons */}
                <div className="flex gap-2">
                  <button onClick={(e) => {
                    e.stopPropagation()
                    const firstMed = c.conclusion.medications[0]
                    const drugName = firstMed.split(' ')[0]
                    navigate(11, { query: drugName, fromConsultation: true, medications: c.conclusion.medications })
                  }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)', border: '1px solid rgba(0,185,86,0.2)' }}>
                    🏥 Аптека
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation()
                    const lines = [
                      '═══════════════════════════════════════════════════',
                      'ЗАКЛЮЧЕНИЕ И ВЫПИСКА КОНСУЛЬТАЦИИ',
                      '═══════════════════════════════════════════════════',
                      '',
                      `Дата обращения: ${c.date}`,
                      `Врач: ${c.doctor}`,
                      `Специальность: ${c.specialty}`,
                      '',
                      '─────────────────────────────────────────────────',
                      'ДИАГНОЗ',
                      '─────────────────────────────────────────────────',
                      c.conclusion.diagnosis,
                      '',
                      '─────────────────────────────────────────────────',
                      'РЕКОМЕНДАЦИИ',
                      '─────────────────────────────────────────────────',
                      c.conclusion.recommendations.map(r => `• ${r}`).join('\n'),
                      '',
                      '─────────────────────────────────────────────────',
                      'НАЗНАЧЕННЫЕ ЛЕКАРСТВА',
                      '─────────────────────────────────────────────────',
                      c.conclusion.medications.map(m => `💊 ${m}`).join('\n'),
                      '',
                      '─────────────────────────────────────────────────',
                      'КОНТРОЛЬ',
                      '─────────────────────────────────────────────────',
                      c.conclusion.followUp,
                      '',
                      '═══════════════════════════════════════════════════',
                      `Выписано: ${new Date().toLocaleString('ru-KZ')}`,
                      '═══════════════════════════════════════════════════'
                    ]
                    const text = lines.join('\n')
                    const element = document.createElement('a')
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
                    element.setAttribute('download', `vypiska_${c.id}_${new Date().toISOString().split('T')[0]}.txt`)
                    element.style.display = 'none'
                    document.body.appendChild(element)
                    element.click()
                    document.body.removeChild(element)
                  }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    style={{ background: 'rgba(100,116,139,0.15)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.2)' }}>
                    ⬇ Скачать
                  </button>
                </div>
              </div>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}

        {/* Empty state for prescriptions */}
        {tab === 'prescriptions' && CONSULTATIONS.filter(c => c.conclusion.medications.length > 0).length === 0 && (
          <div className="text-center py-12">
            <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
            <div className="text-white font-semibold mb-1">Нет выписок</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Выписки появятся после консультаций с назначениями</div>
          </div>
        )}

      </div>
      <BottomNav current={12} navigate={navigate} />
    </div>
  )
}

// ─── Screen 18: Детали обращения ──────────────────────────────────────────────

function Screen18({ navigate, goBack, onExit, ctx }) {
  const consultation = CONSULTATIONS.find(c => c.id === ctx?.consultationId)
  if (!consultation) return <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>Консультация не найдена</div>

  const [showConclusion, setShowConclusion] = useState(false)

  // Handle "Show in Pharmacy" — navigate to drug analysis with first medication
  const handleShowInPharmacy = () => {
    if (consultation.conclusion.medications.length > 0) {
      const firstMed = consultation.conclusion.medications[0]
      // Extract drug name (e.g., "Амоксициллин" from "Амоксициллин 500мг 3x в день (7 дней)")
      const drugName = firstMed.split(' ')[0]
      navigate(11, { query: drugName, fromConsultation: true, medications: consultation.conclusion.medications })
    }
  }

  // Handle PDF download — generate simple text-based document
  const handleDownloadPDF = () => {
    const lines = [
      '═══════════════════════════════════════════════════',
      'ЗАКЛЮЧЕНИЕ И ВЫПИСКА КОНСУЛЬТАЦИИ',
      '═══════════════════════════════════════════════════',
      '',
      `Дата обращения: ${consultation.date}`,
      `Врач: ${consultation.doctor}`,
      `Специальность: ${consultation.specialty}`,
      '',
      '─────────────────────────────────────────────────',
      'ЖАЛОБА И ДИАГНОЗ',
      '─────────────────────────────────────────────────',
      `Жалоба пациента: ${consultation.complaint}`,
      `Диагноз: ${consultation.conclusion.diagnosis}`,
      '',
      '─────────────────────────────────────────────────',
      'РЕКОМЕНДАЦИИ',
      '─────────────────────────────────────────────────',
      consultation.conclusion.recommendations.map(r => `• ${r}`).join('\n'),
      '',
    ]

    if (consultation.conclusion.medications.length > 0) {
      lines.push('─────────────────────────────────────────────────')
      lines.push('НАЗНАЧЕННЫЕ ЛЕКАРСТВА')
      lines.push('─────────────────────────────────────────────────')
      consultation.conclusion.medications.forEach(med => {
        lines.push(`💊 ${med}`)
      })
      lines.push('')
    }

    lines.push('─────────────────────────────────────────────────')
    lines.push('ДАЛЬНЕЙШЕЕ НАБЛЮДЕНИЕ')
    lines.push('─────────────────────────────────────────────────')
    lines.push(consultation.conclusion.followUp)
    lines.push('')
    lines.push('═══════════════════════════════════════════════════')
    lines.push(`Выписано: ${new Date().toLocaleString('ru-KZ')}`)
    lines.push('═══════════════════════════════════════════════════')

    const text = lines.join('\n')
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', `konsultation_${consultation.id}_${new Date().toISOString().split('T')[0]}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pb-24">
      <FreedomShell onExit={onExit} />
      <InnerNav title="Обращение" sub={consultation.date} goBack={goBack} />

      <div className="px-4 pt-4 space-y-4">

        {/* Doctor info */}
        <div className="rounded-2xl p-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full flex-shrink-0" style={{
              background: 'linear-gradient(135deg, #185FA5, #534AB7)',
              border: '2.5px solid rgba(0,185,86,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 'bold', color: 'white'
            }}>
              {consultation.doctor.split(' ').map(w => w[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white">{consultation.doctor}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{consultation.specialty}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--green-500)' }}>★ 4.91 • Стаж 12 лет</div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Диагноз</div>
            <div className="font-semibold text-white text-sm">{consultation.diagnosis}</div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Диалог консультации
          </div>
          {consultation.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'patient' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'patient'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
                <div className="text-[10px] mt-1 opacity-70">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion section */}
        <div>
          <button onClick={() => setShowConclusion(!showConclusion)}
            className="w-full rounded-2xl p-4 text-left transition-all"
            style={{ background: 'linear-gradient(135deg, rgba(0,185,86,0.1), rgba(0,185,86,0.05))', border: '1px solid rgba(0,185,86,0.2)' }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-bold text-white text-sm">Заключение и рекомендации</div>
                <div className="text-xs mt-1" style={{ color: 'var(--green-500)' }}>Нажми чтобы раскрыть</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{
                color: 'var(--green-500)',
                transform: showConclusion ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
              }}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {showConclusion && (
            <div className="rounded-2xl p-4 mt-2 space-y-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>

              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Диагноз</div>
                <div className="text-sm text-white">{consultation.conclusion.diagnosis}</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Рекомендации</div>
                <div className="space-y-1">
                  {consultation.conclusion.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: 'var(--green-500)' }}>✓</span>
                      <span className="text-white">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {consultation.conclusion.medications.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Назначенные лекарства</div>
                  <div className="space-y-1">
                    {consultation.conclusion.medications.map((med, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span style={{ color: '#60A5FA' }}>💊</span>
                        <span className="text-white">{med}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Контроль</div>
                <div className="text-sm text-white">{consultation.conclusion.followUp}</div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button onClick={handleShowInPharmacy}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{ background: 'rgba(0,185,86,0.15)', color: 'var(--green-500)', border: '1px solid rgba(0,185,86,0.3)' }}>
                  📱 Показать в аптеке
                </button>
                <button onClick={handleDownloadPDF}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{ background: 'rgba(100,116,139,0.15)', color: '#94A3B8', border: '1px solid rgba(100,116,139,0.3)' }}>
                  📄 Скачать
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      <BottomNav current={12} navigate={navigate} />
    </div>
  )
}

// ─── Healthcare Screen (Premium Dark Design) ─────────────────────────────────

function HealthcareScreen({ navigate, goBack, onExit, ctx, version, setVersion }) {
  const [selectedTriage, setSelectedTriage] = useState(null)

  const triageItems = [
    { id: 'temp', label: 'Температура' },
    { id: 'throat', label: 'Горло / нос' },
    { id: 'belly', label: 'Живот' },
    { id: 'pressure', label: 'Давление' },
    { id: 'child', label: 'Здоровье ребёнка' },
    { id: 'other', label: 'Другое' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#071015' }}>
      <FreedomShell onExit={onExit} onSupportClick={() => {}} version={version} setVersion={setVersion} />
      <CompactProfileBar />

      <div className="px-5 pt-6 pb-24 space-y-5">
        {/* AI Triage Card */}
        <div className="rounded-3xl p-6 space-y-4" style={{ background: 'linear-gradient(135deg, #0B1518 0%, #10231D 100%)', border: '1px solid rgba(0,200,83,0.22)' }}>
          <div>
            <h1 className="text-3xl font-700 text-white leading-tight">Что вас беспокоит?</h1>
            <p className="text-sm text-white mt-1" style={{ color: '#AAB3C5' }}>AI подберёт нужного врача за 2 вопроса</p>
          </div>

          {/* Triage Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {triageItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTriage(item.id)}
                className="py-3 px-3 rounded-2xl text-sm font-500 transition-all text-left"
                style={{
                  background: selectedTriage === item.id ? 'rgba(0,200,83,0.08)' : 'rgba(30,43,53,0.4)',
                  border: `1px solid ${selectedTriage === item.id ? 'rgba(0,200,83,0.22)' : '#1E2B35'}`,
                  color: selectedTriage === item.id ? '#00C853' : '#AAB3C5'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="text-sm font-500" style={{ color: '#00A86B' }}>
            Не знаю что выбрать — помогите определить →
          </button>
        </div>

        {/* Quick Services */}
        <div className="space-y-2.5">
          <h2 className="text-xl font-600 text-white px-1">Быстрые услуги</h2>
          <div className="grid grid-cols-1 gap-2.5">
            {[
              { title: 'Врач онлайн', sub: 'прямо сейчас', badge: '12 онлайн', hasGreen: true },
              { title: 'Понять мои анализы', sub: 'AI расшифровка', hasGreen: false },
              { title: 'Чекап', sub: 'AI оценка рисков', hasGreen: false },
            ].map((service, i) => (
              <button
                key={i}
                className="py-3.5 px-4 rounded-2xl text-left transition-all active:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #0B1518 0%, #10231D 100%)',
                  border: `1px solid ${service.hasGreen ? 'rgba(0,200,83,0.22)' : '#1E2B35'}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-600 text-white">{service.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#667085' }}>{service.sub}</div>
                  </div>
                  {service.badge && (
                    <div className="text-[10px] font-600 px-2 py-1 rounded-full" style={{ background: 'rgba(0,200,83,0.12)', color: '#00C853' }}>
                      {service.badge}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Card */}
        <div className="rounded-3xl p-6 space-y-3" style={{ background: 'linear-gradient(135deg, #0B1518 0%, #10231D 100%)', border: '1px solid rgba(0,200,83,0.22)', borderLeftWidth: 4, borderLeftColor: '#00C853' }}>
          <div className="text-[11px] font-700 tracking-wide text-yellow-600" style={{ color: '#667085' }}>СЛЕДУЮЩИЙ ПРИЁМ</div>
          <div className="text-2xl font-700 text-white">Айгуль Сейткали</div>
          <div className="text-sm text-white" style={{ color: '#AAB3C5' }}>Ср 14 мая · 14:00–14:30 · Видео</div>
          <div className="text-xs" style={{ color: '#667085' }}>Оплачено · 3 920 ₸ · через 2 дня</div>

          <button
            onClick={() => navigate(2)}
            className="w-full py-3 rounded-xl font-700 text-white text-sm transition-all active:scale-95 mt-2"
            style={{ background: 'linear-gradient(135deg, #00C853 0%, #00A86B 100%)' }}
          >
            Войти →
          </button>
        </div>
      </div>

      <BottomNav current={19} navigate={navigate} />
    </div>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const SCREENS = {
  0: Screen0, 1: Screen1, 2: Screen2, 3: Screen3,
  4: Screen4, 5: Screen5, 6: Screen6, 7: Screen7,
  8: Screen8, 9: Screen9, 10: Screen10, 11: Screen11,
  12: Screen12, 13: Screen13, 14: Screen14, 15: Screen15,
  16: Screen16, 17: Screen17, 18: Screen18, 19: HealthcareScreen,
}

export default function App() {
  // Stack stores { id, ctx } so every screen can receive context about HOW it was reached
  const [stack, setStack] = useState([{ id: 16, ctx: {} }])
  const [version, setVersion] = useState('v1') // v1 or v2
  const current = stack[stack.length - 1]   // { id, ctx }

  function navigate(id, ctx = {}) {
    setStack(s => [...s, { id, ctx }])
    window.scrollTo(0, 0)
  }

  // Reset stack and go home — used after completing a consultation flow
  function navigateHome() {
    setStack([{ id: 1, ctx: {} }])
    window.scrollTo(0, 0)
  }

  function goBack() {
    if (stack.length > 1) setStack(s => s.slice(0, -1))
  }

  // In a real Freedom SuperApp WebView this calls the native bridge
  // In demo — returns to the Freedom "Моё здоровье" shell page
  function handleExit() {
    setStack([{ id: 16, ctx: {} }])
    window.scrollTo(0, 0)
  }

  const Screen = SCREENS[current.id] || Screen1

  return (
    <div className="app-shell">
      <div key={current.id} className="screen-enter">
        <Screen
          navigate={navigate}
          goBack={goBack}
          onExit={handleExit}
          ctx={current.ctx}
          navigateHome={navigateHome}
          version={version}
          setVersion={setVersion}
        />
      </div>
    </div>
  )
}
