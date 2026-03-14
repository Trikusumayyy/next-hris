"use client"

type Props = {
  title: string
  children: React.ReactNode
}

export default function SectionForm({ title, children }: Props) {
  return (
    <div className="border border-(--ui-border) rounded-xl p-6 bg-white">

      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>

    </div>
  )
}