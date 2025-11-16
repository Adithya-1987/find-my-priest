"use client"

import { useEffect, useState } from "react"
import { PriestDashboardShell } from "@/components/priest/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TagInput } from "@/components/priest/tag-input"
import { PriestProfile, fetchPriestProfile, updatePriestProfile } from "@/lib/priest-mock"
import { useToastNotification } from "@/hooks/use-toast-notification"

export default function PriestProfilePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PriestProfile | null>(null)
  const toast = useToastNotification()

  useEffect(() => {
    (async () => {
      const p = await fetchPriestProfile()
      setData(p)
      setLoading(false)
    })()
  }, [])

  const update = (patch: Partial<PriestProfile>) => setData((d) => d ? { ...d, ...patch } : d)

  const onSave = async () => {
    if (!data) return
    await updatePriestProfile(data)
    toast.success("Profile updated")
  }

  return (
    <PriestDashboardShell title="Profile">
      {loading || !data ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="max-w-2xl space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
            <Input value={data.name} onChange={(e) => update({ name: e.target.value })} className="rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Bio / About Me</label>
            <Textarea rows={4} value={data.bio} onChange={(e) => update({ bio: e.target.value })} className="rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Experience (years)</label>
            <Input type="number" value={data.experience} onChange={(e) => update({ experience: Number(e.target.value) })} className="rounded-lg" />
          </div>
          <TagInput label="Languages" values={data.languages} onChange={(vals) => update({ languages: vals })} placeholder="Add language" />
          <TagInput label="Services Offered" values={data.services} onChange={(vals) => update({ services: vals })} placeholder="Add service" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
              <Input value={data.phone} onChange={(e) => update({ phone: e.target.value })} className="rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
              <Input value={data.location} onChange={(e) => update({ location: e.target.value })} className="rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Profile Photo (frontend only)</label>
            <Input type="file" accept="image/*" onChange={(e) => update({ photo: e.target.files?.[0]?.name })} className="rounded-lg" />
            {data.photo && <p className="text-xs text-muted-foreground mt-1">Selected: {data.photo}</p>}
          </div>
          <div className="flex gap-3">
            <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">Save</Button>
            <Button variant="outline" className="rounded-lg">Cancel</Button>
          </div>
        </div>
      )}
    </PriestDashboardShell>
  )
}
