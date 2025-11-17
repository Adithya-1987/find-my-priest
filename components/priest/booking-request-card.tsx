"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Booking = {
  id: string
  userName: string
  service: string
  date: string
  time: string
  amount: number
  location: string
  notes?: string
}

export function BookingRequestCard({ booking, onAccept, onReject }: {
  booking: Booking
  onAccept: (b: Booking) => void
  onReject: (b: Booking) => void
}) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-start">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Customer</p>
          <p className="font-semibold text-foreground text-sm">{booking.userName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Service</p>
          <p className="font-semibold text-foreground text-sm">{booking.service}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Calendar size={12}/> Date</p>
          <p className="font-semibold text-foreground text-sm">{booking.date}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Clock size={12}/> Time</p>
          <p className="font-semibold text-foreground text-sm">{booking.time}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><MapPin size={12}/> Location</p>
          <p className="font-semibold text-foreground text-sm truncate" title={booking.location}>{booking.location}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Amount</p>
          <p className="font-semibold text-foreground text-sm text-primary">₹{booking.amount}</p>
        </div>
        <div className="col-span-1 flex gap-2 justify-end">
          <Button size="sm" variant="outline" className="text-xs rounded-lg border-destructive text-destructive hover:bg-destructive/10" onClick={() => onReject(booking)}>Reject</Button>
          <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg" onClick={() => onAccept(booking)}>Accept</Button>
        </div>
      </div>
      {booking.notes && (
        <p className="mt-2 text-xs text-muted-foreground">Note: {booking.notes}</p>
      )}
    </div>
  )
}
