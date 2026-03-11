import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline"
  loading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  ...props
}: ButtonProps) {

  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"

  const styles = {
    primary:
      "bg-gradient-to-r from-(--brand-orange) to-(--brand-red) text-white hover:opacity-90",

    secondary:
      "bg-gray-100 text-(--brand-dark) hover:bg-gray-200",

    danger:
      "bg-(--brand-red) text-white hover:opacity-90",

    outline:
      "border border-gray-300 text-(--brand-dark) hover:bg-gray-100"
  }

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}