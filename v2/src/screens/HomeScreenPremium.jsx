import { useState, useEffect } from 'react'
import { Header } from '../components/health/Header'
import { HeroHealthAssistant } from '../components/health/HeroHealthAssistant'
import { TodaySection } from '../components/health/TodaySection'
import { MedicalSupport } from '../components/health/MedicalSupport'
import { PromoCards } from '../components/health/PromoCards'
import { Separator } from '../components/health/Separator'
import { DOCTORS, APPOINTMENTS, CURRENT_USER } from '../data/mockData'
import { useToast } from '../contexts/ToastContext'

export default function HomeScreenPremium({ nav }) {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleStartCheck = () => {
    addToast('Запуск проверки симптомов', 'info', 2000)
    nav.push('ai-chat')
  }

  const handleViewAllDoctors = () => {
    nav.push('doctor-list')
  }

  const handlePromoClick = (promoId) => {
    const routes = {
      'cashback': 'doctor-list',
      'analysis': 'analysis-upload',
      'travel': null,
      'health-manager': null
    }

    const route = routes[promoId]
    if (route) {
      nav.push(route)
    } else {
      addToast('Скоро будет доступно', 'info', 1500)
    }
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
        {/* AI Health Assistant */}
        <HeroHealthAssistant
          userName={CURRENT_USER.firstName}
          onStartCheck={handleStartCheck}
        />

        <Separator />

        {/* Today Section - Health Status */}
        <TodaySection />

        <Separator />

        {/* Medical Support - Doctors */}
        <MedicalSupport onViewDoctors={handleViewAllDoctors} />

        <Separator />

        {/* Promo Cards */}
        <PromoCards onPromoClick={handlePromoClick} />

        {/* Bottom Spacing */}
        <div className="h-3" />
      </div>
    </div>
  )
}
