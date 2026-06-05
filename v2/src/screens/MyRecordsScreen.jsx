import { useState } from 'react'
import { Header, Card, Button, EmptyState, Pill } from '../components/UI'
import { APPOINTMENTS, PRESCRIPTIONS } from '../data/mockData'

export default function MyRecordsScreen({ nav }) {
  const [activeTab, setActiveTab] = useState('upcoming')

  const tabs = ['upcoming', 'completed', 'prescriptions']
  const tabLabels = {
    upcoming: 'Предстоящие',
    completed: 'Прошедшие',
    prescriptions: 'Назначения'
  }

  const upcomingAppointments = APPOINTMENTS.filter((a) => a.status === 'upcoming')
  const completedAppointments = APPOINTMENTS.filter((a) => a.status === 'completed')

  const renderUpcoming = () => {
    if (upcomingAppointments.length === 0) {
      return (
        <EmptyState
          icon="📋"
          title="Нет предстоящих записей"
          subtitle="Запишитесь на консультацию к врачу"
          actionText="Записаться к врачу"
          onAction={() => nav.push('doctor-list')}
        />
      )
    }

    return upcomingAppointments.map((apt, idx) => (
      <Card key={apt.id} variant="green" style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <Pill variant="green">ПРЕДСТОЯЩАЯ</Pill>
          <span className="text-xs text-[#94A3B8]">Через 2 дня 3 часа</span>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="text-4xl">{apt.doctor.photo}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-700 text-[#F9FAFB]">{apt.doctor.name}</h3>
            <p className="text-xs text-[#94A3B8]">{apt.doctor.specialty}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>
              {apt.date} · {apt.time}—{apt.time.split(':')[0]}:30
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>📹</span>
            <span>Видеоконсультация</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => nav.push('video-call', { doctorId: apt.doctorId })}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Войти в консультацию
          </Button>
          <Button variant="secondary" size="sm">
            Перенести
          </Button>
          <Button variant="red" size="sm">
            Отменить
          </Button>
        </div>
      </Card>
    ))
  }

  const renderCompleted = () => {
    if (completedAppointments.length === 0) {
      return (
        <EmptyState
          icon="✓"
          title="Нет завершённых консультаций"
          subtitle="Записаться на первую консультацию"
          actionText="Выбрать врача"
          onAction={() => nav.push('doctor-list')}
        />
      )
    }

    return completedAppointments.map((apt, idx) => (
      <Card key={apt.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <Pill variant="gray">ЗАВЕРШЕНА ✓</Pill>
        </div>

        <div className="flex gap-3 mb-3">
          <div className="text-4xl">{apt.doctor.photo}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-700 text-[#F9FAFB]">{apt.doctor.name}</h3>
            <p className="text-xs text-[#94A3B8]">
              {apt.date} · {apt.duration} минут
            </p>
          </div>
        </div>

        {apt.diagnosis && <p className="text-sm text-[#94A3B8] mb-3">Диагноз: {apt.diagnosis}</p>}

        <div className="flex gap-2 flex-wrap">
          <Pill variant="default">Назначения</Pill>
          <Button variant="secondary" size="sm">
            Записаться снова
          </Button>
        </div>
      </Card>
    ))
  }

  const renderPrescriptions = () => {
    if (PRESCRIPTIONS.length === 0) {
      return (
        <EmptyState
          icon="💊"
          title="Нет назначений"
          subtitle="Назначения появятся после консультации с врачом"
          actionText="Начать консультацию"
          onAction={() => nav.push('doctor-list')}
        />
      )
    }

    return PRESCRIPTIONS.map((presc, idx) => (
      <Card key={presc.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-700 text-[#F9FAFB] text-sm">{presc.medication}</h3>
          <Pill variant="gray" icon="💊">
            {presc.status === 'active' ? 'АКТИВНО' : 'ЗАВЕРШЕНО'}
          </Pill>
        </div>

        <div className="space-y-2 text-xs text-[#94A3B8] mb-4">
          <div>Дозировка: {presc.dosage}</div>
          <div>Длительность: {presc.duration}</div>
          <div>
            {presc.startDate} {presc.endDate && `до ${presc.endDate}`}
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-[#0D1117] rounded-[10px] mb-3">
          <span className="text-xs text-[#94A3B8]">Напоминания</span>
          <input type="checkbox" defaultChecked={presc.reminder} className="accent-[#00B956]" />
        </div>

        <Button
          onClick={() => nav.push('medication-info')}
          variant="secondary"
          size="sm"
          className="w-full"
        >
          Купить в аптеке →
        </Button>
      </Card>
    ))
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Мои записи" rightIcon="⚙️" />

      {/* Tabs */}
      <div className="flex border-b border-[rgba(255,255,255,0.08)] sticky top-16 z-20 bg-[#0D1117] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-600 border-b-2 transition-colors whitespace-nowrap min-h-[48px] sm:min-h-auto flex items-center justify-center ${
              activeTab === tab
                ? 'text-[#00B956] border-[#00B956]'
                : 'text-[#94A3B8] border-transparent hover:text-[#F9FAFB]'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 space-y-3 pt-4">
        {activeTab === 'upcoming' && renderUpcoming()}
        {activeTab === 'completed' && renderCompleted()}
        {activeTab === 'prescriptions' && renderPrescriptions()}
      </div>
    </div>
  )
}
