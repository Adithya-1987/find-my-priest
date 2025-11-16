"use client"

import { useEffect, useMemo, useState } from "react"
import { PriestDashboardShell } from "@/components/priest/dashboard-shell"
import { fetchConfirmedBookings } from "@/lib/priest-mock"
import { Modal } from "@/components/modal"

export default function PriestCalendarPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    (async () => {
      const data = await fetchConfirmedBookings()
      setBookings(data)
    })()
  }, [])

  const month = 10 // November (0-indexed)
  const year = 2025
  const days = useMemo(() => Array.from({ length: 30 }, (_, i) => new Date(year, month, i + 1)), [])

  const bookingsByDay = useMemo(() => {
    const map = new Map<string, any[]>()
    bookings.forEach((b) => {
      const d = new Date(b.date)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(b)
    })
    return map
  }, [bookings])

  const onSelect = (d: Date) => {
    setSelectedDate(d)
    setOpen(true)
  }

  const selectedKey = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}` : ""
  const selectedList = selectedKey ? bookingsByDay.get(selectedKey) ?? [] : []

  return (
    <PriestDashboardShell title="Calendar">
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4 text-sm">November {year} - Bookings</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
          ))}
          {days.map((d, idx) => {
            const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
            const count = bookingsByDay.get(key)?.length || 0
            return (
              <button
                key={idx}
                onClick={() => onSelect(d)}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all hover:shadow-md ${count>0 ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-muted-foreground"}`}
              >
                <span className="text-xs">{d.getDate()}</span>
                {count>0 && <span className="text-xs font-bold text-primary mt-0.5">{count}</span>}
              </button>
            )
          })}
        </div>
      </div>

      <Modal isOpen={open} title={selectedDate ? selectedDate.toDateString() : "Bookings"} onClose={() => setOpen(false)}>
        {selectedList.length === 0 ? (
          <div className="text-sm text-muted-foreground">No bookings</div>
        ) : (
          <div className="space-y-3">
            {selectedList.map((b) => (
              <div key={b.id} className="rounded-lg border p-3">
                <p className="text-sm font-semibold">{b.userName} • {b.service}</p>
                <p className="text-xs text-muted-foreground">{b.time} • {b.location}</p>
                {b.notes && <p className="text-xs text-muted-foreground mt-1">{b.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PriestDashboardShell>
  )
}
