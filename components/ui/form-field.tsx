import { ReactNode } from "react"

type Props = {
  label?: string
  required?: boolean
  description?: string
  error?: string
  children: ReactNode
}

export function FormField({
  label,
  required,
  description,
  error,
  children,
}: Props) {
  return (
    <div className="space-y-1.5">

      {label && (
        <label className="text-sm font-medium text-(--ui-text)">
          {label}
          {required && (
            <span className="text-(--brand-red) ml-1">*</span>
          )}
        </label>
      )}

      {children}

      {description && (
        <p className="text-xs text-gray-500">
          {description}
        </p>
      )}

      {error && (
        <p className="text-xs text-(--brand-red)">
          {error}
        </p>
      )}

    </div>
  )
}