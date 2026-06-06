import { Header, Card, Button } from '../components/UI'

export default function CheckupsScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24 relative">
      <Header title="✅ Чекапы и профилактика" onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Green Sub */}
        <p className="text-xs text-[#06B6D4] font-600">Проверьте здоровье комплексно</p>

        {/* Hero */}
        <Card className="animate-fadeIn" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.05))' }}>
          <p className="font-700 text-[#F9FAFB] mb-2">Раннее выявление — лучшее лечение</p>
          <p className="text-xs text-[#94A3B8]">Комплекс анализов + расшифровка AI + врач</p>
        </Card>

        {/* Checkup Packages */}
        <div className="space-y-2">
          {[
            {
              title: 'Базовый чекап',
              features: [
                'Общий анализ крови',
                'Биохимия (8 показателей)',
                'Глюкоза · Холестерин',
                'Расшифровка AI',
                'Консультация терапевта'
              ],
              price: '12 900 ₸',
              cashback: '10 320 ₸',
              time: 'Результат за 24 часа'
            },
            {
              title: 'Мужской 35+',
              features: [
                'Все из базового',
                'ПСА (онкомаркер)',
                'Тестостерон',
                'Кардио-риски'
              ],
              price: '18 900 ₸',
              cashback: '15 120 ₸',
              time: 'Результат за 24 часа'
            },
            {
              title: 'Женский 35+',
              features: [
                'Все из базового',
                'Гормоны',
                'Онкомаркеры',
                'Щитовидная железа'
              ],
              price: '18 900 ₸',
              cashback: '15 120 ₸',
              time: 'Результат за 24 часа'
            },
            {
              title: 'Детский',
              features: [
                'Педиатрический набор',
                'Расшифровка AI',
                'Консультация педиатра'
              ],
              price: '9 900 ₸',
              cashback: '7 920 ₸',
              time: 'Результат за 24 часа'
            }
          ].map((checkup, idx) => (
            <Card
              key={checkup.title}
              className="animate-fadeIn"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <h3 className="font-700 text-[#F9FAFB] mb-2">{checkup.title}</h3>

              <div className="space-y-1 mb-3">
                {checkup.features.map((feature) => (
                  <div key={feature} className="text-xs text-[#94A3B8] flex gap-2">
                    <span>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-3 pb-3 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#94A3B8]">Стоимость</span>
                  <span className="text-sm font-700 text-[#F9FAFB]">{checkup.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#94A3B8]">Кешбэк</span>
                  <span className="text-xs text-[#00B956]">{checkup.cashback}</span>
                </div>
                <div className="text-xs text-[#94A3B8]">⏱ {checkup.time}</div>
              </div>

              <Button variant="secondary" size="sm" className="w-full text-xs">
                Заказать
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* COMING SOON Overlay */}
      <div className="fixed inset-0 bg-[rgba(13,17,23,0.9)] backdrop-blur-sm flex items-center justify-center z-50 rounded-[40px] pointer-events-none">
        <div className="text-center">
          <p className="text-4xl mb-4">🔜</p>
          <p className="text-white font-700 text-lg mb-2">Скоро</p>
          <p className="text-[#94A3B8] text-sm">Уведомим о запуске</p>
        </div>
      </div>
    </div>
  )
}
