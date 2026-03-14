"use client"

import React from "react"

type Props = {
  label?: string
  name: string
  value?: string
  placeholder?: string
  rows?: number
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({
  label,
  name,
  value,
  placeholder,
  rows = 3,
  required,
  onChange
}: Props) {

  return (

    <div className="flex flex-col gap-1">

      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="
          w-full
          px-3 py-2
          rounded-lg
          border
          border-(--ui-border)
          bg-white
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-(--brand-orange)
          resize-none
        "
      />

    </div>

  )

}