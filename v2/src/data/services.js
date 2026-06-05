// Full service catalog for v2
export const SERVICES = {
  consultations: {
    title: "Онлайн-консультации",
    color: "green",
    colorClass: "border-l-4 border-green-500",
    items: [
      {
        id: "doctor-online",
        icon: "📹",
        title: "Врач онлайн",
        subtitle: "Ответ за 3 минуты",
        status: "active"
      },
      {
        id: "duty-24",
        icon: "🌙",
        title: "Дежурный врач 24/7",
        subtitle: "Всегда на связи",
        status: "active"
      },
      {
        id: "pediatrician",
        icon: "👶",
        title: "Педиатр онлайн",
        subtitle: "Для детей 0-18 лет",
        status: "active"
      },
      {
        id: "second-opinion",
        icon: "🔍",
        title: "Второе мнение врача",
        subtitle: "Загрузи документы",
        status: "soon"
      },
      {
        id: "family-doctor",
        icon: "👨‍👩‍👧",
        title: "Семейный врач",
        subtitle: "По подписке",
        status: "soon"
      },
      {
        id: "psychologist",
        icon: "🧠",
        title: "Психолог онлайн",
        subtitle: "Тревога, стресс, кризис",
        status: "soon"
      },
      {
        id: "dietologist",
        icon: "🥗",
        title: "Диетолог",
        subtitle: "Питание и вес",
        status: "soon"
      },
      {
        id: "gynecologist",
        icon: "🌸",
        title: "Гинеколог онлайн",
        subtitle: "Женское здоровье",
        status: "soon"
      },
    ]
  },

  ai_tools: {
    title: "AI-инструменты",
    color: "blue",
    colorClass: "border-l-4 border-blue-500",
    items: [
      {
        id: "analysis",
        icon: "🔬",
        title: "Понять мои анализы",
        subtitle: "PDF или фото",
        status: "active"
      },
      {
        id: "medication",
        icon: "💊",
        title: "Что за лекарство?",
        subtitle: "Сфотографируй упаковку",
        status: "active"
      },
      {
        id: "symptom-checker",
        icon: "🤔",
        title: "Проверить симптомы",
        subtitle: "Насколько серьёзно?",
        status: "active"
      },
      {
        id: "ecg",
        icon: "❤️",
        title: "Расшифровка ЭКГ",
        subtitle: "Фото плёнки → AI анализ",
        status: "soon"
      },
      {
        id: "mri",
        icon: "🧬",
        title: "МРТ / КТ снимки",
        subtitle: "Второе мнение",
        status: "soon"
      },
      {
        id: "health-diary",
        icon: "📊",
        title: "Дневник здоровья",
        subtitle: "Давление, сахар, вес",
        status: "soon"
      },
    ]
  },

  documents: {
    title: "Документы и справки",
    color: "amber",
    colorClass: "border-l-4 border-amber-500",
    items: [
      {
        id: "sick-leave",
        icon: "📄",
        title: "Больничный онлайн",
        subtitle: "15 минут · официально",
        status: "active"
      },
      {
        id: "work-cert",
        icon: "🏢",
        title: "Справка для работы",
        subtitle: "Форма 095/у",
        status: "soon"
      },
      {
        id: "sport-cert",
        icon: "🏊",
        title: "Справка для спорта",
        subtitle: "Бассейн, секция",
        status: "soon"
      },
      {
        id: "prescription",
        icon: "💊",
        title: "Рецепт онлайн",
        subtitle: "QR-код в аптеку",
        status: "soon"
      },
      {
        id: "health-passport",
        icon: "📘",
        title: "Медицинская книжка",
        subtitle: "Для работников",
        status: "soon"
      },
    ]
  },

  checkups: {
    title: "Чекапы и профилактика",
    color: "teal",
    colorClass: "border-l-4 border-teal-500",
    items: [
      {
        id: "checkup-basic",
        icon: "✅",
        title: "Базовый чекап",
        subtitle: "Анализы + врач",
        status: "soon",
        badge: "NEW"
      },
      {
        id: "checkup-men",
        icon: "👨",
        title: "Чекап для мужчин 35+",
        subtitle: "Профильный набор",
        status: "soon"
      },
      {
        id: "checkup-women",
        icon: "👩",
        title: "Чекап для женщин 35+",
        subtitle: "Женское здоровье",
        status: "soon"
      },
      {
        id: "checkup-child",
        icon: "🧒",
        title: "Детский чекап",
        subtitle: "Ежегодное обследование",
        status: "soon"
      },
    ]
  },

  school: {
    title: "Школьная и детская медицина",
    color: "purple",
    colorClass: "border-l-4 border-purple-500",
    items: [
      {
        id: "school-medicine",
        icon: "🏫",
        title: "Школьная медицина",
        subtitle: "Для учреждений",
        status: "soon",
        badge: "NEW"
      },
      {
        id: "child-health",
        icon: "👶",
        title: "Здоровье ребёнка",
        subtitle: "Педиатр онлайн",
        status: "active"
      },
      {
        id: "school-cert",
        icon: "📋",
        title: "Справка в школу",
        subtitle: "Не выходя из дома",
        status: "soon"
      },
    ]
  },

  travel: {
    title: "Медицина в путешествиях",
    color: "orange",
    colorClass: "border-l-4 border-orange-500",
    items: [
      {
        id: "travel-medicine",
        icon: "✈️",
        title: "Медпомощь за рубежом",
        subtitle: "Врач онлайн из любой страны",
        status: "soon",
        badge: "NEW"
      },
      {
        id: "travel-insurance",
        icon: "🛡️",
        title: "Медстрахование",
        subtitle: "Для путешественников",
        status: "soon"
      },
      {
        id: "vaccination",
        icon: "💉",
        title: "Прививки перед поездкой",
        subtitle: "Вакцинация",
        status: "soon"
      },
    ]
  },

  companion: {
    title: "Сопровождение и управление",
    color: "pink",
    colorClass: "border-l-4 border-pink-500",
    items: [
      {
        id: "health-manager",
        icon: "👤",
        title: "Менеджер здоровья",
        subtitle: "Персональный куратор",
        status: "soon",
        badge: "NEW"
      },
      {
        id: "pregnancy",
        icon: "🤱",
        title: "Ведение беременности",
        subtitle: "От зачатия до родов",
        status: "soon"
      },
      {
        id: "chronic",
        icon: "📈",
        title: "Хронические болезни",
        subtitle: "Диабет, гипертония, астма",
        status: "soon"
      },
    ]
  }
}

// Calculate stats
export function getStats() {
  let total = 0
  let active = 0

  Object.values(SERVICES).forEach(section => {
    section.items.forEach(item => {
      total++
      if (item.status === 'active') active++
    })
  })

  return {
    total,
    active,
    soon: total - active
  }
}
