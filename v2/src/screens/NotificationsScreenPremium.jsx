import { Header, Card, Button } from '../components/UI'
import { Bell } from 'lucide-react'
import { NOTIFICATIONS } from '../data/mockData'

export default function NotificationsScreenPremium({ nav }) {
  const groupedByDate = {
    'СЕГОДНЯ': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) < 3600000),
    'ВЧЕРА': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) >= 86400000 && Math.abs(Date.now() - n.timestamp) < 172800000),
    'РАНЕЕ': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) >= 172800000)
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title="Уведомления" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        {Object.entries(groupedByDate).map(([date, notifs]) => {
          if (notifs.length === 0) return null

          return (
            <div key={date}>
              <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider mb-3 px-1">{date}</h3>
              <div className="space-y-2">
                {notifs.map((notif, idx) => (
                  <Card
                    key={notif.id}
                    className={`cursor-pointer hover:border-[#00C853]/30 transition-all animate-fadeIn ${
                      notif.read ? 'opacity-60' : ''
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-[12px] bg-[#171C2B] border border-[#2A3145] flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{notif.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-600 text-sm text-white">{notif.title}</h4>
                        <p className="text-xs text-[#AAB3C5] mt-0.5">{notif.message}</p>
                        <p className="text-xs text-[#4A5268] mt-1">
                          {Math.floor(Math.abs(Date.now() - notif.timestamp) / 60000)} мин назад
                        </p>
                      </div>

                      {notif.type === 'appointment' && (
                        <Button
                          onClick={() => nav.push('video-call')}
                          size="sm"
                          className="flex-shrink-0"
                        >
                          Войти
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}

        {NOTIFICATIONS.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-[#4A5268] mb-3" strokeWidth={1.5} />
            <p className="text-[#AAB3C5]">Нет уведомлений</p>
          </div>
        )}
      </div>
    </div>
  )
}
