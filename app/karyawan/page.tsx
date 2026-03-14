"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import DashboardLayout from "@/components/layout/dashboard-layout"
import PageTitle from "@/components/ui/page-title"
import DataTable, { Column } from "@/components/ui/table"

type Karyawan = {
  id: number
  nik_karyawan: string
  nama_lengkap: string
  email: string
  nama_role: string
  status_karyawan: string
}

export default function KaryawanPage() {

  const [data, setData] = useState<Karyawan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {

      try {

        const res = await fetch("/api/karyawan")
        const result = await res.json()

        setData(result)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    load()

  }, [])

  const columns: Column<Karyawan>[] = [
    {
      header: "Nama",
      accessor: "nama_lengkap"
    },
    {
      header: "Email",
      accessor: "email"
    },
    {
      header: "Posisi",
      accessor: "nama_role"
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`
            px-2 py-1 text-xs rounded font-medium
            ${row.status_karyawan === "tetap"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"}
          `}
        >
          {row.status_karyawan}
        </span>
      )
    },
    {
      header: "Aksi",
      render: (row) => (
        <div className="flex gap-2">

          <Link
            href={`/karyawan/${row.nik_karyawan}`}
            className="text-sm px-3 py-1 rounded border border-(--ui-border)] hover:bg-gray-100"
          >
            Detail
          </Link>

          <Link
            href={`/karyawan/${row.nik_karyawan}/edit`}
            className="text-sm px-3 py-1 rounded text-white"
            style={{ background: "var(--brand-red)" }}
          >
            Edit
          </Link>

        </div>
      )
    }
  ]

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <PageTitle title="Karyawan" />

          <Link
            href="/karyawan/tambah"
            className="px-4 py-2 rounded text-white font-medium"
            style={{ background: "var(--brand-red)" }}
          >
            + Tambah Karyawan
          </Link>

        </div>

        <DataTable
          columns={columns}
          data={data}
          loading={loading}
        />

      </div>

    </DashboardLayout>

  )

}