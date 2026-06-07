import { Header, Card, Button } from '../components/UI'
import { Star, MessageSquare } from 'lucide-react'
import { DOCTORS, REVIEWS_SAMPLE } from '../data/mockData'

export default function DoctorReviewsScreenPremium({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const ratingDistribution = { 5: 11, 4: 2, 3: 1 }

  const getTotalReviews = () => Object.values(ratingDistribution).reduce((a, b) => a + b, 0)
  const totalReviews = getTotalReviews()

  return (
    <div className="min-h-screen bg-[#090D14] pb-24 safe-area-inset-bottom">
      <Header title={`Отзывы · ${doctor.name}`} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-6">
        {/* Rating Summary */}
        <Card variant="elevated" className="animate-fadeIn text-center">
          <div className="mb-4">
            <div className="text-4xl font-700 text-white mb-2">{doctor.rating}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(Math.round(doctor.rating))].map((_, i) => (
                <Star key={i} size={16} className="text-[#FFA500]" fill="#FFA500" />
              ))}
            </div>
            <p className="text-sm text-[#AAB3C5]">{totalReviews} отзывов</p>
          </div>

          {/* Rating Bars */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0
              const percentage = (count / totalReviews) * 100
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-xs text-[#AAB3C5] w-4">{rating}★</span>
                  <div className="flex-1 h-1 bg-[#2A3145] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFA500] rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#AAB3C5] w-6 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Reviews */}
        <div className="space-y-3">
          {REVIEWS_SAMPLE.map((review, idx) => (
            <Card key={review.id} className="animate-fadeIn" style={{ animationDelay: `${(idx + 1) * 50}ms` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#00C853]/20 to-[#00B85A]/20 border border-[#00C853]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-700 text-[#00C853]">{review.authorInitials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-600 text-sm text-white">{review.authorInitials}</h4>
                    <span className="text-xs text-[#AAB3C5]">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="text-[#FFA500]" fill="#FFA500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#AAB3C5] leading-5">{review.text}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Button variant="secondary" size="md" className="w-full flex items-center justify-center gap-2">
          <MessageSquare size={18} />
          Написать свой отзыв
        </Button>
      </div>
    </div>
  )
}
