export default function AboutPage() {
  return (
    <div className="min-h-[60vh] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div>
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white font-serif font-bold text-2xl">ॐ</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-3">About Find My Priest</h1>
          <p className="text-muted-foreground leading-7 max-w-3xl">
            Find My Priest connects devotees with verified priests for poojas, ceremonies, and spiritual services. Our goal is to
            make sacred rituals accessible, authentic, and seamless while honoring tradition and community.
          </p>
        </div>

        {/* Mission */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold text-foreground mb-2">Our Mission</h2>
            <p className="text-sm text-muted-foreground">
              Empower families to celebrate life’s milestones with confidence—by making it simple to find trustworthy priests,
              transparent pricing, and dependable availability.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold text-foreground mb-2">What We Offer</h2>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Curated and verified priest profiles with ratings</li>
              <li>Clear service descriptions and durations</li>
              <li>Simple booking, reminders, and support</li>
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Search', text: 'Filter by service, language, location, and date' },
              { step: '2', title: 'Compare', text: 'Review profiles, ratings, and availability' },
              { step: '3', title: 'Book', text: 'Confirm instantly and receive reminders' },
            ].map((s) => (
              <div key={s.step} className="rounded-xl border bg-card p-5">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-2">{s.step}</div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust & Safety */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Trust & Safety</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Verification', text: 'Profiles reviewed and verified by our team' },
              { title: 'Reviews', text: 'Transparent ratings and community feedback' },
              { title: 'Support', text: 'Dedicated support for your bookings' },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border p-4 bg-card">
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Verified Priests', value: '250+' },
            { label: 'Bookings Completed', value: '10k+' },
            { label: 'Avg. Rating', value: '4.8/5' },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border bg-card p-6 text-center">
              <p className="font-serif text-3xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
