"use client"

type Props = {
  open: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title = "Konfirmasi",
  description = "Apakah kamu yakin ingin melanjutkan?",
  onConfirm,
  onCancel,
}: Props) {

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white rounded-xl shadow-lg w-105 p-6">

        <h3 className="text-lg font-semibold text-(--ui-text)">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onCancel}
            className="px-4 py-2 border border-(--ui-border) rounded-lg text-sm"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white bg-(--brand-red) text-sm"
          >
            Hapus
          </button>

        </div>

      </div>

    </div>
  )
}