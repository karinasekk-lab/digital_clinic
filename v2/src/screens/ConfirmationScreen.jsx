import { useState } from 'react'
import { Header, Card, Button, Pill, DoctorCard, FormError, CheckboxInput } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { DOCTORS, CURRENT_USER } from '../data/mockData'

export default function ConfirmationScreen({ nav, params }) {
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

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Подтверждение" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Doctor Card */}
        <DoctorCard
          doctor={doctor}
          onTap={() => {}}
          showPrice={false}
          className="animate-fadeIn"
        />

        {/* Format */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📹</span>
            <div>
              <h3 className="font-700 text-sm text-[#F9FAFB]">
                Видеоконсультация {isInstant ? 'сейчас' : 'по расписанию'}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                {isInstant ? '● онлайн · начнём сразу' : `${bookingTime}`}
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Способ оплаты</h3>
          <div className="space-y-3">
            {/* FreedomPay */}
            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-[#0D1117] cursor-pointer hover:bg-[#1E2235] transition-colors">
              <input
                type="radio"
                name="payment"
                value="freedompay"
                checked={paymentMethod === 'freedompay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-[#F9FAFB]">FreedomPay</p>
                <p className="text-xs text-[#94A3B8]">Super Card ···· 4521</p>
              </div>
              <span className="text-green-400 text-sm font-700">DEFAULT</span>
            </label>

            {/* Insurance */}
            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-[#0D1117] cursor-pointer hover:bg-[#1E2235] transition-colors">
              <input
                type="radio"
                name="payment"
                value="insurance"
                checked={paymentMethod === 'insurance'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-[#F9FAFB]">ДМС</p>
                <p className="text-xs text-[#94A3B8]">Страховой полис</p>
              </div>
            </label>

            {/* Insurance input */}
            {paymentMethod === 'insurance' && (
              <input
                type="text"
                placeholder="Номер полиса"
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
                className="w-full bg-[#1E2235] border border-[rgba(255,255,255,0.08)] rounded-[12px] px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none focus:border-[rgba(0,185,86,0.3)]"
              />
            )}

            {/* OSMS */}
            <label className="flex items-center gap-3 p-3 rounded-[12px] bg-[#0D1117] cursor-pointer hover:bg-[#1E2235] transition-colors">
              <input
                type="radio"
                name="payment"
                value="osms"
                checked={paymentMethod === 'osms'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-600 text-sm text-[#F9FAFB]">ОСМС</p>
                <p className="text-xs text-[#94A3B8]">Государственное покрытие</p>
              </div>
            </label>

            {/* OSMS info */}
            {paymentMethod === 'osms' && (
              <div className="bg-[#052E16] border border-[rgba(0,185,86,0.2)] rounded-[12px] p-3">
                <p className="text-xs text-[#94A3B8]">
                  <span className="font-600 text-[#F9FAFB]">{CURRENT_USER.firstName}</span> · ИИН {CURRENT_USER.iin}
                </p>
                <p className="text-xs text-[#00B956] font-600 mt-1">Активен ✓</p>
              </div>
            )}
          </div>
        </Card>

        {/* Price Breakdown */}
        <Card className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Расчёт стоимости</h3>
          <div className="space-y-2 mb-4 pb-4 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">Консультация</span>
              <span className="text-sm font-700 text-[#F9FAFB]">{doctor.price.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">Кешбэк 20%</span>
              <span className="text-sm font-700 text-[#00B956]">−{doctor.cashback.toLocaleString()} ₸</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">К оплате</span>
              <span className="text-lg font-700 text-[#F9FAFB]">{doctor.price.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#94A3B8]">Вернётся бонусами</span>
              <span className="text-sm font-700 text-[#00B956]">{doctor.cashback.toLocaleString()} ₸</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-2 text-xs text-[#94A3B8]">
            <span>🔒</span>
            <span>Оплата через FreedomPay (защищена)</span>
          </div>
        </Card>

        {/* Consent */}
        <Card className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <CheckboxInput
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            label={
              <>
                Я даю согласие на обработку медицинских данных{' '}
                <a href="#" className="text-[#00B956] hover:underline">
                  (подробнее)
                </a>
              </>
            }
          />
        </Card>

        {/* Validation Error */}
        {validationError && (
          <FormError message={validationError} />
        )}

        {/* CTA Buttons */}
        <div className="space-y-2 sm:space-y-3 fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0D1117] from-90% to-transparent pt-4 px-4 pb-32 sm:pb-24 sm:sticky sm:bottom-20">
          <Button onClick={handleConfirm} size="md" className="w-full">
            Оплатить · начать сейчас
          </Button>
          <div className="grid grid-cols-2 sm:flex sm:gap-2 gap-2">
            <Button
              onClick={() => nav.popTo('doctor-list')}
              variant="ghost"
              size="sm"
              className="flex-1 text-xs sm:text-sm"
            >
              Выбрать другого
            </Button>
            <Button onClick={() => nav.pop()} variant="ghost" size="sm" className="flex-1 text-xs sm:text-sm">
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
