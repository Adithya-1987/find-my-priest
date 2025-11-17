"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TagInput({ label, values, onChange, placeholder = "Add item" }: {
  label: string
  values: string[]
  onChange: (vals: string[]) => void
  placeholder?: string
}) {
  const [input, setInput] = useState("")

  const add = () => {
    const v = input.trim()
    if (!v) return
    if (values.includes(v)) return
    onChange([...values, v])
    setInput("")
  }

  const remove = (v: string) => onChange(values.filter((x) => x !== v))

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-foreground">{label}</label>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} className="rounded-lg" />
        <Button type="button" onClick={add} className="rounded-lg">Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span key={v} className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 text-xs font-medium text-foreground flex items-center gap-2">
            {v}
            <X size={12} className="cursor-pointer" onClick={() => remove(v)} />
          </span>
        ))}
      </div>
    </div>
  )
}
