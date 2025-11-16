"use client"

import { ReactNode } from "react"
import { DashboardTopbar } from "./dashboard-topbar"

export function PriestDashboardShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardTopbar title={title} priestName="Pandit Rajesh Kumar" />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  )
}
