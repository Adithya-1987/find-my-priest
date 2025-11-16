"use client"

import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react"

type Notification = {
  id: string
  type: "booking_confirmation" | "booking_reminder" | "rating_request" | "priest_update"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

const typeIcon: Record<Notification["type"], any> = {
  booking_confirmation: CheckCircle2,
  booking_reminder: Bell,
  rating_request: Info,
  priest_update: AlertTriangle,
}

export function NotificationItem({ n, onToggleRead }: { n: Notification; onToggleRead: (id: string) => void }) {
  const Icon = typeIcon[n.type]
  return (
    <div className={`rounded-xl border p-4 flex items-start gap-3 transition-all ${n.read ? "bg-card border-border" : "bg-primary/5 border-primary/30"}`}>
      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-foreground">{n.title}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${n.read ? "bg-muted text-muted-foreground" : "bg-yellow-500 text-white"}`}>
            {n.read ? "Read" : "New"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
        <p className="text-[10px] text-muted-foreground mt-2">{n.timestamp.toLocaleString()}</p>
        <button onClick={() => onToggleRead(n.id)} className="mt-2 text-xs text-primary font-semibold">Mark as {n.read ? "Unread" : "Read"}</button>
      </div>
    </div>
  )
}
