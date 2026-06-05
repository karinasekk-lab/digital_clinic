import { useState } from 'react'
import { Header, Card, Button, Pill } from '../components/UI'
import { CURRENT_USER } from '../data/mockData'

export default function ProfileScreen({ nav }) {
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [language, setLanguage] = useState('ru')

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Мой профиль" rightIcon="✏️" />

      <div className="px-4 space-y-4 pt-4">
        {/* Profile Header */}
        <Card className="text-center animate-fadeIn">
          <div className="relative inline-block">
            <div className="text-7xl mb-3">{CURRENT_USER.avatar}</div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#00B956] rounded-full flex items-center justify-center text-white text-sm hover:bg-[#009644]">
              📷
            </button>
          </div>
          <h2 className="text-[20px] font-700 text-[#F9FAFB] mt-3">
            {CURRENT_USER.firstName} {CURRENT_USER.lastName}
          </h2>
          <p className="text-sm text-[#94A3B8]">ИИН: {CURRENT_USER.iin} · {CURRENT_USER.age} лет</p>
          <p className="text-xs text-[#94A3B8] mt-1">г. {CURRENT_USER.city}</p>
        </Card>

        {/* OSMS Status */}
        <Card variant="elevated" className="border border-[rgba(24,95,165,0.2)] animate-fadeIn" style={{ animationDelay: '50ms' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛡</span>
            <div className="flex-1">
              <h3 className="font-700 text-[#F9FAFB] text-sm">Статус ОСМС</h3>
              <p className="text-xs text-[#00B956] font-600 mt-1">Активен · до 31.12.2026</p>
              <p className="text-xs text-[#94A3B8] mt-1">Покрывает: первичная помощь, терапевт</p>
              <Button variant="secondary" size="sm" className="mt-2 text-xs">
                Проверить статус →
              </Button>
            </div>
          </div>
        </Card>

        {/* Health Data */}
        <Card className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-3">Показатели здоровья</h3>
          <div className="space-y-2 text-sm text-[#94A3B8] mb-4">
            <div>Рост: {CURRENT_USER.height} см</div>
            <div>Вес: {CURRENT_USER.weight} кг</div>
            <div>Группа крови: {CURRENT_USER.bloodType}</div>
          </div>
          <Button variant="secondary" size="sm" className="w-full text-xs">
            Редактировать
          </Button>
        </Card>

        {/* Subscription */}
        {CURRENT_USER.subscriptionActive && (
          <Card variant="green" className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-700 text-[#F9FAFB]">💎 {CURRENT_USER.subscriptionType}</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Активна</p>
              </div>
              <Pill variant="green">АКТИВНО</Pill>
            </div>
            <p className="text-xs text-[#94A3B8] mb-3">Оплачено до {CURRENT_USER.subscriptionExpiry}</p>
            <p className="text-xs text-[#94A3B8]">{CURRENT_USER.familyMembers} членов семьи подключены</p>
            <Button variant="secondary" size="sm" className="w-full mt-3 text-xs">
              Управление
            </Button>
          </Card>
        )}

        {/* Family */}
        <Card className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Семья</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3 p-2 bg-[#0D1117] rounded-[10px]">
              <span className="text-2xl">👨</span>
              <div className="flex-1">
                <p className="text-sm font-600 text-[#F9FAFB]">Алихан Серіков</p>
                <p className="text-xs text-[#94A3B8]">Основной аккаунт</p>
              </div>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full text-xs">
            Добавить члена семьи +
          </Button>
        </Card>

        {/* Medical History */}
        <Card className="animate-fadeIn" style={{ animationDelay: '250ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">История болезней</h3>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Хронические болезни</span>
              <span className="text-xs text-[#4B5563]">Не указано</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Аллергии</span>
              <span className="text-xs text-[#4B5563]">Не указано</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Прививки</span>
              <span className="text-xs text-[#4B5563]">Не указано</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full text-xs">
            Скачать медкарту PDF
          </Button>
        </Card>

        {/* Settings */}
        <Card className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <h3 className="text-sm font-700 text-[#F9FAFB] mb-4">Настройки</h3>

          {/* Notifications */}
          <div className="flex items-center justify-between p-3 bg-[#0D1117] rounded-[10px] mb-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔔</span>
              <span className="text-sm text-[#F9FAFB]">Уведомления</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsOn}
              onChange={(e) => setNotificationsOn(e.target.checked)}
              className="w-5 h-5 accent-[#00B956] cursor-pointer"
            />
          </div>

          {/* Language */}
          <div className="flex items-center justify-between p-3 bg-[#0D1117] rounded-[10px] mb-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">🌐</span>
              <span className="text-sm text-[#F9FAFB]">Язык</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-[#00B956] text-sm font-600 border-none outline-none cursor-pointer"
            >
              <option value="ru">Русский</option>
              <option value="kk">Қазақша</option>
            </select>
          </div>

          {/* Other options */}
          <button className="w-full flex items-center justify-between p-3 bg-[#0D1117] rounded-[10px] text-sm text-[#F9FAFB] hover:bg-[#1E2235] transition-colors mb-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔒</span>
              <span>Конфиденциальность</span>
            </div>
            <span className="text-lg">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-[#0D1117] rounded-[10px] text-sm text-[#F9FAFB] hover:bg-[#1E2235] transition-colors mb-3" onClick={() => nav.push('support-chat')}>
            <div className="flex items-center gap-3">
              <span className="text-lg">💬</span>
              <span>Поддержка</span>
            </div>
            <span className="text-lg">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-3 bg-[#0D1117] rounded-[10px] text-sm text-[#F9FAFB] hover:bg-[#1E2235] transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg">⭐</span>
              <span>Оценить приложение</span>
            </div>
            <span className="text-lg">→</span>
          </button>
        </Card>

        {/* Logout */}
        <Button
          onClick={() => nav.reset('home')}
          variant="red"
          size="md"
          className="w-full"
        >
          Выйти
        </Button>
      </div>
    </div>
  )
}
