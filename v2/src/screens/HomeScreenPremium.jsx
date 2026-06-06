import { useState, useEffect } from 'react'
import { Header } from '../components/health/Header'
import { HeroHealthAssistant } from '../components/health/HeroHealthAssistant'
import { SymptomChips } from '../components/health/SymptomChips'
import { AppointmentCard } from '../components/health/AppointmentCard'
import { AvailableDoctors } from '../components/health/AvailableDoctors'
import { HealthMetrics } from '../components/health/HealthMetrics'
import { Separator } from '../components/health/Separator'
import { DOCTORS, APPOINTMENTS, CURRENT_USER } from '../data/mockData'
import { useToast } from '../contexts/ToastContext'

export default function HomeScreenPremium({ nav }) {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [upcomingAppointment, setUpcomingAppointment] = useState(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const upcoming = APPOINTMENTS.find((a) => a.status === 'upcoming')
      setUpcomingAppointment(upcoming)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleStartCheck = () => {
    addToast('Запуск AI-проверки здоровья', 'info', 2000)
    nav.push('ai-chat')
  }

  const handleSymptomSelect = (symptomId) => {
    addToast('Проверка выбранного симптома', 'info', 1500)
    nav.push('ai-chat', { symptom: symptomId })
  }

  const handleDoctorSelect = (doctorId) => {
    const doctor = DOCTORS.find((d) => d.id === doctorId)
    addToast(`${doctor?.name} выбран`, 'success', 1500)
    nav.push('doctor-profile', { doctorId })
  }

  const handleViewAllDoctors = () => {
    nav.push('doctor-list')
  }

  const handleAddMetrics = () => {
    addToast('Перейти к добавлению показателей', 'info', 1500)
    nav.push('profile')
  }

  const handleNotifications = () => {
    nav.push('notifications')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090D14] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#2A3145] border-t-[#00C853] rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#AAB3C5] font-500">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      {/* Header */}
      <Header onBack={() => nav.pop()} notificationCount={2} />

      {/* Scrollable Content */}
      <div className="overflow-y-auto">
        {/* AI Health Assistant - MAIN FOCUS */}
        <HeroHealthAssistant
          userName={CURRENT_USER.firstName}
          onStartCheck={handleStartCheck}
        />

        <Separator />

        {/* Quick Symptoms */}
        <SymptomChips
          onSymptomSelect={handleSymptomSelect}
          onViewAll={() => nav.push('all-services')}
        />

        <Separator />

        {/* Upcoming Appointment */}
        {upcomingAppointment && (
          <>
            <AppointmentCard
              doctor={upcomingAppointment.doctor.name}
              appointmentDate={`${upcomingAppointment.date.split('-')[2]} ${['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][new Date(upcomingAppointment.date).getMonth()]}`}
              appointmentTime={upcomingAppointment.time}
              timeUntil="через 2 дня"
              onEnter={() => {
                addToast('Вход в видеоконсультацию', 'success', 1500)
                nav.push('video-call', { appointmentId: upcomingAppointment.id })
              }}
            />
            <Separator />
          </>
        )}

        {/* Available Doctors */}
        <AvailableDoctors
          doctors={DOCTORS}
          onDoctorSelect={handleDoctorSelect}
          onViewAll={handleViewAllDoctors}
        />

        <Separator />

        {/* Health Metrics */}
        <HealthMetrics
          onAddMetrics={handleAddMetrics}
          onViewAll={() => nav.push('profile')}
        />

        {/* Bottom Spacing */}
        <div className="h-6" />
      </div>
    </div>
  )
}
