import { mockBookings, mockNotifications } from "@/lib/mock-data"

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

export async function fetchPendingBookings() {
  await delay()
  return mockBookings.filter((b) => b.status === "pending").map((b) => ({
    id: b.id,
    userName: b.userName,
    service: b.service,
    date: b.date,
    time: b.time,
    amount: b.amount,
    location: b.location,
    notes: b.notes,
  }))
}

export async function fetchConfirmedBookings() {
  await delay()
  return mockBookings.filter((b) => b.status === "upcoming")
}

export async function acceptBooking(id: string) {
  await delay(500)
  return { ok: true, id }
}

export async function rejectBooking(id: string) {
  await delay(500)
  return { ok: true, id }
}

export async function fetchNotifications() {
  await delay()
  return mockNotifications
}

export type PriestProfile = {
  name: string
  bio: string
  experience: number
  languages: string[]
  services: string[]
  phone: string
  location: string
  photo?: string
}

let profile: PriestProfile = {
  name: "Pandit Rajesh Kumar",
  bio: "With over 15 years of experience in Vedic rituals and ceremonies, I provide authentic and meaningful spiritual services.",
  experience: 15,
  languages: ["Hindi", "Sanskrit", "English"],
  services: ["Griha Pravesh", "Vivah Samskara", "Satyanarayan Katha"],
  phone: "+91-98765-43210",
  location: "Delhi",
}

export async function fetchPriestProfile(): Promise<PriestProfile> {
  await delay()
  return { ...profile }
}

export async function updatePriestProfile(data: Partial<PriestProfile>) {
  await delay(500)
  profile = { ...profile, ...data }
  return { ok: true, profile }
}
