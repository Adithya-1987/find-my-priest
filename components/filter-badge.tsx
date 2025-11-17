import { X } from 'lucide-react'

interface FilterBadgeProps {
  label: string
  value: string
  onRemove: () => void
}

export function FilterBadge({ label, value, onRemove }: FilterBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 text-sm text-foreground animate-in fade-in slide-in-from-left-2 duration-300">
      <span className="font-medium">{label}:</span>
      <span className="text-primary font-semibold">{value}</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} />
      </button>
    </div>
  )
}
