import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon = <Search size={48} />,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-muted-foreground mb-4 animate-in fade-in duration-500">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
