"use client"

import { Menu } from "lucide-react"

export function DashboardTopbar({ title = "Dashboard", priestName = "Pandit Ji" }: { title?: string; priestName?: string }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-foreground">
            <Menu size={18} />
          </button>
          <h1 className="font-serif text-lg font-bold text-foreground">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground">{priestName}</p>
            <p className="text-xs text-muted-foreground">Find My Priest</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">🙏</div>
        </div>
      </div>
    </header>
  )
}
