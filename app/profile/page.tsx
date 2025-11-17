"use client"

import { useMemo } from "react"
import { useAppContext } from "@/context/app-context"
import { mockBookings } from "@/lib/mock-data"

export default function CustomerProfilePage() {
  const { currentUser } = useAppContext()
  const userName = currentUser?.name || "Guest User"
  const userId = currentUser?.id || "USER1"

  const myBookings = useMemo(() => mockBookings.filter(b => b.userId === userId), [userId])

  return (
    <div className="min-h-[60vh] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Welcome, {userName}</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-2">Your Bookings</h2>
          {myBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b) => (
                <div key={b.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-foreground">{b.service}</p>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">{b.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{b.date} • {b.time} • {b.location}</p>
                  <p className="text-xs text-muted-foreground">Priest: {b.priestName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
