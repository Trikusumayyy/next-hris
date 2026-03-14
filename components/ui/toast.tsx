"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

type ToastProps = {
  id: string
  message: string
  type?: "success" | "error" | "info"
  onClose: (id: string) => void
}

export function Toast({ id, message, type = "info", onClose }: ToastProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 4000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  const colors = {
    success: "bg-green-500",
    error: "bg-[var(--brand-red)]",
    info: "bg-[var(--brand-orange)]"
  }

  return (
    <div className={`flex items-center gap-3 text-white px-4 py-3 rounded-lg shadow ${colors[type]}`}>
      <span className="text-sm">{message}</span>

      <button onClick={() => onClose(id)}>
        <X size={16} />
      </button>
    </div>
  )
}