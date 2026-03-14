type Props = {
  message?: string
}

export function FormError({ message }: Props) {

  if (!message) return null

  return (
    <p className="text-sm text-(--brand-red) mt-1">
      {message}
    </p>
  )
}