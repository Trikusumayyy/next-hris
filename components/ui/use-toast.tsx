"use client"

import { useState } from "react"
import { Toast } from "./toast"

type ToastType = "success" | "error" | "info"

type ToastItem = {
  id: string
  message: string
  type?: ToastType
}

export function useToast() {

  const [toasts, setToasts] = useState<ToastItem[]>([])

  function showToast(message: string, type?: ToastType) {

    const id = crypto.randomUUID()

    setToasts(prev => [...prev, { id, message, type }])
  }

  function removeToast(id: string) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-6 right-6 space-y-3 z-50">
      {toasts.map(t => (
        <Toast
          key={t.id}
          id={t.id}
          message={t.message}
          type={t.type}
          onClose={removeToast}
        />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}