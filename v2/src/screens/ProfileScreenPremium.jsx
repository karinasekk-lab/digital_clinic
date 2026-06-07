import { useState } from 'react'
import { Settings, Bell, Lock, LogOut, ChevronRight, Shield } from 'lucide-react'
import { Header, Button, Card } from '../components/UI'
import { maskIIN } from '../utils/dateFormatter'
import { CURRENT_USER } from '../data/mockData'
import { useToast } from '../contexts/ToastContext'

export default function ProfileScreenPremium({ nav }) {
  const { addToast } = useToast()
  const [notificationsOn, setNotificationsOn] = useState(true)

  const userInitials = CURRENT_USER.firstName.charAt(0) + CURRENT_USER.lastName.charAt(0)

  const handleLogout = () => {
    addToast('Выход из аккаунта', 'info', 1500)
    nav.reset('home')
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Мой профиль" onBack={() => nav.pop()} rightIcon={<Settings size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />} />

      <div className="px-4 space-y-4 pt-6 overflow-y-auto">
        {/* Profile Header */}
        <Card variant="elevated" className="text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-700 text-white">{userInitials}</span>
          </div>
          <h2 className="text-xl font-700 text-white">
            {CURRENT_USER.firstName} {CURRENT_USER.lastName}
          </h2>
          <p className="text-sm text-[#AAB3C5] mt-2">ИИН: {maskIIN(CURRENT_USER.iin)}</p>
          <p className="text-xs text-[#4A5268] mt-1">{CURRENT_USER.age} лет • г. {CURRENT_USER.city}</p>
        </Card>

        {/* OSMS Status */}
        <Card className="animate-fadeIn">
          <div className="flex items-start gap-3">
            <Shield size={24} className="text-[#00C853] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="font-700 text-white text-sm">Статус ОСМС</h3>
              <p className="text-xs text-[#00C853] font-600 mt-2">Активен до 31.12.2026</p>
              <p className="text-xs text-[#AAB3C5] mt-1">Первичная помощь, терапевт, педиатр</p>
              <Button variant="secondary" size="sm" className="mt-3 w-full">
                Проверить статус
              </Button>
            </div>
          </div>
        </Card>

        {/* Health Data */}
        <Card className="animate-fadeIn">
          <h3 className="font-700 text-white text-sm mb-4">Показатели здоровья</h3>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[#AAB3C5]">Рост</span>
              <span className="font-600 text-white">{CURRENT_USER.height} см</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#AAB3C5]">Вес</span>
              <span className="font-600 text-white">{CURRENT_USER.weight} кг</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#AAB3C5]">Группа крови</span>
              <span className="font-600 text-white">{CURRENT_USER.bloodType}</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full">
            Редактировать
          </Button>
        </Card>

        {/* Settings */}
        <div className="space-y-2">
          <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider px-1">Настройки</h3>

          {/* Notifications */}
          <button
            onClick={() => setNotificationsOn(!notificationsOn)}
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 flex items-center justify-between hover:border-[#00C853]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />
              <span className="font-600 text-white">Уведомления</span>
            </div>
            <div className={`w-12 h-6 rounded-full transition-all ${notificationsOn ? 'bg-[#00C853]' : 'bg-[#4A5268]'}`}>
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationsOn ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </button>

          {/* Privacy */}
          <button className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 flex items-center justify-between hover:border-[#00C853]/30 transition-all">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-[#AAB3C5]" strokeWidth={1.5} />
              <span className="font-600 text-white">Приватность и безопасность</span>
            </div>
            <ChevronRight size={20} className="text-[#4A5268]" strokeWidth={1.5} />
          </button>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="red"
            size="md"
            className="w-full mt-4"
          >
            <LogOut size={18} strokeWidth={2} />
            Выход
          </Button>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
