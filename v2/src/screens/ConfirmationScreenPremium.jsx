import { useState } from 'react'
import { Header, Card, Button, FormError, CheckboxInput } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { Video, Lock, Shield, CheckCircle } from 'lucide-react'
import { DOCTORS, CURRENT_USER } from '../data/mockData'

export default function ConfirmationScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [paymentMethod, setPaymentMethod] = useState('freedompay')
  const [insuranceNumber, setInsuranceNumber] = useState('')
  const [consent, setConsent] = useState(false)
  const [validationError, setValidationError] = useState('')
  const { addToast } = useToast()

  const isInstant = !params.date && !params.time
  const bookingTime = isInstant ? 'сейчас' : `${params.date} ${params.time}`

  const handleConfirm = () => {
    setValidationError('')

    if (!consent) {
      setValidationError('Пожалуйста, дайте согласие на обработку данных')
      return
    }

    if (paymentMethod === 'insurance' && !insuranceNumber.trim()) {
      setValidationError('Введите номер страхового полиса')
      return
    }

    addToast('Консультация забронирована!', 'success', 2000)
    nav.push('connecting', { doctorId: doctor.id, bookingTime })
  }

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Подтверждение" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6 overflow-y-auto">
        {/* Doctor Card */}
        <Card variant="elevated" className="flex gap-3 animate-fadeIn">
          <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-700 text-white">{initials}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-700 text-sm text-white">{doctor.name}</h3>
            <p className="text-xs text-[#AAB3C5] mt-0.5">{doctor.specialty}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#00C853] font-600">Онлайн сейчас</span>
            </div>
          </div>
        </Card>

        {/* Format */}
        <Card className="animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#00C853]/10 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
              <Video size={18} className="text-[#00C853]" />
            </div>
            <div className="flex-1">
              <h3 className="font-700 text-sm text-white">
                Видеоконсультация {isInstant ? 'сейчас' : 'по расписанию'}
              </h3>
              <p className="text-xs text-[#AAB3C5] mt-1">
                {isInstant ? 'Начнём немедленно' : `${bookingTime}`}
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4">Способ оплаты</h3>
          <div className="space-y-3">
            {/* FreedomPay */}
            <label className="flex items-center gap-3 p-3 rounded-[14px] bg-[#171C2B] border border-[#2A3145] cursor-pointer hover:border-[#00C853]/30 transition-all">
              <input
                type="radio"
                name="payment"
                value="freedompay"
                checked={paymentMethod === 'freedompay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-white">FreedomPay</p>
                <p className="text-xs text-[#AAB3C5] mt-0.5">Super Card ···· 4521</p>
              </div>
              <span className="text-xs font-700 text-[#00C853] bg-[#00C853]/10 px-2 py-1 rounded-full">DEFAULT</span>
            </label>

            {/* Insurance */}
            <label className="flex items-center gap-3 p-3 rounded-[14px] bg-[#171C2B] border border-[#2A3145] cursor-pointer hover:border-[#00C853]/30 transition-all">
              <input
                type="radio"
                name="payment"
                value="insurance"
                checked={paymentMethod === 'insurance'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-white">ДМС</p>
                <p className="text-xs text-[#AAB3C5] mt-0.5">Страховой полис</p>
              </div>
            </label>

            {/* Insurance input */}
            {paymentMethod === 'insurance' && (
              <input
                type="text"
                placeholder="Номер полиса"
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[14px] px-4 py-3 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 transition-all"
              />
            )}

            {/* OSMS */}
            <label className="flex items-center gap-3 p-3 rounded-[14px] bg-[#171C2B] border border-[#2A3145] cursor-pointer hover:border-[#00C853]/30 transition-all">
              <input
                type="radio"
                name="payment"
                value="osms"
                checked={paymentMethod === 'osms'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-white">ОСМС</p>
                <p className="text-xs text-[#AAB3C5] mt-0.5">Государственное покрытие</p>
              </div>
            </label>

            {/* OSMS info */}
            {paymentMethod === 'osms' && (
              <div className="bg-[#00C853]/5 border border-[#00C853]/30 rounded-[14px] p-3 flex items-start gap-2">
                <CheckCircle size={16} className="text-[#00C853] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#AAB3C5]">
                    <span className="font-600 text-white">{CURRENT_USER.firstName}</span> · ИИН {CURRENT_USER.iin}
                  </p>
                  <p className="text-xs text-[#00C853] font-600 mt-1">Активен ✓</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Price Breakdown */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4">Расчёт стоимости</h3>
          <div className="space-y-2 mb-4 pb-4 border-b border-[#2A3145]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#AAB3C5]">Консультация</span>
              <span className="text-sm font-700 text-white">{doctor.price.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#AAB3C5]">Кешбэк 20%</span>
              <span className="text-sm font-700 text-[#00C853]">−{doctor.cashback.toLocaleString()} ₸</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#AAB3C5]">К оплате</span>
              <span className="text-lg font-700 text-white">{doctor.price.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#AAB3C5]">Вернётся бонусами</span>
              <span className="text-sm font-700 text-[#00C853]">{doctor.cashback.toLocaleString()} ₸</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#2A3145] flex items-center gap-2 text-xs text-[#AAB3C5]">
            <Lock size={14} className="flex-shrink-0" />
            <span>Оплата защищена FreedomPay</span>
          </div>
        </Card>

        {/* Consent */}
        <Card className="animate-fadeIn">
          <div className="flex items-start gap-3">
            <Shield size={16} className="text-[#00C853] flex-shrink-0 mt-1" />
            <label className="flex items-start gap-3 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded border-[#2A3145] bg-[#171C2B] cursor-pointer mt-0.5"
              />
              <div>
                <p className="text-xs text-[#AAB3C5] leading-5">
                  Я даю согласие на обработку медицинских данных
                  <a href="#" className="text-[#00C853] hover:opacity-80 ml-1">
                    (подробнее)
                  </a>
                </p>
              </div>
            </label>
          </div>
        </Card>

        {/* Validation Error */}
        {validationError && (
          <FormError message={validationError} />
        )}

        {/* CTA Buttons */}
        <div className="space-y-3 pt-4">
          <Button onClick={handleConfirm} size="md" className="w-full">
            Оплатить · начать сейчас
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => nav.popTo('doctor-list')}
              variant="secondary"
              size="md"
              className="flex-1"
            >
              Выбрать другого
            </Button>
            <Button onClick={() => nav.pop()} variant="secondary" size="md" className="flex-1">
              Отмена
            </Button>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
