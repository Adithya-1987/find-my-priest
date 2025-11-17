"use client"

import { useEffect, useState } from "react"
import { PriestDashboardShell } from "@/components/priest/dashboard-shell"
import { BookingRequestCard, type Booking } from "@/components/priest/booking-request-card"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { useToastNotification } from "@/hooks/use-toast-notification"
import { acceptBooking, fetchPendingBookings } from "@/lib/priest-mock"

export default function PriestBookingsPage() {
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState<Booking[]>([])
  const [selected, setSelected] = useState<Booking | null>(null)
  const [mode, setMode] = useState<"accept" | "reject" | null>(null)
  const toast = useToastNotification()

  useEffect(() => {
    (async () => {
      const data = await fetchPendingBookings()
      setPending(data)
      setLoading(false)
    })()
  }, [])

  const onAccept = (b: Booking) => {
    setSelected(b)
    setMode("accept")
  }

  const onReject = (b: Booking) => {
    setSelected(b)
    setMode("reject")
  }

  const confirm = async () => {
    if (!selected || !mode) return
    if (mode === "accept") {
      await acceptBooking(selected.id)
      setPending((p) => p.filter((x) => x.id !== selected.id))
      toast.success(`Booking from ${selected.userName} accepted!`)
    } else {
      setPending((p) => p.filter((x) => x.id !== selected.id))
      toast.info(`Booking from ${selected.userName} rejected`)
    }
    setSelected(null)
    setMode(null)
  }

  return (
    <PriestDashboardShell title="Booking Requests">
      {loading ? (
        <div className="space-y-3">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : pending.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No pending booking requests</div>
      ) : (
        <div className="space-y-3">
          {pending.map((b) => (
            <BookingRequestCard key={b.id} booking={b} onAccept={onAccept} onReject={onReject} />
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={!!mode}
        title={mode === "accept" ? "Accept Booking?" : "Reject Booking?"}
        message={selected ? (
          mode === "accept"
            ? `Accept booking request from ${selected.userName} for ${selected.service} on ${selected.date} at ${selected.time}?`
            : `Reject booking request from ${selected.userName}? This action cannot be undone.`
        ) : ""}
        confirmText={mode === "accept" ? "Accept" : "Reject"}
        confirmVariant={mode === "accept" ? "default" : "destructive"}
        onConfirm={confirm}
        onClose={() => { setMode(null); setSelected(null) }}
      />
    </PriestDashboardShell>
  )
}
