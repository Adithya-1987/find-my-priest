interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <div className={alignClass}>
      <h2 className="font-serif text-4xl font-bold text-foreground mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl">{subtitle}</p>}
    </div>
  )
}
