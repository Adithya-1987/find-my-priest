'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

interface RatingInputProps {
  value: number
  onChange: (rating: number) => void
  disabled?: boolean
}

export function RatingInput({ value, onChange, disabled }: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="flex gap-2">
      {Array(5).fill(0).map((_, i) => (
        <button
          key={i}
          onClick={() => !disabled && onChange(i + 1)}
          onMouseEnter={() => !disabled && setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(0)}
          disabled={disabled}
          className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
        >
          <Star
            size={32}
            className={`${
              i < (hoverValue || value)
                ? 'fill-primary text-primary'
                : 'text-muted-foreground'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}
