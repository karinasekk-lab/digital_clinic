import { useState } from 'react'
import { Header, Card, Button } from '../components/UI'
import { Calendar, Clock, Video } from 'lucide-react'
import { DOCTORS } from '../data/mockData'

export default function SlotBookingScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  // Calculate progress
  let progress = 1
  if (selectedDate) progress = 2
  if (selectedTime) progress = 3

  // Generate week dates
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    dates.push(date)
  }

  // Time slots
  const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  const occupiedTimes = ['10:00', '12:00', '17:00']

  const dateStr = selectedDate ? selectedDate.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }) : null
  const dayStr = selectedDate
    ? selectedDate.toLocaleDateString('ru-RU', { weekday: 'short' })
    : null

  // Generate initials from doctor name
  const initials = doctor.name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Выбрать время" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6 overflow-y-auto">
        {/* Progress Indicator */}
        <Card className="animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider">Этап бронирования</h3>
            <span className="text-xs text-[#AAB3C5]">{progress}/3</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <div
                  className={`h-1 flex-1 rounded-full transition-all ${
                    step <= progress ? 'bg-[#00C853]' : 'bg-[#2A3145]'
                  }`}
                />
                {step < 3 && (
                  <div
                    className={`w-1 h-1 rounded-full transition-all ${
                      step <= progress ? 'bg-[#00C853]' : 'bg-[#2A3145]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Doctor Mini Card */}
        <Card className="flex gap-3 animate-fadeIn">
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
            <span className="text-base font-700 text-white">{initials}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-700 text-sm text-white">{doctor.name}</h3>
            <p className="text-xs text-[#AAB3C5] mt-0.5">{doctor.specialty}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30">
              <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-600 text-[#00C853]">Онлайн</span>
            </div>
          </div>
        </Card>

        {/* Date Picker */}
        <Card className="animate-fadeIn">
          <h3 className="text-sm font-700 text-white mb-4 flex items-center gap-2">
            <Calendar size={16} />
            Выберите дату
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((date, i) => {
              const dayNum = date.getDate()
              const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' })
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 py-3 px-3 rounded-[14px] font-600 transition-all ${
                    isSelected
                      ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/20'
                      : 'bg-[#171C2B] text-white border border-[#2A3145] hover:border-[#00C853]/30'
                  }`}
                >
                  <span className="text-xs">{dayName}</span>
                  <span className="text-sm">{dayNum}</span>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Time Grid */}
        {selectedDate && (
          <Card className="animate-fadeIn">
            <h3 className="text-sm font-700 text-white mb-4 flex items-center gap-2">
              <Clock size={16} />
              Выберите время
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {times.map((time) => {
                const isOccupied = occupiedTimes.includes(time)
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => !isOccupied && setSelectedTime(time)}
                    disabled={isOccupied}
                    className={`py-3 px-4 rounded-[14px] font-600 text-sm transition-all ${
                      isSelected
                        ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/20'
                        : isOccupied
                        ? 'bg-[#171C2B] text-[#4A5268] opacity-50 line-through cursor-not-allowed'
                        : 'bg-[#171C2B] text-white border border-[#2A3145] hover:border-[#00C853]/30'
                    }`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </Card>
        )}

        {/* Summary Card */}
        {selectedDate && selectedTime && (
          <Card variant="elevated" className="animate-fadeIn">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#00C853] flex-shrink-0" />
                <span className="text-sm font-700 text-white capitalize">
                  {dayStr}, {selectedDate.getDate()} {dateStr?.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#00C853] flex-shrink-0" />
                <span className="text-sm font-700 text-white">{selectedTime} — {selectedTime.split(':')[0]}:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Video size={16} className="text-[#00C853] flex-shrink-0" />
                <span className="text-sm text-[#AAB3C5]">Видеоконсультация · 30 минут</span>
              </div>
              <div className="pt-3 border-t border-[#2A3145]">
                <div className="text-xs text-[#AAB3C5]">{doctor.price.toLocaleString()} ₸ →</div>
                <div className="text-sm font-700 text-[#00C853]">{doctor.cashback.toLocaleString()} ₸ кешбэком 20%</div>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        {selectedTime && (
          <Button
            onClick={() =>
              nav.push('confirmation', { doctorId: doctor.id, date: selectedDate, time: selectedTime })
            }
            size="md"
            className="w-full"
          >
            Записаться на {selectedTime}
          </Button>
        )}

        <div className="h-4" />
      </div>
    </div>
  )
}
