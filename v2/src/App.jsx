import { useState } from 'react'
import { useNavigation } from './hooks/useNavigation'
import { StatusBar } from './components/UI'

// Import all screens
import HomeScreen from './screens/HomeScreen'
import DoctorListScreen from './screens/DoctorListScreen'
import DoctorProfileScreen from './screens/DoctorProfileScreen'
import SlotBookingScreen from './screens/SlotBookingScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import ConnectingScreen from './screens/ConnectingScreen'
import VideoCallScreen from './screens/VideoCallScreen'
import PostConsultationScreen from './screens/PostConsultationScreen'
import MyRecordsScreen from './screens/MyRecordsScreen'
import AIChatScreen from './screens/AIChatScreen'
import ProfileScreen from './screens/ProfileScreen'
import AnalysisUploadScreen from './screens/AnalysisUploadScreen'
import AnalysisProcessingScreen from './screens/AnalysisProcessingScreen'
import AnalysisResultScreen from './screens/AnalysisResultScreen'
import SickLeaveScreen from './screens/SickLeaveScreen'
import MedicationInfoScreen from './screens/MedicationInfoScreen'
import DoctorReviewsScreen from './screens/DoctorReviewsScreen'
import SupportChatScreen from './screens/SupportChatScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import { SERVICES } from './data/services'

// All Services Screen (keep existing)
function AllServicesScreen({ nav }) {
  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <div className="sticky top-0 z-40 bg-gradient-to-b from-slate-900 to-transparent backdrop-blur-md border-b border-slate-800">
        <StatusBar />
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">← Все услуги</h1>
              <p className="text-xs mt-1" style={{ color: '#8A95B0' }}>
                35 сервисов · 8 доступно · 27 скоро
              </p>
            </div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l4 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {Object.entries(SERVICES).map(([key, section]) => (
          <div key={key} className="mb-6">
            <div className="flex items-center gap-2 mb-3 px-4">
              <div className={`h-6 w-1 rounded-full ${section.colorClass}`} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">{section.title}</h2>
            </div>
            <div className="px-4 grid grid-cols-2 gap-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  disabled={item.status !== 'active'}
                  className="w-full text-left rounded-xl p-3 transition-all active:scale-95 disabled:active:scale-100"
                  style={{
                    background: item.status === 'active' ? 'rgba(15,110,86,0.08)' : 'rgba(100,116,139,0.05)',
                    border: item.status === 'active' ? '1px solid rgba(0,185,86,0.2)' : '1px solid rgba(100,116,139,0.15)',
                    opacity: item.status === 'active' ? 1 : 0.6,
                    cursor: item.status === 'active' ? 'pointer' : 'default'
                  }}
                >
                  <div className="flex items-start gap-3 relative">
                    <div className="text-2xl pt-1">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white">{item.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#8A95B0' }}>{item.subtitle}</div>
                    </div>
                    {item.badge && (
                      <div className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: '#EF4444', color: 'white' }}>
                        {item.badge}
                      </div>
                    )}
                    {!item.badge && item.status !== 'active' && (
                      <div className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(100,116,139,0.2)', color: '#8A95B0' }}>
                        СКОРО
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="px-4 py-8 text-center text-xs border-t" style={{ borderColor: '#1E2235', color: '#8A95B0' }}>
          <p>Версия 2 · Полный каталог</p>
          <p>EmAI × Freedom · 2026</p>
        </div>
      </div>
    </div>
  )
}

// Screen Router
function ScreenRouter({ currentScreen, screenParams, nav }) {
  const screens = {
    home: <HomeScreen nav={nav} />,
    'doctor-list': <DoctorListScreen nav={nav} />,
    'doctor-profile': <DoctorProfileScreen nav={nav} params={screenParams} />,
    'slot-booking': <SlotBookingScreen nav={nav} params={screenParams} />,
    confirmation: <ConfirmationScreen nav={nav} params={screenParams} />,
    connecting: <ConnectingScreen nav={nav} params={screenParams} />,
    'video-call': <VideoCallScreen nav={nav} params={screenParams} />,
    'post-consultation': <PostConsultationScreen nav={nav} params={screenParams} />,
    'my-records': <MyRecordsScreen nav={nav} />,
    'records': <MyRecordsScreen nav={nav} />,
    'ai-chat': <AIChatScreen nav={nav} />,
    profile: <ProfileScreen nav={nav} />,
    'analysis-upload': <AnalysisUploadScreen nav={nav} />,
    'analysis-processing': <AnalysisProcessingScreen nav={nav} />,
    'analysis-result': <AnalysisResultScreen nav={nav} />,
    'sick-leave': <SickLeaveScreen nav={nav} />,
    'medication-info': <MedicationInfoScreen nav={nav} />,
    'doctor-reviews': <DoctorReviewsScreen nav={nav} params={screenParams} />,
    'support-chat': <SupportChatScreen nav={nav} />,
    notifications: <NotificationsScreen nav={nav} />,
    'all-services': <AllServicesScreen nav={nav} />
  }

  return screens[currentScreen] || <HomeScreen nav={nav} />
}

// Bottom Navigation
function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'records', icon: '📋', label: 'Записи' },
    { id: 'doctor-list', icon: '👨‍⚕️', label: 'Врачи' },
    { id: 'pharmacy', icon: '💊', label: 'Аптека' },
    { id: 'profile', icon: '👤', label: 'Профиль' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D1117] border-t border-[rgba(255,255,255,0.08)] z-40">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
              activeTab === tab.id ? 'text-[#00B956]' : 'text-[#94A3B8] hover:text-[#F9FAFB]'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-600">{tab.label}</span>
          </button>
        ))}
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
    <div className="fixed inset-0 bg-[#0D1117] flex flex-col overflow-hidden">
      {/* Screen content */}
      <div className="flex-1 overflow-y-auto">
        <ScreenRouter
          currentScreen={nav.currentScreen}
          screenParams={nav.currentParams}
          nav={nav}
        />
      </div>

      {/* Bottom navigation */}
      {!hideBottomNav && <BottomNav activeTab={nav.activeTab} onTabChange={handleTabChange} />}

      {/* Global styles */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #0D1117;
          color: #F9FAFB;
          overflow: hidden;
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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
  )
}
