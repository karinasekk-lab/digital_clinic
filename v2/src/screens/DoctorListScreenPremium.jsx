import { useState } from 'react'
import { Search, Star, AlertCircle, MapPin } from 'lucide-react'
import { Header, Button } from '../components/UI'
import { useToast } from '../contexts/ToastContext'
import { DOCTORS } from '../data/mockData'

const SPECIALTIES = ['Все', 'Терапевт', 'Педиатр', 'ЛОР', 'Кардиолог', 'Дерматолог', 'Психолог', 'Невролог']

export default function DoctorListScreenPremium({ nav }) {
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все')
  const [sortBy, setSortBy] = useState('online')
  const { addToast } = useToast()

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase()) || doctor.specialty.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'Все' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'online') return a.status === 'online' ? -1 : 1
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price') return a.price - b.price
    return 0
  })

  const onlineDoctors = sortedDoctors.filter((d) => d.status === 'online')
  const otherDoctors = sortedDoctors.filter((d) => d.status !== 'online')

  const handleSelectDoctor = (doctorId) => {
    const doctor = DOCTORS.find((d) => d.id === doctorId)
    addToast(`${doctor?.name} выбран`, 'success', 1500)
    nav.push('doctor-profile', { doctorId })
  }

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      {/* Header */}
      <Header
        title="Врач онлайн"
        subtitle={
          <div className="flex items-center gap-1.5">
            <AlertCircle size={14} className="text-[#00C853]" fill="currentColor" />
            <span className="text-[#00C853] font-600">{onlineDoctors.length} врачей онлайн</span>
          </div>
        }
        onBack={() => nav.pop()}
      />

      <div className="px-4 space-y-4 pt-4 overflow-y-auto">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5268]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Поиск врача..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[16px] pl-10 pr-4 py-3 text-white placeholder-[#4A5268] outline-none focus:border-[#00C853]/50 transition-all"
          />
        </div>

        {/* Specialty Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`flex-shrink-0 px-4 py-2 rounded-[12px] font-600 text-sm transition-all whitespace-nowrap ${
                selectedSpecialty === spec
                  ? 'bg-[#00C853] text-white shadow-lg shadow-[#00C853]/20'
                  : 'bg-[#171C2B] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/30'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {['Онлайн', 'Рейтинг', 'Цена'].map((option) => {
            const value = option === 'Онлайн' ? 'online' : option === 'Рейтинг' ? 'rating' : 'price'
            return (
              <button
                key={option}
                onClick={() => setSortBy(value)}
                className={`flex-1 px-3 py-2 rounded-[12px] text-xs font-600 transition-all ${
                  sortBy === value
                    ? 'bg-[#00C853] text-white'
                    : 'bg-[#171C2B] text-[#AAB3C5] border border-[#2A3145] hover:border-[#00C853]/30'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Online Doctors */}
        {onlineDoctors.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider px-1">Доступны сейчас</h3>
            <div className="space-y-2">
              {onlineDoctors.map((doctor) => {
                const initials = doctor.name
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0].toUpperCase())
                  .join('')

                return (
                  <div key={doctor.id} className="bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 hover:border-[#00C853]/30 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#00C853] to-[#00B85A] flex items-center justify-center flex-shrink-0">
                        <span className="text-base font-700 text-white">{initials}</span>
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-700 text-white text-sm">{doctor.name}</h3>
                          <div className="flex items-center gap-0.5">
                            <Star size={12} className="text-[#FFA500]" fill="#FFA500" />
                            <span className="text-xs font-600 text-white">{doctor.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#AAB3C5] mt-0.5">{doctor.specialty}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <AlertCircle size={12} className="text-[#00C853]" fill="currentColor" />
                          <span className="text-[10px] font-600 text-[#00C853]">Онлайн • ответ ~{doctor.waitTime} мин</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-700 text-white">{doctor.price.toLocaleString()} ₸</p>
                        <p className="text-[10px] text-[#00C853] mt-0.5">{doctor.cashback.toLocaleString()} ₸</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSelectDoctor(doctor.id)}
                      size="sm"
                      className="w-full"
                    >
                      Начать консультацию
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Other Doctors */}
        {otherDoctors.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-xs font-700 uppercase text-[#4A5268] tracking-wider px-1">По записи</h3>
            <div className="space-y-2">
              {otherDoctors.map((doctor) => {
                const initials = doctor.name
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0].toUpperCase())
                  .join('')

                return (
                  <button
                    key={doctor.id}
                    onClick={() => handleSelectDoctor(doctor.id)}
                    className="w-full text-left bg-[#171C2B] border border-[#2A3145] rounded-[20px] p-4 hover:border-[#00C853]/30 transition-all opacity-70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#00C853]/20 to-[#00B85A]/20 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-700 text-[#00C853]">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-700 text-white truncate">{doctor.name}</p>
                        <p className="text-xs text-[#AAB3C5] mt-0.5">{doctor.specialty}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {sortedDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#AAB3C5] text-sm">Врачи не найдены</p>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  )
}
