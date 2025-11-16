export function SkeletonLoader() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <div className="h-48 bg-gradient-to-r from-muted via-card to-muted animate-pulse"></div>
      <div className="p-5 space-y-4">
        <div className="h-6 bg-muted rounded-lg w-3/4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded-lg w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-4 bg-muted rounded-lg w-5/6 animate-pulse"></div>
        </div>
        <div className="h-10 bg-muted rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}

export function BookingListSkeleton() {
  return (
    <div className="space-y-3">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 space-y-3 animate-pulse">
          <div className="h-5 bg-muted rounded-lg w-1/3"></div>
          <div className="h-4 bg-muted rounded-lg w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-muted rounded-lg flex-1"></div>
            <div className="h-10 bg-muted rounded-lg flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
