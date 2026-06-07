import { useState } from 'react'
import { Search, ChevronLeft } from 'lucide-react'
import { DoctorCard } from '../components/health/DoctorCard'
import { useToast } from '../contexts/ToastContext'
import { DOCTORS } from '../data/mockData'

const SPECIALTIES = ['Все', 'Терапевт', 'Педиатр', 'ЛОР', 'Кардиолог', 'Дерматолог']

export default function DoctorListScreenPremium({ nav }) {
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все')
  const [sortBy, setSortBy] = useState('online')
  const { addToast } = useToast()

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
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
    nav.push('doctor-profile', { doctorId })
  }

  return (
    <div className="h-screen bg-[#090D14] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-gradient-to-b from-[#0D111A] via-[#0D111A] to-transparent border-b border-[#2A3145] px-4 py-4 flex items-center justify-between min-h-[60px]">
        <button
          onClick={() => nav.pop()}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#171C2B] transition-colors active:scale-95"
        >
          <ChevronLeft size={24} className="text-[#AAB3C5]" strokeWidth={1.5} />
        </button>

        <h1 className="text-lg font-600 text-white tracking-tight">Врачи</h1>

        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 space-y-3">
        {/* Search */}
        <div className="sticky top-0 bg-[#090D14] px-4 pt-3 pb-2 z-30">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5268]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#171C2B] border border-[#2A3145] rounded-[10px] pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#4A5268] outline-none focus:border-[#3B82F6]/50 transition-all"
            />
          </div>
        </div>

        {/* Specialty Filters - Compact */}
        <div className="px-4">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-[8px] text-xs font-500 transition-all whitespace-nowrap ${
                  selectedSpecialty === spec
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#171C2B] text-[#6B7280] border border-[#2A3145] hover:text-[#AAB3C5]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options - Compact */}
        <div className="px-4 flex gap-1.5">
          {['Онлайн', 'Рейтинг', 'Цена'].map((option) => {
            const value = option === 'Онлайн' ? 'online' : option === 'Рейтинг' ? 'rating' : 'price'
            return (
              <button
                key={option}
                onClick={() => setSortBy(value)}
                className={`flex-1 px-2.5 py-1.5 rounded-[8px] text-xs font-500 transition-all ${
                  sortBy === value
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#171C2B] text-[#6B7280] border border-[#2A3145] hover:text-[#AAB3C5]'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Online Doctors Section */}
        {onlineDoctors.length > 0 && (
          <div className="px-4 space-y-1">
            <h3 className="text-xs font-500 uppercase text-[#4A5268] tracking-wider px-1">Доступны сейчас ({onlineDoctors.length})</h3>
            <div className="space-y-0 border border-[#2A3145] rounded-[12px] overflow-hidden divide-y divide-[#2A3145]">
              {onlineDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={handleSelectDoctor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Doctors Section */}
        {otherDoctors.length > 0 && (
          <div className="px-4 space-y-1">
            <h3 className="text-xs font-500 uppercase text-[#4A5268] tracking-wider px-1">По записи ({otherDoctors.length})</h3>
            <div className="space-y-0 border border-[#2A3145] rounded-[12px] overflow-hidden divide-y divide-[#2A3145] opacity-75">
              {otherDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={handleSelectDoctor}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[#6B7280]">Врачи не найдены</p>
          </div>
        )}

        {/* Bottom Spacing */}
        <div className="h-1" />
      </div>
    </div>
  )
}
