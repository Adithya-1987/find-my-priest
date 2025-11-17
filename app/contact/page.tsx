"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToastNotification } from "@/hooks/use-toast-notification"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const toast = useToastNotification()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setName(""); setEmail(""); setMessage("")
    toast.success("Message sent! We'll reach out soon.")
  }

  return (
    <div className="min-h-[60vh] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header>
          <h1 className="font-serif text-3xl font-bold text-foreground">Contact Us</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Have questions about a booking or need help choosing the right service? Send us a message or use the contact info below.</p>
        </header>

        {/* Contact Info Cards */}
        <section className="grid sm:grid-cols-3 gap-4">
          {[{title:'Address',text:'New Delhi, India',icon:'📍'},{title:'Phone',text:'+91-98765-43210',icon:'📞'},{title:'Email',text:'support@findmypriest.com',icon:'✉️'}].map((c)=>(
            <div key={c.title} className="rounded-xl border bg-card p-5">
              <div className="text-xl">{c.icon}</div>
              <h3 className="font-semibold text-foreground mt-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </section>

        {/* Form + Hours */}
        <section className="grid md:grid-cols-2 gap-6">
          <form onSubmit={submit} className="space-y-4 bg-card border rounded-xl p-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
              <input className="w-full bg-input border border-border rounded-lg px-4 py-2" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input type="email" className="w-full bg-input border border-border rounded-lg px-4 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea rows={5} className="w-full bg-input border border-border rounded-lg px-4 py-2" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">Send</Button>
          </form>
          <div className="rounded-xl border bg-card p-6 space-y-3">
            <h2 className="font-semibold text-foreground">Support Hours</h2>
            <p className="text-sm text-muted-foreground">Mon–Fri: 9:00 AM – 6:00 PM</p>
            <p className="text-sm text-muted-foreground">Sat–Sun: 10:00 AM – 4:00 PM</p>
            <div className="pt-2">
              <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
              <p className="text-sm text-muted-foreground">We typically reply within 24 hours.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold text-foreground mb-3">FAQ</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">How can I change my booking details?</p>
              <p>Open your Dashboard and choose the booking; if rescheduling is available, you’ll see the option there.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Do you verify all priests?</p>
              <p>Yes, we review profiles, documents, and community feedback to ensure quality and authenticity.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
