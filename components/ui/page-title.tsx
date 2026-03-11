interface PageTitleProps {
  title: string
  description?: string
}

export default function PageTitle({
  title,
  description
}: PageTitleProps) {

  return (
    <div className="mb-6">

      <h1 className="text-2xl font-semibold">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>
      )}

    </div>
  )
}