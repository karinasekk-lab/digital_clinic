// Mock data for telemedicine app
export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Айгуль Сейткали',
    specialty: 'Терапевт',
    experience: 8,
    rating: 4.91,
    reviews: 14,
    price: 4900,
    cashback: 980,
    status: 'online',
    waitTime: 2,
    clinic: 'Medical Center Plus',
    languages: ['Рус', 'Каз'],
    education: 'КНМУ 2016',
    city: 'Алматы',
    photo: '👩‍⚕️',
    about: 'Высокопрофессиональный врач-терапевт с 8-летним опытом. Специализируется на лечении острых респираторных инфекций, гипертонии и хронических заболеваний. Подход ориентирован на пациента, всегда проводит полную консультацию.',
    services: ['ОРВИ и грипп', 'Гипертония', 'Диабет', 'Хронические боли', 'Аллергия', 'Профилактика'],
    available_slots: ['09:00', '10:30', '14:00', '15:30', '16:45']
  },
  {
    id: 'doc-2',
    name: 'Нурлан Абдрахманов',
    specialty: 'Педиатр',
    experience: 10,
    rating: 4.88,
    reviews: 31,
    price: 5500,
    cashback: 1100,
    status: 'online',
    waitTime: 4,
    clinic: 'Kids Medical',
    languages: ['Рус', 'Каз'],
    education: 'МКЖД 2014',
    city: 'Алматы',
    photo: '👨‍⚕️',
    about: 'Опытный педиатр, работающий с детьми всех возрастов. Особое внимание уделяет профилактике и раннему выявлению заболеваний. Родители ценят его терпение и внимательность.',
    services: ['Болезни детей', 'Вакцинация', 'Развитие ребёнка', 'Питание грудничка'],
    available_slots: ['09:30', '11:00', '14:30', '15:00', '17:00']
  },
  {
    id: 'doc-3',
    name: 'Назым Ибраева',
    specialty: 'ЛОР',
    experience: 7,
    rating: 4.76,
    reviews: 8,
    price: 5500,
    cashback: 1100,
    status: 'busy',
    waitTime: 15,
    clinic: 'ENT Clinic',
    languages: ['Рус', 'Каз'],
    education: 'КНМУ 2017',
    city: 'Алматы',
    photo: '👩‍⚕️',
    about: 'Врач-отоларинголог со специализацией на лечении синусита и тонзиллита. Проводит тщательное обследование и предлагает современные методы лечения.',
    services: ['Синусит', 'Тонзиллит', 'Отит', 'Полипы', 'Храп'],
    available_slots: ['16:00', '17:30']
  },
  {
    id: 'doc-4',
    name: 'Марат Джаксыбеков',
    specialty: 'Кардиолог',
    experience: 15,
    rating: 4.95,
    reviews: 42,
    price: 7500,
    cashback: 1500,
    status: 'online',
    waitTime: 3,
    clinic: 'Heart Care Center',
    languages: ['Рус', 'Каз'],
    education: 'КНМУ 2009',
    city: 'Алматы',
    photo: '👨‍⚕️',
    about: 'Ведущий кардиолог с 15-летним опытом. Специализируется на диагностике и лечении аритмий, гипертонии и сердечной недостаточности. Проводит обучение пациентов основам кардиологии.',
    services: ['Аритмия', 'Гипертония', 'Боли в груди', 'Профилактика инфаркта'],
    available_slots: ['10:00', '11:30', '14:00', '15:30']
  },
  {
    id: 'doc-5',
    name: 'Дана Сабитова',
    specialty: 'Дерматолог',
    experience: 6,
    rating: 4.82,
    reviews: 19,
    price: 5000,
    cashback: 1000,
    status: 'scheduled',
    waitTime: 0,
    clinic: 'Skin Care Pro',
    languages: ['Рус', 'Каз'],
    education: 'КНМУ 2018',
    city: 'Алматы',
    photo: '👩‍⚕️',
    about: 'Дерматолог с опытом в лечении акне, экземы и дерматита. Применяет современные методики диагностики и лечения кожных заболеваний.',
    services: ['Акне', 'Экзема', 'Дерматит', 'Бородавки', 'Молодость кожи'],
    available_slots: ['09:00', '10:00', '11:00']
  }
]

export const CURRENT_USER = {
  id: 'user-1',
  firstName: 'Алихан',
  lastName: 'Серіков',
  iin: '021128000033',
  age: 28,
  city: 'Алматы',
  avatar: '👨',
  height: 178,
  weight: 75,
  bloodType: 'B(II)',
  gender: 'male',
  phone: '+7 (701) 234-56-78',
  email: 'alihan.serikkov@gmail.com',
  osmsStatus: 'active',
  osmsExpiry: '31.12.2026',
  subscriptionActive: true,
  subscriptionType: 'Семейный врач',
  subscriptionExpiry: '01.09.2026',
  familyMembers: 2,
  allergies: [],
  chronicDiseases: [],
  vaccinations: []
}

export const APPOINTMENTS = [
  {
    id: 'apt-1',
    doctorId: 'doc-1',
    doctor: DOCTORS[0],
    date: '2026-06-04',
    time: '14:00',
    duration: 30,
    status: 'upcoming',
    type: 'online',
    reason: 'Горло болит + температура 37.5',
    price: 4900,
    cashback: 980
  },
  {
    id: 'apt-2',
    doctorId: 'doc-2',
    doctor: DOCTORS[1],
    date: '2026-05-28',
    time: '10:30',
    duration: 30,
    status: 'completed',
    type: 'online',
    reason: 'Детский осмотр',
    diagnosis: 'Здоров',
    prescriptions: [],
    price: 5500,
    cashback: 1100
  }
]

export const ANALYSES = [
  {
    id: 'analysis-1',
    date: '2026-06-04',
    type: 'Общий анализ крови',
    status: 'completed',
    indicators: [
      {
        name: 'Гемоглобин',
        value: 142,
        unit: 'г/л',
        min: 120,
        max: 160,
        status: 'normal',
        explanation: 'Уровень нормальный, крови достаточно для перекачивания кислорода по организму'
      },
      {
        name: 'С-реактивный белок',
        value: 8.4,
        unit: 'мг/л',
        min: 0,
        max: 5,
        status: 'high',
        explanation: 'С-реактивный белок повышается при воспалении или инфекции. Значение 8.4 умеренно повышено — стоит обсудить с врачом.'
      },
      {
        name: 'Витамин D',
        value: 18,
        unit: 'нг/мл',
        min: 30,
        max: 100,
        status: 'low',
        explanation: 'Витамин D часто снижен в холодное время года. Рекомендуется приём препаратов и больше солнца.'
      },
      {
        name: 'Лейкоциты',
        value: 7.2,
        unit: '10^9/л',
        min: 4.5,
        max: 11,
        status: 'normal'
      },
      {
        name: 'Тромбоциты',
        value: 245,
        unit: '10^9/л',
        min: 150,
        max: 400,
        status: 'normal'
      }
    ],
    summary: 'В целом всё хорошо',
    alertCount: 2,
    recommendation: 'Умеренное повышение СРБ и низкий Витамин D — стоит обсудить с терапевтом. Не является поводом для паники.'
  }
]

export const MEDICATIONS = [
  {
    name: 'Амоксициллин 500 мг',
    type: 'Антибиотик',
    category: 'prescription',
    description: 'Убивает бактерии. Назначают при ангине, бронхите, пневмонии. Не работает против вирусов (ОРВИ, грипп).',
    dosage: '3 раза в день (каждые 8 часов)',
    duration: '7—10 дней',
    warnings: ['Не сочетать с алкоголем', 'Сообщите врачу об аллергии на пенициллин', 'Может вызвать дисбактериоз'],
    sideEffects: ['Тошнота', 'Диарея', 'Сыпь'],
    alternatives: [
      { name: 'Флемоксин Солютаб', price: 1200 },
      { name: 'Оспамокс', price: 900 },
      { name: 'Хиконцил', price: 700 }
    ]
  },
  {
    name: 'Парацетамол 500 мг',
    type: 'Жаропонижающее',
    category: 'otc',
    description: 'Снижает температуру и боль. Безопасен для взрослых и детей. Работает за 30 минут.',
    dosage: 'При температуре, 1-2 таблетки каждые 6 часов',
    duration: 'По необходимости, не более 7 дней',
    warnings: ['Не превышайте 4г в день', 'При проблемах с печенью — проконсультируйтесь'],
    sideEffects: ['Редко аллергия'],
    alternatives: [
      { name: 'Ибупрофен', price: 400 },
      { name: 'Нурофен', price: 800 }
    ]
  }
]

export const NEWS_AND_TIPS = [
  {
    id: 'news-1',
    title: '5 привычек здорового образа жизни',
    description: 'Простые правила, которые улучшат ваше здоровье на 30%',
    image: '🏃‍♂️',
    date: '02.06.2026'
  },
  {
    id: 'news-2',
    title: 'Витамин D: зачем он нужен?',
    description: 'Важный элемент для костей, иммунитета и настроения',
    image: '☀️',
    date: '01.06.2026'
  }
]

export const HEALTH_STATS = {
  bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
  pulse: null,
  weight: null,
  temperature: null
}

export const PRESCRIPTIONS = [
  {
    id: 'presc-1',
    medication: 'Амоксициллин 500мг',
    dosage: '3 раза в день',
    duration: '7 дней',
    startDate: '2026-06-04',
    endDate: '2026-06-11',
    reminder: true,
    status: 'active'
  },
  {
    id: 'presc-2',
    medication: 'Парацетамол 500мг',
    dosage: 'При температуре',
    duration: 'по необходимости',
    startDate: '2026-06-04',
    endDate: null,
    reminder: false,
    status: 'active'
  }
]

export const NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'appointment',
    title: 'Консультация через 15 минут',
    message: 'Айгуль Сейткали ждёт вас в 14:00',
    icon: '🗓',
    timestamp: Date.now() - 2 * 60000,
    read: false
  },
  {
    id: 'notif-2',
    type: 'completed',
    title: 'Консультация завершена',
    message: 'Назначения сохранены',
    icon: '✓',
    timestamp: Date.now() - 86400000
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'Напомнить принять Амоксициллин',
    message: 'в 20:00 · 3/7 дней',
    icon: '💊',
    timestamp: Date.now() - 86400000
  },
  {
    id: 'notif-4',
    type: 'bonus',
    title: 'Начислено 980 ₸ бонусов',
    message: 'Спасибо за консультацию!',
    icon: '💰',
    timestamp: Date.now() - 172800000
  }
]

export const REVIEWS_SAMPLE = [
  {
    id: 'review-1',
    authorInitials: 'А.К.',
    date: '28.05.2026',
    rating: 5,
    text: 'Отличный врач, всё объяснила понятно. Помогло с первого раза.'
  },
  {
    id: 'review-2',
    authorInitials: 'М.Т.',
    date: '25.05.2026',
    rating: 4,
    text: 'Профессионально, но немного дорого.'
  },
  {
    id: 'review-3',
    authorInitials: 'Л.С.',
    date: '20.05.2026',
    rating: 5,
    text: 'Спасибо за быстрый ответ и помощь!'
  }
]
