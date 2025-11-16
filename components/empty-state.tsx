import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="font-serif text-xl font-bold text-foreground mb-2">{title}</h3>
      {description && <p className="text-muted-foreground mb-6">{description}</p>}
      {actionLabel && actionHref && (
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
