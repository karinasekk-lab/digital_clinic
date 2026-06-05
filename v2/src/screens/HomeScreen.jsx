import { useState, useEffect } from 'react'
import { Header, Card, Button, Pill, DoctorCard, EmptyState } from '../components/UI'
import { CURRENT_USER, DOCTORS, APPOINTMENTS, NEWS_AND_TIPS, HEALTH_STATS } from '../data/mockData'

export default function HomeScreen({ nav }) {
  const [greeting, setGreeting] = useState('Добрый день')
  const [upcomingAppointment, setUpcomingAppointment] = useState(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Доброе утро')
    else if (hour < 18) setGreeting('Добрый день')
    else setGreeting('Добрый вечер')

    const upcoming = APPOINTMENTS.find(a => a.status === 'upcoming')
    setUpcomingAppointment(upcoming)
  }, [])

  const moodEmojis = ['😊 Хорошо', '😐 Нормально', '😟 Плохо']

  return (
    <div className="min-h-screen bg-[#0D1117] pb-32 sm:pb-24">
      {/* Header with greeting */}
      <div className="bg-gradient-to-b from-[#1E2235] to-transparent pt-4 sm:pt-4 px-4 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-700 text-[#F9FAFB]">← Мое здоровье</h1>
          <button className="relative p-3 sm:p-2 hover:bg-[#1E2235] rounded-full transition-colors active:bg-[#1E2235] min-w-[48px] sm:min-w-auto min-h-[48px] sm:min-h-auto flex items-center justify-center">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#E24B4A] rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4 sm:space-y-4">
        {/* Greeting Card */}
        <Card variant="green" className="animate-fadeIn">
          <h2 className="text-lg font-700 text-[#F9FAFB] mb-2">
            {greeting}, {CURRENT_USER.firstName} 👋
          </h2>
          <p className="text-sm text-[#94A3B8] mb-4">Как вы себя сегодня?</p>
          <div className="flex gap-2">
            {moodEmojis.map((mood) => (
              <button
                key={mood}
                onClick={() => mood.includes('Плохо') && nav.push('ai-chat')}
                className="flex-1 py-2 px-3 rounded-[12px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(0,185,86,0.2)] text-sm font-600 text-[#F9FAFB] transition-colors"
              >
                {mood}
              </button>
            ))}
          </div>
        </Card>

        {/* Quick AI Block */}
        <Card className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <div className="space-y-3">
            <button
              onClick={() => nav.push('ai-chat')}
              className="w-full bg-[#243050] border border-[rgba(255,255,255,0.08)] rounded-full text-left px-4 py-3 text-sm text-[#94A3B8] hover:border-[rgba(0,185,86,0.3)] transition-colors"
            >
              🤖 Что беспокоит? Опишите симптомы...
            </button>
            <div className="grid grid-cols-3 gap-2">
              {['🌡 Температура', '🤧 Горло', '🤢 Живот'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => nav.push('ai-chat')}
                  className="py-2 px-2 text-xs font-600 bg-[#243050] rounded-[10px] text-[#F9FAFB] hover:bg-[#2d3b5f] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['❤️ Давление', '👶 Ребёнок', '🧠 Стресс'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => nav.push('ai-chat')}
                  className="py-2 px-2 text-xs font-600 bg-[#243050] rounded-[10px] text-[#F9FAFB] hover:bg-[#2d3b5f] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Appointment */}
        {upcomingAppointment && (
          <Card variant="green" className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <p className="text-xs text-[#94A3B8] font-600 uppercase mb-3">Ближайший приём</p>
            <div className="flex gap-3 mb-4">
              <div className="text-4xl">{upcomingAppointment.doctor.photo}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-700 text-[#F9FAFB]">{upcomingAppointment.doctor.name}</h3>
                <p className="text-xs text-[#94A3B8]">{upcomingAppointment.doctor.specialty}</p>
                <p className="text-xs text-[#00B956] font-600 mt-2">
                  📅 {upcomingAppointment.date} · {upcomingAppointment.time}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] mb-4">⏱ Через 2 дня 3 часа</p>
            <Button onClick={() => nav.push('video-call')} size="md" className="w-full">
              Войти в консультацию
            </Button>
          </Card>
        )}

        {/* Quick Services */}
        <div className="space-y-2">
          <h3 className="text-xs font-700 uppercase text-[#94A3B8] px-2">Быстрые услуги</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[
              { icon: '📹', text: 'Врач онлайн' },
              { icon: '🔬', text: 'Анализы' },
              { icon: '💊', text: 'Лекарство' },
              { icon: '📄', text: 'Больничный' },
              { icon: '🌙', text: '24/7' },
              { icon: '✅', text: 'Все услуги' }
            ].map((service) => (
              <button
                key={service.text}
                onClick={() => {
                  if (service.text === 'Все услуги') nav.push('all-services')
                  else if (service.text === 'Врач онлайн') nav.push('doctor-list')
                  else if (service.text === 'Анализы') nav.push('analysis-upload')
                  else if (service.text === 'Лекарство') nav.push('medication-info')
                  else if (service.text === 'Больничный') nav.push('sick-leave')
                }}
                className="flex-shrink-0 flex flex-col items-center gap-2 p-3 bg-[#1E2235] rounded-[14px] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,185,86,0.3)] transition-colors snap-center min-w-[90px]"
              >
                <span className="text-2xl">{service.icon}</span>
                <span className="text-xs font-600 text-[#F9FAFB] text-center">{service.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Doctors Now */}
        <div className="space-y-3">
          <h3 className="text-xs font-700 uppercase text-[#94A3B8] px-2">Доступны прямо сейчас</h3>
          <div className="space-y-2">
            {DOCTORS.slice(0, 3).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onTap={() => nav.push('doctor-profile', { doctorId: doctor.id })}
                compact
              />
            ))}
          </div>
        </div>

        {/* Health Stats */}
        <Card className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Ваши показатели</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Давление</span>
              <span className="text-[#F9FAFB] font-600">
                {HEALTH_STATS.bloodPressure.systolic}/{HEALTH_STATS.bloodPressure.diastolic} ✓
              </span>
            </div>
            <div className="flex justify-between items-center opacity-50">
              <span className="text-[#94A3B8]">Пульс</span>
              <span className="text-[#F9FAFB]">—</span>
            </div>
            <div className="flex justify-between items-center opacity-50">
              <span className="text-[#94A3B8]">Вес</span>
              <span className="text-[#F9FAFB]">—</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">
            Добавить показатели
          </Button>
        </Card>

        {/* News & Tips */}
        <div className="space-y-3">
          <h3 className="text-xs font-700 uppercase text-[#94A3B8] px-2">Советы для здоровья</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {NEWS_AND_TIPS.map((news) => (
              <div
                key={news.id}
                className="flex-shrink-0 bg-[#1E2235] rounded-[20px] p-4 border border-[rgba(255,255,255,0.06)] w-64 snap-center"
              >
                <div className="text-4xl mb-3">{news.image}</div>
                <h4 className="font-700 text-sm text-[#F9FAFB] mb-2">{news.title}</h4>
                <p className="text-xs text-[#94A3B8] mb-3">{news.description}</p>
                <p className="text-xs text-[#4B5563]">{news.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
