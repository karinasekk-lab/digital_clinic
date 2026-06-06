// Форматирование даты: "2026-06-04 · 14:00—14:30" → "Ср, 4 июня · 14:00—14:30"

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export function formatDate(dateString) {
  const date = new Date(dateString)
  const dayName = dayNames[date.getDay()]
  const dayNum = date.getDate()
  const monthName = monthNames[date.getMonth()]

  return `${dayName}, ${dayNum} ${monthName}`
}

export function formatDateTime(dateString, timeString) {
  return `${formatDate(dateString)} · ${timeString}`
}

export function maskIIN(iin) {
  if (!iin || iin.length < 8) return iin
  return `${iin.slice(0, 4)} ···· ${iin.slice(-4)}`
}
