"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarCheck,
  Wallet,
  FolderKanban,
  Package,
  Truck,
  Calculator,
  FileText,
  Menu,
  ChevronDown
} from "lucide-react"

import { LucideIcon } from "lucide-react"



/* =========================
   CATEGORY TITLE
========================= */

function Category({
  title,
  open
}: {
  title: string
  open: boolean
}) {

  if (!open) return null

  return (
    <p className="text-xs text-gray-300 uppercase tracking-wider px-2 pt-5 pb-2">
      {title}
    </p>
  )
}



/* =========================
   SUB MENU ITEM
========================= */

function SubMenuItem({
  href,
  label,
  pathname
}: {
  href: string
  label: string
  pathname: string
}) {

  const active = pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`
      relative px-2 py-1 rounded text-sm
      transition
      ${active
        ? "text-white font-medium"
        : "text-gray-400 hover:text-white"}
      `}
    >

      {active && (
        <span className="absolute -left-3 top-0 h-full w-1 bg-orange-500 rounded-r"></span>
      )}

      {label}

    </Link>
  )
}



/* =========================
   DROPDOWN MENU
========================= */

function DropdownMenu({
  icon: Icon,
  label,
  open,
  children
}: {
  icon: LucideIcon
  label: string
  open: boolean
  children: React.ReactNode
}) {

  const [expand, setExpand] = useState(false)

  return (
    <div>

      <button
        onClick={() => setExpand(!expand)}
        className="
        flex items-center gap-3 px-3 py-2 rounded-lg
        text-gray-400 hover:text-white hover:bg-gray-800
        w-full transition
        "
      >

        <Icon size={20} />

        {open && (
          <>
            <span className="flex-1 text-left text-sm font-medium">
              {label}
            </span>

            <ChevronDown
              size={16}
              className={`transition ${expand ? "rotate-180" : ""}`}
            />
          </>
        )}

      </button>

      {expand && open && (
        <div className="ml-8 mt-1 flex flex-col gap-1">

          {children}

        </div>
      )}

    </div>
  )
}



/* =========================
   SIDEBAR
========================= */

export default function Sidebar() {

  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  return (
    <aside
      className={`
      bg-black text-white
      transition-all duration-300
      ${open ? "w-64" : "w-20"}
      h-screen flex flex-col
      `}
    >

      {/* HEADER */}

      <div className="flex items-center justify-between p-4 border-b border-gray-800">

        {open && (
          <h2 className="font-semibold text-lg tracking-wide">
            HRIS
          </h2>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
        >
          <Menu size={20} />
        </button>

      </div>


      {/* MENU */}

      <div className="flex-1 overflow-y-auto pt-3 px-3 pb-6">

        <Category title="Dashboard" open={open} />

        <DropdownMenu
          icon={LayoutDashboard}
          label="Dashboard"
          open={open}
        >

          <SubMenuItem
            href="/dashboard"
            label="Dashboard"
            pathname={pathname}
          />

        </DropdownMenu>



        <Category title="Human Resource" open={open} />


        <DropdownMenu
          icon={Users}
          label="Karyawan"
          open={open}
        >

          <SubMenuItem href="/karyawan" label="Semua Karyawan" pathname={pathname} />
          <SubMenuItem href="/karyawan/tambah" label="Tambah Karyawan" pathname={pathname} />
          <SubMenuItem href="/karyawan/divisi" label="Divisi" pathname={pathname} />
          <SubMenuItem href="/karyawan/jabatan" label="Jabatan / Role" pathname={pathname} />
          <SubMenuItem href="/karyawan/status" label="Status Karyawan" pathname={pathname} />
          <SubMenuItem href="/karyawan/dokumen" label="Dokumen Karyawan" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={Clock}
          label="Absensi"
          open={open}
        >

          <SubMenuItem href="/absensi" label="Absensi Hari Ini" pathname={pathname} />
          <SubMenuItem href="/absensi/riwayat" label="Riwayat Absensi" pathname={pathname} />
          <SubMenuItem href="/absensi/rekap" label="Rekap Bulanan" pathname={pathname} />
          <SubMenuItem href="/absensi/izin" label="Izin / Sakit" pathname={pathname} />
          <SubMenuItem href="/absensi/shift" label="Pengaturan Shift" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={CalendarCheck}
          label="Cuti"
          open={open}
        >

          <SubMenuItem href="/cuti" label="Pengajuan Cuti" pathname={pathname} />
          <SubMenuItem href="/cuti/approval" label="Approval Cuti" pathname={pathname} />
          <SubMenuItem href="/cuti/riwayat" label="Riwayat Cuti" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={Wallet}
          label="Payroll"
          open={open}
        >

          <SubMenuItem href="/payroll" label="Generate Gaji" pathname={pathname} />
          <SubMenuItem href="/payroll/slip" label="Slip Gaji" pathname={pathname} />
          <SubMenuItem href="/payroll/komponen" label="Komponen Gaji" pathname={pathname} />

        </DropdownMenu>



        <Category title="Project" open={open} />


        <DropdownMenu
          icon={FolderKanban}
          label="Proyek"
          open={open}
        >

          <SubMenuItem href="/proyek" label="Semua Proyek" pathname={pathname} />
          <SubMenuItem href="/proyek/tambah" label="Tambah Proyek" pathname={pathname} />
          <SubMenuItem href="/proyek/progress" label="Progress Proyek" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={Package}
          label="Material"
          open={open}
        >

          <SubMenuItem href="/material" label="Stok Material" pathname={pathname} />
          <SubMenuItem href="/material/request" label="Request Material" pathname={pathname} />
          <SubMenuItem href="/material/laporan" label="Laporan Material" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={Truck}
          label="Vendor"
          open={open}
        >

          <SubMenuItem href="/vendor" label="Semua Vendor" pathname={pathname} />
          <SubMenuItem href="/vendor/tambah" label="Tambah Vendor" pathname={pathname} />

        </DropdownMenu>



        <DropdownMenu
          icon={Calculator}
          label="Rencana Anggaran Biaya"
          open={open}
        >

          <SubMenuItem href="/rab" label="Daftar RAB" pathname={pathname} />
          <SubMenuItem href="/rab/buat" label="Buat RAB" pathname={pathname} />

        </DropdownMenu>



        <Category title="Report" open={open} />


        <DropdownMenu
          icon={FileText}
          label="Laporan"
          open={open}
        >

          <SubMenuItem href="/laporan" label="Semua Laporan" pathname={pathname} />
          <SubMenuItem href="/laporan/absensi" label="Laporan Absensi" pathname={pathname} />
          <SubMenuItem href="/laporan/payroll" label="Laporan Payroll" pathname={pathname} />

        </DropdownMenu>

      </div>

    </aside>
  )
}