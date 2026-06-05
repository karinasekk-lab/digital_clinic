// Reusable UI Components

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', isLoading = false }) {
  const baseClasses = 'font-600 rounded-[14px] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] sm:min-h-auto hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-gradient-to-br from-[#00B956] to-[#009644] text-white shadow-[0_4px_20px_rgba(0,185,86,0.35)] hover:shadow-[0_6px_24px_rgba(0,185,86,0.4)] focus:ring-[#00B956]',
    secondary: 'bg-[#1E2235] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)] focus:ring-[rgba(0,185,86,0.3)]',
    outline: 'bg-transparent border border-[rgba(255,255,255,0.2)] text-[#00B956] hover:border-[#00B956] hover:bg-[rgba(0,185,86,0.1)] focus:ring-[#00B956]',
    red: 'bg-[#E24B4A] text-white shadow-[0_4px_12px_rgba(226,75,74,0.3)] hover:shadow-[0_6px_16px_rgba(226,75,74,0.4)] focus:ring-[#E24B4A]',
    ghost: 'bg-transparent text-[#F9FAFB] hover:bg-[rgba(255,255,255,0.08)] focus:ring-[rgba(255,255,255,0.2)]'
  }

  const sizes = {
    sm: 'h-12 sm:h-10 px-4 text-sm',
    md: 'h-[56px] sm:h-[52px] px-6 text-[15px]',
    lg: 'h-16 sm:h-14 px-8 text-base'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export function Card({ children, className = '', variant = 'default', onClick = null, interactive = false }) {
  const variants = {
    default: 'bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-5 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
    elevated: 'bg-[#243050] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-5 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
    green: 'bg-[#052E16] border border-[rgba(0,185,86,0.2)] rounded-[20px] p-5 sm:p-4',
    amber: 'bg-[#2d2416] border border-[rgba(239,159,39,0.2)] rounded-[20px] p-5 sm:p-4'
  }

  const interactiveClass = interactive || onClick ? 'cursor-pointer transition-all hover:shadow-lg hover:border-[rgba(0,185,86,0.3)]' : ''

  return (
    <div className={`${variants[variant]} ${className} ${interactiveClass}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function CheckboxInput({ label, checked, onChange, disabled = false }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-5 h-5 mt-1 accent-[#00B956] cursor-pointer disabled:cursor-not-allowed"
      />
      <span className="text-sm text-[#94A3B8] flex-1 group-hover:text-[#F9FAFB] transition-colors">
        {label}
      </span>
    </label>
  )
}

export function Header({ title, subtitle, onBack, rightIcon, backText = '←' }) {
  return (
    <div className="sticky top-0 z-40 bg-[#0D1117] border-b border-[rgba(255,255,255,0.08)]">
      <div className="px-4 py-4 sm:py-3 flex items-center justify-between min-h-[56px] sm:min-h-auto">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onBack && (
            <button onClick={onBack} className="text-[#00B956] font-600 text-2xl sm:text-lg hover:opacity-70 active:opacity-50 min-w-[48px] sm:min-w-auto min-h-[48px] sm:min-h-auto flex items-center justify-center flex-shrink-0">
              {backText}
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-[22px] font-700 text-[#F9FAFB] truncate">{title}</h1>
            {subtitle && <p className="text-[11px] sm:text-[12px] text-[#94A3B8] mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {rightIcon && <div className="text-xl sm:text-lg flex-shrink-0 ml-2">{rightIcon}</div>}
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

export function Input({ placeholder, value, onChange, type = 'text', icon, className = '', error = '', disabled = false }) {
  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-4 text-lg pointer-events-none">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-full text-[#F9FAFB] placeholder-[#4B5563] text-base py-4 sm:py-3 px-5 sm:px-4 outline-none transition-all min-h-[48px] sm:min-h-auto focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            icon ? 'pl-12 sm:pl-10' : ''
          } ${
            error
              ? 'bg-[rgba(226,75,74,0.1)] border border-[#E24B4A] focus:border-[#E24B4A] focus:ring-[rgba(226,75,74,0.3)]'
              : 'bg-[#1E2235] border border-[rgba(255,255,255,0.08)] focus:border-[#00B956] focus:ring-[rgba(0,185,86,0.3)]'
          }`}
        />
      </div>
      {error && <span className="text-xs text-[#E24B4A] px-2">{error}</span>}
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
  const typeConfig = {
    success: {
      bg: 'bg-[#00B956]',
      icon: '✓',
      borderColor: 'border-[rgba(0,185,86,0.3)]'
    },
    error: {
      bg: 'bg-[#E24B4A]',
      icon: '✕',
      borderColor: 'border-[rgba(226,75,74,0.3)]'
    },
    warning: {
      bg: 'bg-[#EF9F27]',
      icon: '⚠',
      borderColor: 'border-[rgba(239,159,39,0.3)]'
    },
    info: {
      bg: 'bg-[#185FA5]',
      icon: 'ℹ',
      borderColor: 'border-[rgba(24,95,165,0.3)]'
    }
  }

  const config = typeConfig[type] || typeConfig.info

  return (
    <div className={`${config.bg} border ${config.borderColor} text-white px-4 py-3 rounded-[14px] text-sm font-600 shadow-lg animate-slideup backdrop-blur-sm`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>{config.icon}</span>
          <span>{message}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-lg opacity-80 hover:opacity-100 transition-opacity">
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
          className="bg-gradient-to-r from-[#1E2235] via-[#243050] to-[#1E2235] rounded-[20px] animate-shimmer"
          style={{
            height,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite'
          }}
        ></div>
      ))}
    </div>
  )
}

export function SkeletonCard({ variant = 'default', count = 1 }) {
  const variants = {
    default: 'bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-5',
    doctor: 'bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4',
    compact: 'bg-[#1E2235] rounded-[14px] p-3'
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className={`${variants[variant]} animate-pulse`}>
      <div className="space-y-3">
        <div className="h-4 bg-[#243050] rounded w-3/4"></div>
        <div className="h-3 bg-[#243050] rounded w-1/2"></div>
        <div className="h-3 bg-[#243050] rounded w-full"></div>
      </div>
    </div>
  ))

  return <div className="space-y-4">{skeletons}</div>
}

export function LoadingOverlay({ message = 'Загрузка...' }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#1E2235] rounded-[20px] p-6 border border-[rgba(255,255,255,0.08)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1E2235] border-t-[#00B956] rounded-full animate-spin"></div>
          <p className="text-sm text-[#F9FAFB] font-600">{message}</p>
        </div>
      </div>
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

export function ErrorState({ icon = '⚠', title = 'Ошибка', subtitle, actionText, onAction, variant = 'default' }) {
  const variants = {
    default: 'bg-[#1E2235] border border-[rgba(226,75,74,0.2)]',
    card: 'bg-transparent'
  }

  return (
    <div className={`rounded-[20px] p-6 text-center ${variants[variant]}`}>
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-lg font-700 text-[#F9FAFB] mb-2">{title}</h2>
      {subtitle && <p className="text-sm text-[#94A3B8] mb-6">{subtitle}</p>}
      {actionText && onAction && (
        <Button onClick={onAction} variant="secondary" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  )
}

export function FormError({ message }) {
  if (!message) return null
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(226,75,74,0.1)] border border-[rgba(226,75,74,0.2)] rounded-[10px]">
      <span className="text-red-400">✕</span>
      <span className="text-sm text-[#E24B4A]">{message}</span>
    </div>
  )
}

export function FormSuccess({ message }) {
  if (!message) return null
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(0,185,86,0.1)] border border-[rgba(0,185,86,0.2)] rounded-[10px]">
      <span className="text-green-400">✓</span>
      <span className="text-sm text-[#00B956]">{message}</span>
    </div>
  )
}

export function ProgressIndicator({ steps, currentStep }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const isActive = index < currentStep
          const isCurrent = index === currentStep - 1
          return (
            <div key={index} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-600 text-sm transition-all ${
                  isActive || isCurrent
                    ? 'bg-[#00B956] text-white'
                    : 'bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]'
                }`}
              >
                {isActive ? '✓' : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${
                    isActive ? 'bg-[#00B956]' : 'bg-[#1E2235]'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`text-xs font-600 ${
              index < currentStep || index === currentStep - 1 ? 'text-[#00B956]' : 'text-[#94A3B8]'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Tooltip({ text, children, position = 'top' }) {
  const positions = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  }

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute hidden group-hover:block ${positions[position]} left-1/2 transform -translate-x-1/2 bg-[#0A0E1A] text-[#F9FAFB] text-xs font-600 px-3 py-2 rounded-[8px] whitespace-nowrap z-50 border border-[rgba(255,255,255,0.08)]`}
      >
        {text}
        <div
          className={`absolute ${
            position === 'top' || position === 'bottom'
              ? 'left-1/2 transform -translate-x-1/2 ' + (position === 'top' ? 'top-full border-t-[#0A0E1A]' : 'bottom-full border-b-[#0A0E1A]')
              : 'top-1/2 transform -translate-y-1/2 ' + (position === 'left' ? 'left-full border-l-[#0A0E1A]' : 'right-full border-r-[#0A0E1A]')
          } border-4 border-transparent`}
        />
      </div>
    </div>
  )
}
