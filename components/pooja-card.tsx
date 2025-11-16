import { Card } from '@/components/ui/card'
import { Clock, Users } from 'lucide-react'

interface PoojaCardProps {
  name: string
  duration: string
  description: string
  category: string
  icon: React.ReactNode
}

export function PoojaCard({ name, duration, description, category, icon }: PoojaCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-0 rounded-2xl">
      <div className="text-4xl mb-4 text-primary">{icon}</div>
      <h3 className="font-serif text-lg font-bold text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{duration}</span>
        </div>
        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
          {category}
        </span>
      </div>
    </Card>
  )
}
