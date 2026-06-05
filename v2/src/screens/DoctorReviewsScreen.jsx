import { Header, Card, Button, Pill, RatingBar, RatingSummary } from '../components/UI'
import { DOCTORS, REVIEWS_SAMPLE } from '../data/mockData'

export default function DoctorReviewsScreen({ nav, params }) {
  const doctor = DOCTORS.find((d) => d.id === params.doctorId) || DOCTORS[0]
  const ratingDistribution = { 5: 11, 4: 2, 3: 1 }

  return (
    <div className="min-h-screen bg-[#0D1117] pb-24">
      <Header title={`Отзывы · ${doctor.name}`} onBack={() => nav.pop()} />

      <div className="px-4 space-y-4 pt-4">
        {/* Rating Summary */}
        <Card className="animate-fadeIn">
          <RatingSummary rating={doctor.rating} totalReviews={doctor.reviews} distribution={ratingDistribution} />

          {/* Rating Bars */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0
              return (
                <RatingBar
                  key={rating}
                  rating={rating}
                  count={count}
                  total={doctor.reviews}
                  color="#EF9F27"
                />
              )
            })}
          </div>
        </Card>

        {/* Reviews */}
        <div className="space-y-3">
          {REVIEWS_SAMPLE.map((review, idx) => (
            <Card key={review.id} className="animate-fadeIn" style={{ animationDelay: `${(idx + 1) * 50}ms` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#243050] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-700 text-[#F9FAFB]">{review.authorInitials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-600 text-sm text-[#F9FAFB]">{review.authorInitials}</h4>
                    <span className="text-xs text-[#94A3B8]">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#94A3B8] leading-5">{review.text}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Button variant="secondary" size="md" className="w-full">
          Написать свой отзыв
        </Button>
      </div>
    </div>
  )
}
