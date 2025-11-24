"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabaseClient } from "@/lib/supabase/client"
import { useToastNotification } from "@/hooks/use-toast-notification"

const CEREMONY_OPTIONS = [
  "Wedding",
  "Pooja / Homam",
  "Housewarming (Grihapravesham)",
  "Naming Ceremony",
  "Funeral / Shraddham",
  "Festivals (Ganesh Puja, Lakshmi Puja, etc.)",
  "Satyanarayana Vratham",
  "Vastu Pooja",
  "Other",
]

const TRAINING_OPTIONS = [
  { value: "gurukulam", label: "Gurukulam / Veda Pathashala" },
  { value: "family", label: "Family tradition" },
  { value: "self", label: "Self-learned experience" },
]

const AVAILABILITY_OPTIONS = [
  { value: "city", label: "Anywhere in the city" },
  { value: "states", label: "Other states" },
  { value: "local", label: "Only local area" },
]

const fileSchema = z
  .custom<FileList>((val) => val instanceof FileList, "Required")
  .refine((files) => files && files.length > 0, "Required")

const priestSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Enter a valid email"),
  language: z.string().min(1, "Language is required"),
  experienceYears: z.coerce.number().min(0, "Experience is required"),
  ceremonies: z.array(z.string()).min(1, "Select at least one ceremony"),
  otherCeremony: z.string().optional(),
  trainingType: z.string().min(1, "Select your training"),
  templeAssociation: z.string().min(1, "Temple or organisation is required"),
  availability: z.string().min(1, "Availability is required"),
  profilePhoto: fileSchema,
  ceremonialPhotos: fileSchema,
  idProof: fileSchema,
  certificate: z
    .custom<FileList>((val) => !val || val instanceof FileList)
    .optional(),
})

type PriestFormValues = z.infer<typeof priestSchema>

const defaultValues: Partial<PriestFormValues> = {
  fullName: "",
  phone: "",
  email: "",
  language: "",
  experienceYears: 0,
  ceremonies: [],
  otherCeremony: "",
  trainingType: "",
  templeAssociation: "",
  availability: "",
}

async function uploadFile(bucket: string, file: File) {
  const path = `${Date.now()}-${crypto.randomUUID()}-${file.name}`
  const { error } = await supabaseClient.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw error
  }

  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export default function PriestSignupPage() {
  const toast = useToastNotification()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PriestFormValues>({
    resolver: zodResolver(priestSchema),
    defaultValues,
  })

  const selectedCeremonies = watch("ceremonies")
  const otherCeremonyValue = watch("otherCeremony")?.trim()

  const ceremonyList = useMemo(() => {
    if (!selectedCeremonies) return []
    if (!selectedCeremonies.includes("Other")) return selectedCeremonies
    if (otherCeremonyValue) {
      return selectedCeremonies.map((item) => (item === "Other" ? otherCeremonyValue : item))
    }
    return selectedCeremonies.filter((item) => item !== "Other")
  }, [selectedCeremonies, otherCeremonyValue])

  const onSubmit = async (values: PriestFormValues) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const profilePhotoFile = values.profilePhoto.item(0)!
      const idProofFile = values.idProof.item(0)!
      const ceremonialPhotoFiles = Array.from(values.ceremonialPhotos)
      const certificateFile = values.certificate?.item(0)

      const [profilePhotoUrl, idProofUrl] = await Promise.all([
        uploadFile("priest-profile", profilePhotoFile),
        uploadFile("priest-id", idProofFile),
      ])

      const ceremonialPhotoUrls: string[] = []
      for (const file of ceremonialPhotoFiles) {
        ceremonialPhotoUrls.push(await uploadFile("priest-ceremonies", file))
      }

      const certificateUrl = certificateFile
        ? await uploadFile("priest-certificates", certificateFile)
        : null

      const { error } = await supabaseClient.from("priests").insert({
        full_name: values.fullName,
        phone: values.phone,
        email: values.email,
        language: values.language,
        experience_years: values.experienceYears,
        ceremonies: ceremonyList,
        training_type: values.trainingType,
        temple_association: values.templeAssociation,
        availability: values.availability,
        profile_photo_url: profilePhotoUrl,
        ceremonial_photos: ceremonialPhotoUrls,
        id_proof_url: idProofUrl,
        certificate_url: certificateUrl,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success("Submitted for verification")
      reset(defaultValues)
    } catch (error: any) {
      setServerError(error?.message ?? "Something went wrong")
      toast.error("Unable to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center">
              <span className="text-white font-serif text-3xl font-bold">ॐ</span>
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground">Priest Signup</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Submit your verified details to join the Find My Priest network. Our team reviews each application carefully.
              </p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive">
                {serverError}
              </div>
            )}

            <Card className="p-8 border border-border rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Personal Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name (as per ID proof)</label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Pandit Full Name"
                  />
                  {errors.fullName && <p className="text-sm text-destructive mt-2">{errors.fullName.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-2">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-2">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferable Language</label>
                    <input
                      type="text"
                      {...register("language")}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Hindi, Sanskrit"
                    />
                    {errors.language && <p className="text-sm text-destructive mt-2">{errors.language.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <input
                      type="number"
                      min={0}
                      {...register("experienceYears")}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="15"
                    />
                    {errors.experienceYears && <p className="text-sm text-destructive mt-2">{errors.experienceYears.message}</p>}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border border-border rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Ceremonies You Can Perform</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {CEREMONY_OPTIONS.map((ceremony) => (
                    <label
                      key={ceremony}
                      className={`border rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer transition ${
                        selectedCeremonies?.includes(ceremony)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={ceremony}
                        className="hidden"
                        {...register("ceremonies")}
                      />
                      <span className="text-sm font-medium">{ceremony}</span>
                    </label>
                  ))}
                </div>
                {selectedCeremonies?.includes("Other") && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Please describe other ceremonies</label>
                    <input
                      type="text"
                      {...register("otherCeremony")}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Describe other ceremonies"
                    />
                  </div>
                )}
                {errors.ceremonies && <p className="text-sm text-destructive">{errors.ceremonies.message}</p>}
              </div>
            </Card>

            <Card className="p-8 border border-border rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Training & Availability</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Have you received formal training?</label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {TRAINING_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`border rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer transition ${
                          watch("trainingType") === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          className="hidden"
                          {...register("trainingType")}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {errors.trainingType && <p className="text-sm text-destructive mt-2">{errors.trainingType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Temple / Organisation associated with</label>
                  <input
                    type="text"
                    {...register("templeAssociation")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Temple name"
                  />
                  {errors.templeAssociation && <p className="text-sm text-destructive mt-2">{errors.templeAssociation.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Available for bookings in other locations?</label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`border rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer transition ${
                          watch("availability") === option.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          className="hidden"
                          {...register("availability")}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {errors.availability && <p className="text-sm text-destructive mt-2">{errors.availability.message}</p>}
                </div>
              </div>
            </Card>

            <Card className="p-8 border border-border rounded-2xl">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Upload Documents & Photos</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Upload Your Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("profilePhoto")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground"
                  />
                  {errors.profilePhoto && <p className="text-sm text-destructive mt-2">Profile photo is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Upload photos of ceremonies you’ve performed</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("ceremonialPhotos")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground"
                  />
                  {errors.ceremonialPhotos && (
                    <p className="text-sm text-destructive mt-2">Please upload at least one ceremony photo</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Upload ID Proof (Aadhar/PAN/Govt ID)</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    {...register("idProof")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground"
                  />
                  {errors.idProof && <p className="text-sm text-destructive mt-2">ID proof is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Upload Training / Certificate (optional)</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    {...register("certificate")}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
