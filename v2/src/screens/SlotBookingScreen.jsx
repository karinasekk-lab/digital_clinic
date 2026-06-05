import { useState } from 'react'
import { Header, Card, Button, Pill } from '../components/UI'
import { DOCTORS } from '../data/mockData'

export default function SlotBookingScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

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

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Выбрать время" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Doctor Mini Card */}
        <Card className="flex gap-3 animate-fadeIn">
          <div className="text-4xl flex-shrink-0">{doctor.photo}</div>
          <div className="flex-1">
            <h3 className="font-700 text-sm text-[#F9FAFB]">{doctor.name}</h3>
            <p className="text-xs text-[#94A3B8]">{doctor.specialty}</p>
          </div>
          <div className="flex-shrink-0">
            <Pill variant="green">● Онлайн</Pill>
          </div>
        </Card>

        {/* Date Picker */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Выберите дату</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((date, i) => {
              const dayNum = date.getDate()
              const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' })
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 py-3 px-3 rounded-[10px] font-600 transition-all ${
                    isSelected ? 'bg-[#00B956] text-white' : 'bg-[#1E2235] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)]'
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
          <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Выберите время</h3>
            <div className="grid grid-cols-2 gap-3">
              {times.map((time) => {
                const isOccupied = occupiedTimes.includes(time)
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => !isOccupied && setSelectedTime(time)}
                    disabled={isOccupied}
                    className={`py-3 px-4 rounded-[12px] font-600 text-sm transition-all ${
                      isSelected
                        ? 'bg-[#00B956] text-white'
                        : isOccupied
                        ? 'bg-[#1E2235] text-[#4B5563] opacity-40 line-through cursor-not-allowed'
                        : 'bg-[#1E2235] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)]'
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
          <Card variant="green" className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span className="text-sm font-700 text-[#F9FAFB] capitalize">
                  {dayStr}, {selectedDate.getDate()} {dateStr?.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span className="text-sm font-700 text-[#F9FAFB]">{selectedTime} — {selectedTime.split(':')[0]}:30</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📹</span>
                <span className="text-sm text-[#94A3B8]">Видеоконсультация · 30 минут</span>
              </div>
              <div className="pt-2 border-t border-[rgba(255,255,255,0.1)]">
                <div className="text-xs text-[#94A3B8]">{doctor.price.toLocaleString()} ₸ →</div>
                <div className="text-sm font-700 text-[#F9FAFB]">{doctor.cashback.toLocaleString()} ₸ кешбэком 20%</div>
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
            className="w-full sticky bottom-20 bg-gradient-to-t from-[#0D1117] from-0% to-transparent pt-4"
          >
            Записаться на {selectedTime}
          </Button>
        )}
      </div>
    </div>
  )
}
