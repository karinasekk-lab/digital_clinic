// Reusable UI Components

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '' }) {
  const baseClasses = 'font-600 rounded-[14px] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-gradient-to-br from-[#00B956] to-[#009644] text-white shadow-[0_4px_20px_rgba(0,185,86,0.35)]',
    secondary: 'bg-[#1E2235] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)]',
    outline: 'bg-transparent border border-[rgba(255,255,255,0.2)] text-[#00B956]',
    red: 'bg-[#E24B4A] text-white',
    ghost: 'bg-transparent text-[#F9FAFB]'
  }

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-[52px] px-6 text-[15px]',
    lg: 'h-14 px-8 text-base'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
    elevated: 'bg-[#243050] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    green: 'bg-[#052E16] border border-[rgba(0,185,86,0.2)] rounded-[20px] p-4',
    amber: 'bg-[#2d2416] border border-[rgba(239,159,39,0.2)] rounded-[20px] p-4'
  }

  return <div className={`${variants[variant]} ${className}`}>{children}</div>
}

export function Header({ title, subtitle, onBack, rightIcon, backText = '←' }) {
  return (
    <div className="sticky top-0 z-40 bg-[#0D1117] border-b border-[rgba(255,255,255,0.08)]">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {onBack && (
            <button onClick={onBack} className="text-[#00B956] font-600 text-lg hover:opacity-70">
              {backText}
            </button>
          )}
          <div>
            <h1 className="text-[22px] font-700 text-[#F9FAFB]">{title}</h1>
            {subtitle && <p className="text-[12px] text-[#94A3B8] mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {rightIcon && <div className="text-lg">{rightIcon}</div>}
      </div>
    </div>
  )
}

export function StatusBar() {
  const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  return (
    <div
      className="h-6 flex items-center justify-between px-4 text-[11px] font-500"
      style={{ background: '#0A0E1A', color: '#8A95B0', borderBottom: '1px solid #1E2235' }}
    >
      <span>🇰🇿 Almaty</span>
      <span>{time}</span>
      <span>●●●●●</span>
    </div>
  )
}

export function Pill({ children, variant = 'default', icon = '' }) {
  const variants = {
    default: 'bg-[#1E2235] text-[#F9FAFB]',
    green: 'bg-[#00B956] text-white',
    amber: 'bg-[#EF9F27] text-white',
    red: 'bg-[#E24B4A] text-white',
    gray: 'bg-[rgba(100,116,139,0.2)] text-[#94A3B8]'
  }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-600 whitespace-nowrap ${variants[variant]}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  )
}

export function Input({ placeholder, value, onChange, type = 'text', icon, className = '' }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && <span className="absolute left-4 text-lg">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#1E2235] border border-[rgba(255,255,255,0.08)] rounded-full text-[#F9FAFB] placeholder-[#4B5563] text-sm py-3 px-4 outline-none focus:border-[rgba(0,185,86,0.3)] transition-colors ${
          icon ? 'pl-10' : ''
        }`}
      />
    </div>
  )
}

export function DoctorCard({ doctor, onTap, showPrice = true, compact = false }) {
  if (compact) {
    return (
      <button onClick={onTap} className="flex items-center gap-3 w-full p-3 bg-[#1E2235] rounded-[14px] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,185,86,0.3)] transition-colors">
        <div className="text-4xl flex-shrink-0">{doctor.photo}</div>
        <div className="text-left flex-1 min-w-0">
          <div className="font-600 text-sm text-[#F9FAFB] truncate">{doctor.name}</div>
          <div className="text-xs text-[#94A3B8]">{doctor.specialty}</div>
        </div>
        <span className="text-[10px] text-green-400">●</span>
      </button>
    )
  }

  return (
    <button
      onClick={onTap}
      className="w-full bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4 hover:border-[rgba(0,185,86,0.3)] transition-colors text-left"
    >
      <div className="flex gap-4">
        <div className="text-5xl flex-shrink-0 relative">
          {doctor.photo}
          {doctor.status === 'online' && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#00B956] rounded-full border-2 border-[#0D1117]"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-700 text-[15px] text-[#F9FAFB]">{doctor.name}</h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            {doctor.specialty} · Стаж {doctor.experience} лет
          </p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-600 text-[#F9FAFB]">{doctor.rating}</span>
            <span className="text-xs text-[#94A3B8]">({doctor.reviews})</span>
          </div>
          {doctor.status === 'online' && (
            <div className="text-xs text-[#00B956] font-600 mt-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-[#00B956] rounded-full animate-pulse"></span>
              онлайн · ответ ~{doctor.waitTime} мин
            </div>
          )}
        </div>
        {showPrice && (
          <div className="text-right flex-shrink-0">
            <div className="font-700 text-[#F9FAFB] text-sm">{doctor.price.toLocaleString()} ₸</div>
            <div className="text-xs text-[#00B956] mt-1">{doctor.cashback.toLocaleString()} ₸ кешбэком</div>
          </div>
        )}
      </div>
    </button>
  )
}

export function EmptyState({ icon, title, subtitle, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-lg font-700 text-[#F9FAFB] mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-[#94A3B8] mb-6">{subtitle}</p>}
      {actionText && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  )
}

export function Toast({ message, type = 'info', onClose }) {
  const types = {
    success: 'bg-[#00B956] text-white',
    error: 'bg-[#E24B4A] text-white',
    info: 'bg-[#185FA5] text-white'
  }

  return (
    <div className={`fixed bottom-20 left-4 right-4 px-4 py-3 rounded-[14px] text-sm font-600 ${types[type]} shadow-lg animate-slideup z-50`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-lg opacity-70 hover:opacity-100">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export function SkeletonLoader({ count = 3, height = '100px' }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-[#1E2235] rounded-[20px] animate-pulse"
          style={{ height }}
        ></div>
      ))}
    </div>
  )
}

export function Badge({ count, position = 'top-right' }) {
  const positions = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0'
  }

  return (
    <span className={`absolute ${positions[position]} bg-[#E24B4A] text-white text-[10px] font-700 w-5 h-5 rounded-full flex items-center justify-center`}>
      {count}
    </span>
  )
}
