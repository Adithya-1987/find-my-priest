import React from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function FormInput({ label, error, icon, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className={`flex items-center gap-3 bg-input rounded-lg px-4 py-3 border-2 transition-colors ${
        error ? 'border-destructive' : 'border-border focus-within:border-primary'
      }`}>
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <input
          {...props}
          className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
