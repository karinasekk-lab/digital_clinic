import { useState } from 'react'
import { Header, ServiceCard, Button } from '../components/UI'
import { getIconComponent, hasLucideIcon } from '../utils/iconMap'

import { Video, Moon, Baby, Search, Users, Brain, Apple, Flower, Microscope, Pill, HelpCircle, Heart, Dna, BarChart3, FileText, Building2, Waves, CheckCircle2, User, TrendingUp, School, Shield, ClipboardList, Plane } from 'lucide-react'

const SERVICES = {
  consultations: {
    title: 'ОНЛАЙН-КОНСУЛЬТАЦИИ',
    colorBorder: 'green',
    items: [
      { id: 'doctor-online', icon: '📹', title: 'Врач онлайн', subtitle: 'Ответ за 3 минуты', status: 'active', price: '4 900 ₸' },
      { id: 'duty-doctor', icon: '🌙', title: 'Дежурный врач 24/7', subtitle: 'Всегда на связи', status: 'active', price: '4 900 ₸' },
      { id: 'pediatrician', icon: '👶', title: 'Педиатр онлайн', subtitle: 'Для детей 0-18 лет', status: 'active', price: '5 500 ₸' },
      { id: 'second-opinion', icon: '🔍', title: 'Второе мнение врача', subtitle: 'Загрузи документы → эксперт', status: 'soon' },
      { id: 'family-doctor', icon: '👨‍👩‍👧', title: 'Семейный врач', subtitle: 'Постоянный врач по подписке', status: 'soon' },
      { id: 'psychologist', icon: '🧠', title: 'Психолог онлайн', subtitle: 'Тревога, стресс, кризис', status: 'soon' },
      { id: 'dietician', icon: '🥗', title: 'Диетолог / нутрициолог', subtitle: 'Питание, вес, здоровье', status: 'soon' },
      { id: 'gynecologist', icon: '🌸', title: 'Гинеколог онлайн', subtitle: 'Женское здоровье', status: 'soon' }
    ]
  },
  ai_tools: {
    title: 'AI-ИНСТРУМЕНТЫ',
    colorBorder: 'blue',
    items: [
      { id: 'analysis-understanding', icon: '🔬', title: 'Понять мои анализы', subtitle: 'PDF или фото → объяснение', status: 'active' },
      { id: 'medication-info', icon: '💊', title: 'Что за лекарство?', subtitle: 'Сфотографируй упаковку', status: 'active' },
      { id: 'symptom-checker', icon: '🤔', title: 'Проверить симптомы', subtitle: 'Насколько серьёзно?', status: 'active' },
      { id: 'ecg-analysis', icon: '❤️', title: 'Расшифровка ЭКГ', subtitle: 'Фото плёнки → AI анализ', status: 'soon', badge: 'NEW' },
      { id: 'mri-analysis', icon: '🧬', title: 'МРТ / КТ снимки', subtitle: 'Второе мнение специалиста', status: 'soon' },
      { id: 'health-diary', icon: '📊', title: 'Дневник здоровья', subtitle: 'Давление, сахар, вес', status: 'soon' }
    ]
  },
  documents: {
    title: 'ДОКУМЕНТЫ И СПРАВКИ',
    colorBorder: 'amber',
    items: [
      { id: 'sick-leave', icon: '📄', title: 'Больничный онлайн', subtitle: '15 минут · официально', status: 'active' },
      { id: 'work-certificate', icon: '🏢', title: 'Справка для работы', subtitle: 'Форма 095/у', status: 'soon' },
      { id: 'sports-certificate', icon: '🏊', title: 'Справка для спорта', subtitle: 'Бассейн, секция, фитнес', status: 'soon' },
      { id: 'prescription', icon: '💊', title: 'Рецепт онлайн', subtitle: 'QR-код в аптеку', status: 'soon' },
      { id: 'medical-book', icon: '📘', title: 'Медицинская книжка', subtitle: 'Для работников питания, торговли', status: 'soon' }
    ]
  },
  checkups: {
    title: 'ЧЕКАПЫ И ПРОФИЛАКТИКА',
    colorBorder: 'teal',
    badge: 'NEW',
    items: [
      { id: 'basic-checkup', icon: '✅', title: 'Базовый чекап', subtitle: 'Анализы + расшифровка + врач', status: 'soon', badge: 'NEW' },
      { id: 'mens-checkup', icon: '👨', title: 'Чекап для мужчин 35+', subtitle: 'Профильный набор обследований', status: 'soon' },
      { id: 'womens-checkup', icon: '👩', title: 'Чекап для женщин 35+', subtitle: 'Женское здоровье', status: 'soon' },
      { id: 'kids-checkup', icon: '🧒', title: 'Детский чекап', subtitle: 'Ежегодное обследование', status: 'soon' }
    ]
  },
  school: {
    title: 'ШКОЛЬНАЯ МЕДИЦИНА',
    colorBorder: 'purple',
    badge: 'NEW',
    items: [
      { id: 'school-medicine', icon: '🏫', title: 'Школьная медицина', subtitle: 'Телемедицина для учреждений', status: 'soon', badge: 'NEW' },
      { id: 'child-health', icon: '👶', title: 'Здоровье ребёнка', subtitle: 'Педиатр онлайн 0-18 лет', status: 'active' },
      { id: 'school-certificate', icon: '📋', title: 'Справка в школу', subtitle: 'Не выходя из дома', status: 'soon' }
    ]
  },
  travel: {
    title: 'МЕДИЦИНА В ПУТЕШЕСТВИЯХ',
    colorBorder: 'orange',
    badge: 'NEW',
    items: [
      { id: 'travel-medicine', icon: '✈️', title: 'Медпомощь за рубежом', subtitle: 'Врач онлайн из любой страны', status: 'soon', badge: 'NEW' },
      { id: 'travel-insurance', icon: '🛡', title: 'Медстрахование', subtitle: 'Для путешественников', status: 'soon' }
    ]
  },
  support: {
    title: 'СОПРОВОЖДЕНИЕ',
    colorBorder: 'pink',
    badge: 'NEW',
    items: [
      { id: 'health-manager', icon: '👤', title: 'Менеджер здоровья', subtitle: 'Персональный куратор', status: 'soon', badge: 'NEW' },
      { id: 'pregnancy-care', icon: '🤱', title: 'Ведение беременности', subtitle: 'От зачатия до родов', status: 'soon' },
      { id: 'chronic-care', icon: '📈', title: 'Хронические болезни', subtitle: 'Диабет, гипертония — контроль', status: 'soon' }
    ]
  }
}

function getScreenRoute(serviceId) {
  const routes = {
    'doctor-online': 'doctor-list',
    'duty-doctor': 'duty-doctor',
    'pediatrician': 'doctor-list',
    'second-opinion': 'second-opinion',
    'family-doctor': 'family-doctor',
    'psychologist': 'doctor-list',
    'dietician': 'doctor-list',
    'gynecologist': 'doctor-list',
    'analysis-understanding': 'analysis-upload',
    'medication-info': 'medication-info',
    'symptom-checker': 'ai-chat',
    'ecg-analysis': 'analysis-upload',
    'mri-analysis': 'analysis-upload',
    'health-diary': 'profile',
    'sick-leave': 'sick-leave',
    'work-certificate': null,
    'sports-certificate': null,
    'prescription': null,
    'medical-book': null,
    'basic-checkup': 'checkups',
    'mens-checkup': 'checkups',
    'womens-checkup': 'checkups',
    'kids-checkup': 'checkups',
    'school-medicine': 'school-medicine',
    'child-health': 'doctor-list',
    'school-certificate': null,
    'travel-medicine': 'travel-medicine',
    'travel-insurance': null,
    'health-manager': 'health-manager',
    'pregnancy-care': null,
    'chronic-care': null
  }
  return routes[serviceId] || null
}

export default function AllServicesScreenV2({ nav }) {
  const countServices = Object.values(SERVICES).reduce((sum, section) => sum + section.items.length, 0)
  const countActive = Object.values(SERVICES).reduce((sum, section) => sum + section.items.filter(i => i.status === 'active').length, 0)
  const countSoon = countServices - countActive

  const handleServiceTap = (serviceId, status) => {
    if (status === 'soon') {
      // TODO: Show "Coming soon" toast + add to waitlist
      return
    }
    const route = getScreenRoute(serviceId)
    if (route) {
      nav.push(route, { serviceId })
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title="Все услуги" onBack={() => nav.pop()} />

      <div className="px-4 space-y-6 pt-4">
        {/* Stats */}
        <div className="text-xs text-[#94A3B8] text-center">
          <p className="font-600">
            {countServices} сервисов · {countActive} доступно · {countSoon} скоро
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4">
          {['Все', 'Онлайн', 'AI', 'Документы', 'Чекапы', 'Скоро'].map((filter) => (
            <button
              key={filter}
              className="flex-shrink-0 px-4 py-2 rounded-full font-600 text-xs snap-center bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.3)] transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services by Section */}
        {Object.entries(SERVICES).map(([key, section]) => (
          <div key={key} className="space-y-3">
            {/* Section Header */}
            <div className="flex items-center gap-2 px-2">
              <div className={`h-1.5 w-4 rounded-full bg-${
                section.colorBorder === 'green' ? '[#00B956]' :
                section.colorBorder === 'blue' ? '[#185FA5]' :
                section.colorBorder === 'amber' ? '[#EF9F27]' :
                section.colorBorder === 'teal' ? '[#06B6D4]' :
                section.colorBorder === 'purple' ? '[#A855F7]' :
                section.colorBorder === 'orange' ? '[#F97316]' :
                '[#EC4899]'
              }`} />
              <h2 className="text-xs font-700 uppercase text-[#94A3B8]">{section.title}</h2>
              {section.badge && (
                <span className="text-[10px] font-700 px-2 py-0.5 rounded-full bg-[#E24B4A] text-white ml-auto">
                  {section.badge}
                </span>
              )}
            </div>

            {/* Service Cards */}
            <div className="space-y-2">
              {section.items.map((item) => (
                <ServiceCard
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  status={item.status}
                  badge={item.badge}
                  colorBorder={section.colorBorder}
                  onTap={() => handleServiceTap(item.id, item.status)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="text-center py-6 border-t border-[#1E2235]">
          <p className="text-xs text-[#8A95B0]">
            Версия 2 · Полный каталог
            <br />
            EmAI × Freedom · 2026
          </p>
        </div>
      </div>
    </div>
  )
}
