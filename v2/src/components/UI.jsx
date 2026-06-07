// Reusable UI Components
import { ArrowLeft, ChevronRight } from 'lucide-react'

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', isLoading = false }) {
  const baseClasses = 'font-600 rounded-[16px] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] sm:min-h-auto focus:outline-none'

  const variants = {
    primary: 'bg-[#00C853] hover:bg-[#00B85A] text-white shadow-lg shadow-[#00C853]/20 active:shadow-lg active:shadow-[#00C853]/10',
    secondary: 'bg-[#171C2B] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/50 hover:bg-[#1E2433] active:bg-[#171C2B]',
    outline: 'bg-transparent border border-[#2A3145] text-[#00C853] hover:border-[#00C853] hover:bg-[rgba(0,200,83,0.05)]',
    red: 'bg-[#E84C3D] hover:bg-[#D63C2D] text-white shadow-lg shadow-[#E84C3D]/20',
    ghost: 'bg-transparent text-[#AAB3C5] hover:bg-[#171C2B] hover:text-[#FFFFFF]'
  }

  const sizes = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-5 text-sm',
    lg: 'h-14 px-6 text-base'
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
    default: 'bg-[#171C2B] border border-[#2A3145] rounded-[24px] p-5 sm:p-4',
    elevated: 'bg-gradient-to-br from-[#171C2B] to-[#0D111A] border border-[#2A3145] rounded-[24px] p-5 sm:p-4 shadow-lg shadow-[#00C853]/5',
    green: 'bg-gradient-to-br from-[#052E16] to-[#030E0A] border border-[#00C853]/30 rounded-[24px] p-5 sm:p-4',
    amber: 'bg-gradient-to-br from-[#2d2416] to-[#1a1509] border border-[rgba(239,159,39,0.2)] rounded-[24px] p-5 sm:p-4'
  }

  const interactiveClass = interactive || onClick ? 'cursor-pointer transition-all hover:border-[#00C853]/50 hover:shadow-lg hover:shadow-[#00C853]/10' : ''

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

export function Header({ title, subtitle, onBack, rightIcon, backText = null }) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-b from-[#0D111A] via-[#0D111A] to-transparent border-b border-[#2A3145]">
      <div className="px-4 py-4 sm:py-3 flex items-center justify-between min-h-[60px] sm:min-h-auto">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#171C2B] active:scale-95 transition-all flex-shrink-0"
            >
              {backText ? <span className="text-lg">{backText}</span> : <ArrowLeft size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />}
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-700 text-white truncate">{title}</h1>
            {subtitle && (typeof subtitle === 'string' ? <p className="text-xs sm:text-sm text-[#AAB3C5] mt-0.5">{subtitle}</p> : <div className="mt-0.5">{subtitle}</div>)}
          </div>
        </div>
        {rightIcon && <div className="text-lg sm:text-xl flex-shrink-0 ml-2">{rightIcon}</div>}
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

export function DoctorAvatar({ name, size = 'md', isOnline = false }) {
  // Extract initials from name
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  }

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses[size]}`}>
      <div
        className={`w-full h-full rounded-full flex items-center justify-center font-bold text-white ${
          isOnline ? 'border-2 border-[#00B956]' : ''
        }`}
        style={{
          background: 'linear-gradient(135deg, #00B956, #0F6E56)'
        }}
      >
        {initials}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00B956] rounded-full border-2 border-[#0D1117] animate-pulse"></span>
      )}
    </div>
  )
}

export function DoctorCard({ doctor, onTap, showPrice = true, compact = false, actionButton = null }) {
  const isOnline = doctor.status === 'online'

  if (compact) {
    return (
      <button onClick={onTap} className="flex items-center gap-3 w-full p-3 bg-[#1E2235] rounded-[14px] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,185,86,0.3)] transition-colors">
        <DoctorAvatar name={doctor.name} size="sm" isOnline={isOnline} />
        <div className="text-left flex-1 min-w-0">
          <div className="font-600 text-sm text-[#F9FAFB] truncate">{doctor.name}</div>
          <div className="text-xs text-[#94A3B8]">{doctor.specialty}</div>
        </div>
        {isOnline && <span className="text-[10px] text-[#00B956] animate-pulse">● онлайн</span>}
      </button>
    )
  }

  return (
    <div className="bg-[#1E2235] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4 hover:border-[rgba(0,185,86,0.3)] transition-colors">
      <div className="flex gap-4">
        <button onClick={onTap} className="flex-1 flex gap-4 text-left">
          <DoctorAvatar name={doctor.name} size="lg" isOnline={isOnline} />
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
            {isOnline && (
              <div className="text-xs text-[#00B956] font-600 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00B956] rounded-full animate-pulse"></span>
                онлайн · ответ ~{doctor.waitTime} мин
              </div>
            )}
          </div>
        </button>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          {showPrice && (
            <div className="text-right">
              <div className="font-700 text-[#F9FAFB] text-sm">{doctor.price.toLocaleString()} ₸</div>
              <div className="text-xs text-[#00B956] mt-1">{doctor.cashback.toLocaleString()} ₸ кешбэком</div>
            </div>
          )}
          {actionButton && <div className="mt-2">{actionButton}</div>}
        </div>
      </div>
    </div>
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

export function Stat({ label, value, unit = '', status = 'normal', icon = '' }) {
  const statusColor = {
    normal: '#00B956',
    warning: '#EF9F27',
    critical: '#E24B4A',
    info: '#185FA5'
  }

  return (
    <div className="bg-[#0D1117] rounded-[14px] p-4 border border-[rgba(255,255,255,0.06)]">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <p className="text-xs text-[#94A3B8] font-600 uppercase">{label}</p>
        </div>
        {status !== 'normal' && (
          <span
            className="text-xs font-700 px-2 py-1 rounded-full"
            style={{ backgroundColor: `${statusColor[status]}20`, color: statusColor[status] }}
          >
            {status === 'warning' ? '⚠' : status === 'critical' ? '●' : '✓'}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-700 text-[#F9FAFB]" style={{ color: statusColor[status] }}>
          {value}
        </span>
        {unit && <span className="text-xs text-[#94A3B8]">{unit}</span>}
      </div>
    </div>
  )
}

export function RatingBar({ rating = 5, count = 0, total = 100, color = '#EF9F27' }) {
  const percentage = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-600 text-[#F9FAFB] w-8">{rating}★</span>
      <div className="flex-1 h-2 bg-[#0D1117] rounded-full overflow-hidden">
        <div
          className="h-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="text-xs text-[#94A3B8] w-6">{count}</span>
    </div>
  )
}

export function RatingSummary({ rating = 4.8, totalReviews = 14, distribution = {} }) {
  return (
    <div className="text-center mb-6">
      <div className="text-5xl font-700 text-[#F9FAFB]">{rating}</div>
      <div className="flex justify-center gap-1 my-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            ★
          </span>
        ))}
      </div>
      <p className="text-sm text-[#94A3B8]">{totalReviews} отзывов</p>
    </div>
  )
}

export function ServiceCard({ icon, title, subtitle, status = 'active', onTap, badge = null, colorBorder = 'green' }) {
  const borderColors = {
    green: 'border-l-[#00B956]',
    blue: 'border-l-[#185FA5]',
    amber: 'border-l-[#EF9F27]',
    teal: 'border-l-[#06B6D4]',
    purple: 'border-l-[#A855F7]',
    orange: 'border-l-[#F97316]',
    pink: 'border-l-[#EC4899]'
  }

  const isActive = status === 'active'
  const isNew = badge === 'NEW'

  return (
    <button
      onClick={isActive ? onTap : undefined}
      disabled={!isActive}
      className={`w-full text-left p-4 border-l-4 rounded-r-lg transition-all ${
        borderColors[colorBorder]
      } ${
        isActive
          ? 'bg-[#1E2235] border border-l-4 border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,185,86,0.2)] cursor-pointer'
          : 'bg-[#151a22] border border-l-4 border-[rgba(100,116,139,0.15)] opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl pt-1">{icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-600 text-sm text-[#F9FAFB]">{title}</h4>
            <p className="text-xs text-[#94A3B8] mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          {isActive ? (
            <span className="text-xl text-[#00B956]">→</span>
          ) : isNew ? (
            <span className="text-[10px] font-700 px-2 py-1 rounded-full bg-[#E24B4A] text-white">
              {badge} СКОРО
            </span>
          ) : (
            <span className="text-[10px] font-700 px-2 py-1 rounded-full bg-[rgba(100,116,139,0.2)] text-[#8A95B0]">
              СКОРО
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
