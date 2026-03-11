"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Clock,
  Wallet,
  Package,
  FolderKanban,
  Truck,
  FileText,
  Menu,
  Calculator
} from "lucide-react"

import { LucideIcon } from "lucide-react"



function MenuItem({
  href,
  icon: Icon,
  label,
  open,
  pathname
}: {
  href: string
  icon: LucideIcon
  label: string
  open: boolean
  pathname: string
}) {

  const active = pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`
      relative flex items-center gap-3 px-3 py-2 rounded-lg
      transition-all duration-200 group
      ${active
        ? "bg-white text-black shadow-sm"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
      }
      `}
    >

      {/* active indicator */}
      {active && (
        <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r"></span>
      )}

      <Icon size={20} className="shrink-0" />

      {open && (
        <span className="text-sm font-medium truncate">
          {label}
        </span>
      )}

      {/* tooltip when collapsed */}
      {!open && (
        <span
          className="
          absolute left-16 whitespace-nowrap
          bg-gray-900 text-white text-xs px-2 py-1 rounded
          opacity-0 group-hover:opacity-100
          transition pointer-events-none
          "
        >
          {label}
        </span>
      )}

    </Link>
  )
}



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

        <MenuItem
          href="/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          open={open}
          pathname={pathname}
        />



        <Category title="Human Resource" open={open} />

        <MenuItem
          href="/karyawan"
          icon={Users}
          label="Karyawan"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/absensi"
          icon={Clock}
          label="Absensi"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/cuti"
          icon={CalendarCheck}
          label="Cuti"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/payroll"
          icon={Wallet}
          label="Payroll"
          open={open}
          pathname={pathname}
        />



        <Category title="Project" open={open} />

        <MenuItem
          href="/proyek"
          icon={FolderKanban}
          label="Proyek"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/material"
          icon={Package}
          label="Material"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/vendor"
          icon={Truck}
          label="Vendor"
          open={open}
          pathname={pathname}
        />

        <MenuItem
          href="/rab"
          icon={Calculator}
          label="Rencana Anggaran Biaya"
          open={open}
          pathname={pathname}
        />



        <Category title="Report" open={open} />

        <MenuItem
          href="/laporan"
          icon={FileText}
          label="Laporan"
          open={open}
          pathname={pathname}
        />

      </div>

    </aside>
  )
}