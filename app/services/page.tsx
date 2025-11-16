"use client"

import { useMemo, useState } from "react"
import { mockServices } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

type Service = typeof mockServices[number]

function parseDurationHours(d: string): { min: number; max: number } {
  // Accept formats like "2 hours", "1-2 hours", "3-5 hours", "1.5 hours"
  const range = d.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/)
  if (range) return { min: parseFloat(range[1]), max: parseFloat(range[2]) }
  const single = d.match(/(\d+(?:\.\d+)?)/)
  if (single) {
    const n = parseFloat(single[1])
    return { min: n, max: n }
  }
  return { min: 0, max: 24 }
}

export default function ServicesPage() {
  const categories = useMemo(() => Array.from(new Set(mockServices.map(s => s.category))), [])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([...categories])
  const [search, setSearch] = useState<string>("")
  const [range, setRange] = useState<number[]>([0, 5]) // hours
  const [selected, setSelected] = useState<Service | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return mockServices.filter((s) => {
      const nameOk = q.length === 0 || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      const catOk = selectedCategories.includes(s.category)
      const { min, max } = parseDurationHours(s.duration)
      const durOk = max >= range[0] && min <= range[1] // overlap
      return nameOk && catOk && durOk
    })
  }, [search, selectedCategories, range])

  return (
    <div className="min-h-[60vh] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header>
          <h1 className="font-serif text-3xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Explore popular ceremonies and poojas. Filter by category and duration, then tap any card to see details.</p>
        </header>

        {/* Search + Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search services (e.g., Griha Pravesh, Rudrabhishek)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={selectedCategories.length === categories.length ? "default" : "outline"}
                onClick={() => setSelectedCategories([...categories])}
                className="rounded-lg"
              >
                All
              </Button>
              {categories.map(c => {
                const active = selectedCategories.includes(c)
                return (
                  <Button
                    key={c}
                    size="sm"
                    variant={active ? "default" : "outline"}
                    onClick={() => setSelectedCategories(prev => active ? prev.filter(x => x !== c) : [...prev, c])}
                    className="rounded-lg"
                  >
                    {c}
                  </Button>
                )
              })}
            </div>
            <div className="sm:ml-auto flex items-center gap-3 w-full sm:w-auto">
              <div className="text-xs text-muted-foreground whitespace-nowrap">Duration (hours)</div>
              <div className="flex-1 sm:w-64">
                <Slider value={range} min={0} max={6} step={0.5} onValueChange={(v) => setRange(v as number[])} />
              </div>
              <div className="text-xs font-semibold text-foreground">{range[0]}–{range[1]}h</div>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div key={s.name} className="rounded-xl border p-5 bg-card hover:shadow-md transition flex flex-col">
              <button className="text-left" onClick={() => setSelected(s)}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="font-semibold text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.duration} • {s.category}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
              </button>
              <div className="mt-4">
                <Button size="sm" className="rounded-lg" asChild>
                  <Link href={`/booking?service=${encodeURIComponent(s.name)}`}>Book Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-3">FAQ</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">How do I choose the right service?</p>
              <p>Open the service details and review the description and duration. You can also ask the priest for guidance during booking.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Can I reschedule?</p>
              <p>Yes, rescheduling depends on priest availability. Check your dashboard booking card for options.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selected} title={selected?.name || "Service Details"} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-3">
            <div className="text-4xl">{selected.icon}</div>
            <p className="text-sm text-muted-foreground">{selected.duration} • {selected.category}</p>
            <p className="text-sm text-foreground">{selected.description}</p>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">Note: Pricing and priest availability vary by location and date.</p>
            </div>
            <div className="pt-2">
              <Button className="rounded-lg" asChild>
                <Link href={`/booking?service=${encodeURIComponent(selected.name)}`}>Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
