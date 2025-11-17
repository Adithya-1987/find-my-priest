import { Star, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface PriestCardProps {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  location: string
  experience: number
  image: string
  price: number
}

export function PriestCard({
  id,
  name,
  specialty,
  rating,
  reviews,
  location,
  experience,
  image,
  price,
}: PriestCardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border group">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          ₹{price}/hr
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-accent font-medium mb-3">{specialty}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>{experience}+ years experience</span>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg" asChild>
          <Link href={`/booking?priest=${encodeURIComponent(name)}&specialty=${encodeURIComponent(specialty)}`}>
            Book Now
          </Link>
        </Button>
      </div>
    </div>
  )
}
