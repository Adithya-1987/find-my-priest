import { Star } from 'lucide-react'

interface RatingStarsProps {
  rating: number
  size?: number
  showText?: boolean
  reviews?: number
}

export function RatingStars({ rating, size = 16, showText = false, reviews = 0 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted'}
          />
        ))}
      </div>
      {showText && reviews > 0 && (
        <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
      )}
      {showText && !reviews && (
        <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
