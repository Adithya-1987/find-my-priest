"use client"

import { useEffect, useState } from "react"
import { PriestDashboardShell } from "@/components/priest/dashboard-shell"
import { NotificationItem } from "@/components/priest/notification-item"
import { fetchNotifications } from "@/lib/priest-mock"

export default function PriestNotificationsPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const data = await fetchNotifications()
      setItems(data)
    })()
  }, [])

  const toggleRead = (id: string) => {
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
  }

  return (
    <PriestDashboardShell title="Notifications">
      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">No notifications</div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <NotificationItem key={n.id} n={n} onToggleRead={toggleRead} />
          ))}
        </div>
      )}
    </PriestDashboardShell>
  )
}
