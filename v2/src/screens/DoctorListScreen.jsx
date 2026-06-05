import { useState } from 'react'
import { Header, Input, Pill, DoctorCard, Button } from '../components/UI'
import { DOCTORS } from '../data/mockData'

const SPECIALTIES = ['Все', 'Терапевт', 'Педиатр', 'ЛОР', 'Кардиолог', 'Дерматолог', 'Психолог', 'Невролог']

export default function DoctorListScreen({ nav }) {
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все')
  const [sortBy, setSortBy] = useState('online')

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

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header
        title="Врач онлайн"
        subtitle={`● ${DOCTORS.filter((d) => d.status === 'online').length} онлайн`}
        onBack={() => nav.pop()}
        rightIcon={null}
      />

      <div className="px-4 space-y-3 pt-4">
        {/* Search */}
        <Input
          placeholder="Поиск врача или специальности..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon="🔍"
        />

        {/* Specialty Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-600 text-sm transition-all snap-center ${
                selectedSpecialty === spec
                  ? 'bg-[#00B956] text-white shadow-[0_4px_12px_rgba(0,185,86,0.3)]'
                  : 'bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {['Онлайн сейчас', 'По рейтингу', 'По цене'].map((option) => {
            const value = option === 'Онлайн сейчас' ? 'online' : option === 'По рейтингу' ? 'rating' : 'price'
            return (
              <button
                key={option}
                onClick={() => setSortBy(value)}
                className={`flex-1 px-3 py-2 rounded-[10px] text-xs font-600 transition-colors ${
                  sortBy === value
                    ? 'bg-[#00B956] text-white'
                    : 'bg-[#1E2235] text-[#94A3B8] border border-[rgba(255,255,255,0.08)]'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Online Doctors Section */}
        {onlineDoctors.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-xs font-700 uppercase text-[#94A3B8]">Доступны сейчас</h3>
            <div className="space-y-2">
              {onlineDoctors.map((doctor, idx) => (
                <div key={doctor.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-fadeIn">
                  <DoctorCard
                    doctor={doctor}
                    onTap={() => nav.push('doctor-profile', { doctorId: doctor.id })}
                    showPrice={true}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => nav.push('confirmation', { doctorId: doctor.id })}
                    className="w-full mt-2"
                  >
                    Начать ▶
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Doctors Section */}
        {otherDoctors.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="text-xs font-700 uppercase text-[#94A3B8]">По записи</h3>
            <div className="space-y-2">
              {otherDoctors.map((doctor, idx) => (
                <div key={doctor.id} style={{ animationDelay: `${(onlineDoctors.length + idx) * 50}ms` }} className="animate-fadeIn opacity-70">
                  <DoctorCard doctor={doctor} onTap={() => nav.push('doctor-profile', { doctorId: doctor.id })} />
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {doctor.available_slots.slice(0, 3).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => nav.push('slot-booking', { doctorId: doctor.id, slot })}
                        className="py-2 px-3 rounded-[10px] bg-[#1E2235] text-xs font-600 text-[#94A3B8] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,185,86,0.2)] transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sortedDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#94A3B8] text-sm">Врачи не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}
