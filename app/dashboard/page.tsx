"use client"

import { useEffect, useState } from "react"
import { Users, Clock, CalendarCheck, FolderKanban, Package } from "lucide-react"

import PageTitle from "@/components/ui/page-title"
import StatCard from "@/components/dashboard/stat-card"
import RecentTable from "@/components/dashboard/recent-table"
import Activity from "@/components/dashboard/activity-list"
import DashboardLayout from "@/components/layout/dashboard-layout"

type DashboardData = {
  total_karyawan: number

  absensi_hari_ini: number
  absensi_change: number

  cuti_pending: number
  cuti_change: number

  proyek_aktif: number
  proyek_change: number

  material_request: number
  material_change: number
}

const stats = [
  {
    title: "Total Karyawan",
    key: "total_karyawan" as const,
    icon: Users
  },
  {
    title: "Absensi Hari Ini",
    key: "absensi_hari_ini" as const,
    changeKey: "absensi_change" as const,
    icon: Clock
  },
  {
    title: "Cuti Pending",
    key: "cuti_pending" as const,
    changeKey: "cuti_change" as const,
    icon: CalendarCheck
  },
  {
    title: "Proyek Aktif",
    key: "proyek_aktif" as const,
    changeKey: "proyek_change" as const,
    icon: FolderKanban
  },
  {
    title: "Material Request",
    key: "material_request" as const,
    changeKey: "material_change" as const,
    icon: Package
  }
]

export default function DashboardPage(){

  const [data,setData] = useState<DashboardData | null>(null)

  useEffect(()=>{

    async function loadDashboard(){

      const res = await fetch("/api/dashboard")
      const result = await res.json()

      setData(result)

    }

    loadDashboard()

  },[])

  return(

    <DashboardLayout>

      <div className="space-y-6">

        <PageTitle title="Dashboard" />

        {/* STAT */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

          {stats.map((stat)=>{

            const value = data ? data[stat.key] : 0
            const change = stat.changeKey && data ? data[stat.changeKey] : 0

            return(

              <StatCard
                key={stat.title}
                title={stat.title}
                value={value}
                icon={stat.icon}
                change={change}
              />

            )

          })}

        </div>

        {/* TABLE + ACTIVITY */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
            <RecentTable />
          </div>

          <Activity />

        </div>

      </div>

    </DashboardLayout>

  )

}