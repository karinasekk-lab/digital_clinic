import { useState } from 'react'
import { Header, Card, Button } from '../components/UI'
import { Calendar, Clock, Video, Pill, CheckCircle, Settings } from 'lucide-react'
import { APPOINTMENTS, PRESCRIPTIONS } from '../data/mockData'

export default function MyRecordsScreenPremium({ nav }) {
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
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-[#4A5268] mb-3" strokeWidth={1.5} />
          <p className="text-sm font-700 text-white mb-2">Нет предстоящих записей</p>
          <p className="text-xs text-[#AAB3C5] mb-4">Запишитесь на консультацию к врачу</p>
          <Button
            onClick={() => nav.push('doctor-list')}
            size="sm"
            className="inline-block"
          >
            Записаться к врачу
          </Button>
        </div>
      )
    }

    return upcomingAppointments.map((apt, idx) => (
      <Card key={apt.id} variant="elevated" style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30">
            <span className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></span>
            <span className="text-xs font-600 text-[#00C853]">ПРЕДСТОЯЩАЯ</span>
          </div>
          <span className="text-xs text-[#AAB3C5]">Через 2 дня 3 часа</span>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-700 text-white">{apt.doctor.photo.substring(0, 2)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-700 text-white">{apt.doctor.name}</h3>
            <p className="text-xs text-[#AAB3C5] mt-0.5">{apt.doctor.specialty}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm text-[#AAB3C5]">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="flex-shrink-0" />
            <span>
              {apt.date} · {apt.time}—{apt.time.split(':')[0]}:30
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Video size={14} className="flex-shrink-0" />
            <span>Видеоконсультация</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => nav.push('video-call', { doctorId: apt.doctorId })}
            size="sm"
            className="flex-1"
          >
            Войти
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
        <div className="text-center py-12">
          <CheckCircle size={48} className="mx-auto text-[#4A5268] mb-3" strokeWidth={1.5} />
          <p className="text-sm font-700 text-white mb-2">Нет завершённых консультаций</p>
          <p className="text-xs text-[#AAB3C5] mb-4">Записаться на первую консультацию</p>
          <Button
            onClick={() => nav.push('doctor-list')}
            size="sm"
            className="inline-block"
          >
            Выбрать врача
          </Button>
        </div>
      )
    }

    return completedAppointments.map((apt, idx) => (
      <Card key={apt.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30">
            <CheckCircle size={12} className="text-[#00C853]" fill="#00C853" />
            <span className="text-xs font-600 text-[#00C853]">ЗАВЕРШЕНА</span>
          </div>
        </div>

        <div className="flex gap-3 mb-3">
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#00C853]/20 to-[#00B85A]/20 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-700 text-[#00C853]">{apt.doctor.photo.substring(0, 2)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-700 text-white">{apt.doctor.name}</h3>
            <p className="text-xs text-[#AAB3C5] mt-0.5">
              {apt.date} · {apt.duration} минут
            </p>
          </div>
        </div>

        {apt.diagnosis && <p className="text-sm text-[#AAB3C5] mb-3">Диагноз: {apt.diagnosis}</p>}

        <div className="flex gap-2 flex-wrap">
          <div className="px-3 py-1.5 bg-[#171C2B] border border-[#2A3145] rounded-[12px] text-xs text-[#AAB3C5] font-600">
            Назначения
          </div>
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
        <div className="text-center py-12">
          <Pill size={48} className="mx-auto text-[#4A5268] mb-3" strokeWidth={1.5} />
          <p className="text-sm font-700 text-white mb-2">Нет назначений</p>
          <p className="text-xs text-[#AAB3C5] mb-4">Назначения появятся после консультации с врачом</p>
          <Button
            onClick={() => nav.push('doctor-list')}
            size="sm"
            className="inline-block"
          >
            Начать консультацию
          </Button>
        </div>
      )
    }

    return PRESCRIPTIONS.map((presc, idx) => (
      <Card key={presc.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-700 text-white text-sm">{presc.medication}</h3>
          <div className="px-2.5 py-1 rounded-full bg-[#171C2B] border border-[#2A3145]">
            <span className="text-xs text-[#AAB3C5] font-600">
              {presc.status === 'active' ? 'АКТИВНО' : 'ЗАВЕРШЕНО'}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#AAB3C5] mb-4">
          <div>Дозировка: {presc.dosage}</div>
          <div>Длительность: {presc.duration}</div>
          <div>
            {presc.startDate} {presc.endDate && `до ${presc.endDate}`}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#171C2B] border border-[#2A3145] rounded-[14px] mb-3">
          <span className="text-xs text-[#AAB3C5] font-600">Напоминания</span>
          <input type="checkbox" defaultChecked={presc.reminder} className="accent-[#00C853] cursor-pointer w-4 h-4" />
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
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header
        title="Мои записи"
        rightIcon={<Settings size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />}
        onBack={() => nav.pop()}
      />

      {/* Tabs */}
      <div className="flex border-b border-[#2A3145] sticky top-16 z-20 bg-[#090D14]/80 backdrop-blur-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 px-3 text-xs sm:text-sm font-600 border-b-2 transition-all whitespace-nowrap min-h-[48px] flex items-center justify-center ${
              activeTab === tab
                ? 'text-[#00C853] border-[#00C853]'
                : 'text-[#AAB3C5] border-transparent hover:text-white'
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 space-y-3 pt-6">
        {activeTab === 'upcoming' && renderUpcoming()}
        {activeTab === 'completed' && renderCompleted()}
        {activeTab === 'prescriptions' && renderPrescriptions()}
        <div className="h-4" />
      </div>
    </div>
  )
}
