"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, User, Bell, ClipboardList } from "lucide-react"

const links = [
  { href: "/priest/dashboard", label: "Overview", icon: Home },
  { href: "/priest/bookings", label: "Booking Requests", icon: ClipboardList },
  { href: "/priest/calendar", label: "Calendar", icon: Calendar },
  { href: "/priest/profile", label: "Profile", icon: User },
  { href: "/priest/notifications", label: "Notifications", icon: Bell },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-full sm:w-64 shrink-0 border-r border-border bg-card/50">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="font-serif text-xl font-bold text-foreground">Priest Panel</h2>
          <p className="text-xs text-muted-foreground">Find My Priest</p>
        </div>
        <nav className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
