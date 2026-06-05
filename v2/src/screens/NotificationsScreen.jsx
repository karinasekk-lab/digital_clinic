import { Header, Card, Button, Pill } from '../components/UI'
import { NOTIFICATIONS } from '../data/mockData'

export default function NotificationsScreen({ nav }) {
  const groupedByDate = {
    'СЕГОДНЯ': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) < 3600000),
    'ВЧЕРА': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) >= 86400000 && Math.abs(Date.now() - n.timestamp) < 172800000),
    'РАНЕЕ': NOTIFICATIONS.filter((n) => Math.abs(Date.now() - n.timestamp) >= 172800000)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Уведомления" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {Object.entries(groupedByDate).map(([date, notifs]) => {
          if (notifs.length === 0) return null

          return (
            <div key={date}>
              <h3 className="text-xs font-700 uppercase text-[#94A3B8] mb-2">{date}</h3>
              <div className="space-y-2">
                {notifs.map((notif, idx) => (
                  <Card
                    key={notif.id}
                    className={`cursor-pointer hover:border-[rgba(0,185,86,0.3)] transition-colors animate-fadeIn ${
                      notif.read ? 'opacity-60' : ''
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{notif.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-600 text-sm text-[#F9FAFB]">{notif.title}</h4>
                        <p className="text-xs text-[#94A3B8] mt-1">{notif.message}</p>
                        <p className="text-xs text-[#4B5563] mt-1">
                          {Math.floor(Math.abs(Date.now() - notif.timestamp) / 60000)} мин назад
                        </p>
                      </div>

                      {notif.type === 'appointment' && (
                        <Button
                          onClick={() => nav.push('video-call')}
                          variant="primary"
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
            <p className="text-[#94A3B8]">Нет уведомлений</p>
          </div>
        )}
      </div>
    </div>
  )
}
