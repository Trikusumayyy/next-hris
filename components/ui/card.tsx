import React from "react"

export default function Card({
  children,
  className = ""
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white border border-(--ui-border) rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  )
}