import { ReactNode } from "react"

type Props = {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: Props) {

  return (
    <div className="border border-(--ui-border) rounded-xl p-10 text-center bg-white">

      <h3 className="text-lg font-semibold text-(--ui-text)">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}

    </div>
  )
}