import { useState, useEffect } from 'react'
import { Header } from '../components/health/Header'
import { HeroHealthAssistant } from '../components/health/HeroHealthAssistant'
import { TodaySection } from '../components/health/TodaySection'
import { MedicalSupport } from '../components/health/MedicalSupport'
import { PromoCards } from '../components/health/PromoCards'
import { UsefulServices } from '../components/health/UsefulServices'
import { HistoryDocuments } from '../components/health/HistoryDocuments'
import { RemindersGoals } from '../components/health/RemindersGoals'
import { SupportCard } from '../components/health/SupportCard'
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
      'travel-medicine': 'travel-medicine',
      'health-manager': 'health-manager'
    }

    const route = routes[promoId]
    if (route) {
      nav.push(route)
    } else {
      addToast('Скоро будет доступно', 'info', 1500)
    }
  }

  const handleServiceClick = (serviceId) => {
    const routes = {
      'analyses': 'all-services',
      'medications': 'all-services',
      'checkups': 'checkups',
      'vaccination': 'all-services',
      'devices': 'all-services'
    }

    const route = routes[serviceId]
    if (route) {
      nav.push(route)
    }
  }

  const handleViewHistory = () => {
    nav.push('my-records')
  }

  const handleViewReminders = () => {
    addToast('Функция напоминаний скоро будет доступна', 'info', 1500)
  }

  const handleChatClick = () => {
    nav.push('support-chat')
  }

  const handleEmergencyClick = () => {
    addToast('Экстренная служба: +7 (701) XXX-XX-XX', 'info', 2000)
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
    <div className="min-h-screen bg-[#090D14] pb-20 safe-area-inset-bottom">
      {/* Header */}
      <Header onBack={() => nav.pop()} notificationCount={2} />

      {/* Scrollable Content */}
      <div className="overflow-y-auto space-y-0.5">
        {/* SECTION 1: AI Health Assistant - Primary Focus */}
        <HeroHealthAssistant
          userName={CURRENT_USER.firstName}
          onStartCheck={handleStartCheck}
        />

        <Separator />

        {/* SECTION 2: Today Health Status - Secondary Priority */}
        <TodaySection />

        <Separator />

        {/* SECTION 3: Medical Support - Doctor Focus */}
        <MedicalSupport onViewDoctors={handleViewAllDoctors} />

        <Separator />

        {/* SECTION 4: Promotional Services - 4 Cards with Horizontal Scroll */}
        <PromoCards onPromoClick={handlePromoClick} />

        <Separator />

        {/* SECTION 5: Useful Services - Utility Features */}
        <UsefulServices onServiceClick={handleServiceClick} />

        <Separator />

        {/* SECTION 6: History & Documents */}
        <HistoryDocuments onViewHistory={handleViewHistory} />

        <Separator />

        {/* SECTION 7: Reminders & Goals */}
        <RemindersGoals
          onViewReminders={handleViewReminders}
          activeGoalsCount={3}
        />

        <Separator />

        {/* SECTION 8: Support */}
        <SupportCard
          onChatClick={handleChatClick}
          onEmergencyClick={handleEmergencyClick}
        />

        {/* Bottom Spacing */}
        <div className="h-1" />
      </div>
    </div>
  )
}
