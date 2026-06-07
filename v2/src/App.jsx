import { useState } from 'react'
import { useNavigation } from './hooks/useNavigation'
import { StatusBar } from './components/UI'
import { ToastProvider } from './contexts/ToastContext'

// Import all screens
import HomeScreen from './screens/HomeScreen'
import HomeScreenPremium from './screens/HomeScreenPremium'
import DoctorListScreen from './screens/DoctorListScreen'
import DoctorListScreenPremium from './screens/DoctorListScreenPremium'
import DoctorProfileScreenPremium from './screens/DoctorProfileScreenPremium'
import SlotBookingScreenPremium from './screens/SlotBookingScreenPremium'
import ConfirmationScreenPremium from './screens/ConfirmationScreenPremium'
import ConnectingScreenPremium from './screens/ConnectingScreenPremium'
import VideoCallScreenPremium from './screens/VideoCallScreenPremium'
import PostConsultationScreenPremium from './screens/PostConsultationScreenPremium'
import MyRecordsScreenPremium from './screens/MyRecordsScreenPremium'
import AIChatScreenPremium from './screens/AIChatScreenPremium'
import ProfileScreenPremium from './screens/ProfileScreenPremium'
import AnalysisUploadScreenPremium from './screens/AnalysisUploadScreenPremium'
import AnalysisProcessingScreenPremium from './screens/AnalysisProcessingScreenPremium'
import AnalysisResultScreenPremium from './screens/AnalysisResultScreenPremium'
import SickLeaveScreenPremium from './screens/SickLeaveScreenPremium'
import MedicationInfoScreenPremium from './screens/MedicationInfoScreenPremium'
import DoctorReviewsScreenPremium from './screens/DoctorReviewsScreenPremium'
import SupportChatScreenPremium from './screens/SupportChatScreenPremium'
import NotificationsScreenPremium from './screens/NotificationsScreenPremium'
import AllServicesScreenV2Premium from './screens/AllServicesScreenV2Premium'
import DutyDoctorScreen from './screens/DutyDoctorScreen'
import SecondOpinionScreen from './screens/SecondOpinionScreen'
import HealthManagerScreen from './screens/HealthManagerScreen'
import CheckupsScreen from './screens/CheckupsScreen'
import TravelMedicineScreen from './screens/TravelMedicineScreen'
import SchoolMedicineScreen from './screens/SchoolMedicineScreen'
import ServicesScreenPremium from './screens/ServicesScreenPremium'


// Screen Router
function ScreenRouter({ currentScreen, screenParams, nav }) {
  const screens = {
    home: <HomeScreenPremium nav={nav} />,
    'doctor-list': <DoctorListScreenPremium nav={nav} />,
    'doctor-profile': <DoctorProfileScreenPremium nav={nav} params={screenParams} />,
    'slot-booking': <SlotBookingScreenPremium nav={nav} params={screenParams} />,
    confirmation: <ConfirmationScreenPremium nav={nav} params={screenParams} />,
    connecting: <ConnectingScreenPremium nav={nav} params={screenParams} />,
    'video-call': <VideoCallScreenPremium nav={nav} params={screenParams} />,
    'post-consultation': <PostConsultationScreenPremium nav={nav} params={screenParams} />,
    'my-records': <MyRecordsScreenPremium nav={nav} />,
    'records': <MyRecordsScreenPremium nav={nav} />,
    'ai-chat': <AIChatScreenPremium nav={nav} />,
    profile: <ProfileScreenPremium nav={nav} />,
    'analysis-upload': <AnalysisUploadScreenPremium nav={nav} />,
    'analysis-processing': <AnalysisProcessingScreenPremium nav={nav} />,
    'analysis-result': <AnalysisResultScreenPremium nav={nav} />,
    'sick-leave': <SickLeaveScreenPremium nav={nav} />,
    'medication-info': <MedicationInfoScreenPremium nav={nav} />,
    'doctor-reviews': <DoctorReviewsScreenPremium nav={nav} params={screenParams} />,
    'support-chat': <SupportChatScreenPremium nav={nav} />,
    notifications: <NotificationsScreenPremium nav={nav} />,
    'all-services': <AllServicesScreenV2Premium nav={nav} />,
    'duty-doctor': <DutyDoctorScreen nav={nav} />,
    'second-opinion': <SecondOpinionScreen nav={nav} />,
    'health-manager': <HealthManagerScreen nav={nav} />,
    checkups: <CheckupsScreen nav={nav} />,
    'travel-medicine': <TravelMedicineScreen nav={nav} />,
    'school-medicine': <SchoolMedicineScreen nav={nav} />,
    pharmacy: <ServicesScreenPremium nav={nav} />
  }

  return (
    <div className="animate-slideUp" style={{ animationDuration: '0.3s' }}>
      {screens[currentScreen] || <HomeScreen nav={nav} />}
    </div>
  )
}

// Bottom Navigation
function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'records', icon: '📋', label: 'Записи' },
    { id: 'doctor-list', icon: '👨‍⚕️', label: 'Врачи' },
    { id: 'pharmacy', icon: '⚕️', label: 'Сервисы' },
    { id: 'profile', icon: '👤', label: 'Профиль' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 safe-area-inset-bottom">
      <div className="backdrop-blur-md bg-[rgba(13,17,23,0.8)] border-t border-[rgba(0,185,86,0.1)]">
        <div className="flex items-center justify-around min-h-[64px] sm:min-h-[64px] max-w-lg mx-auto pb-safe">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 sm:py-2 transition-all active:scale-95 min-h-[64px] sm:min-h-auto relative ${
                activeTab === tab.id ? 'text-[#00B956]' : 'text-[#94A3B8] hover:text-[#F9FAFB]'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute top-0 w-8 h-1 bg-[#00B956] rounded-b-full animate-slideDown" />
              )}
              <span className="text-2xl sm:text-xl">{tab.icon}</span>
              <span className="text-[11px] sm:text-xs font-600 text-center leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const nav = useNavigation()
  const [mounted, setMounted] = useState(false)

  // Initialize on mount
  useState(() => {
    setMounted(true)
  }, [])

  // Handle tab changes
  const handleTabChange = (tabId) => {
    nav.switchTab(tabId)
  }

  // Determine if we should show bottom nav
  const hideBottomNav = ['video-call', 'connecting'].includes(nav.currentScreen)

  if (!mounted) return <div className="min-h-screen bg-[#0D1117]"></div>

  return (
    <ToastProvider>
      <div className="fixed inset-0 bg-gradient-to-b from-[#000000] to-[#0a0a0a] flex items-center justify-center p-4">
        {/* Phone Frame */}
        <div className="w-full max-w-[390px] h-screen max-h-screen bg-black rounded-[40px] shadow-2xl overflow-hidden border-8 border-black relative flex flex-col">
          {/* Notch Simulation */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50"></div>

          {/* App Content */}
          <div className="flex-1 overflow-y-auto w-full bg-[#0D1117]">
            <ScreenRouter
              currentScreen={nav.currentScreen}
              screenParams={nav.currentParams}
              nav={nav}
            />
          </div>

          {/* Bottom navigation */}
          {!hideBottomNav && <BottomNav activeTab={nav.activeTab} onTabChange={handleTabChange} />}
        </div>

        {/* Global styles */}
        <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          --safe-area-inset-bottom: env(safe-area-inset-bottom, 0);
          --safe-area-inset-top: env(safe-area-inset-top, 0);
          --safe-area-inset-left: env(safe-area-inset-left, 0);
          --safe-area-inset-right: env(safe-area-inset-right, 0);
        }

        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #000000;
          color: #F9FAFB;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-touch-callout: none;
        }

        .safe-area-inset-bottom {
          padding-bottom: var(--safe-area-inset-bottom);
        }

        .pb-safe {
          padding-bottom: var(--safe-area-inset-bottom);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            backgroundPosition: -1000px 0;
          }
          100% {
            backgroundPosition: 1000px 0;
          }
        }

        @keyframes slideup {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-4px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }

        .animate-slideRight {
          animation: slideRight 0.4s ease-out forwards;
        }

        .animate-slideLeft {
          animation: slideLeft 0.4s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-slideup {
          animation: slideup 0.3s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0D1117;
        }

        ::-webkit-scrollbar-thumb {
          background: #1E2235;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #243050;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      </div>
    </ToastProvider>
  )
}
