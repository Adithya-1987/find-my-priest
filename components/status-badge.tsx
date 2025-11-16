interface StatusBadgeProps {
  status: 'upcoming' | 'completed' | 'pending' | 'approved' | 'rejected' | 'active'
  children?: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusStyles = {
    upcoming: 'bg-accent/20 text-accent',
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-destructive/20 text-destructive',
    active: 'bg-green-100 text-green-700',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {children || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
