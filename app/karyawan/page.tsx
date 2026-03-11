"use client"

import { useEffect, useState } from "react"

import DashboardLayout from "@/components/layout/dashboard-layout"
import PageTitle from "@/components/ui/page-title"
import DataTable, { Column } from "@/components/ui/table"

type Karyawan = {
  id:number
  nama_lengkap:string
  email:string
  nama_role:string
  status_karyawan:string
}

export default function KaryawanPage(){

  const [data,setData] = useState<Karyawan[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function load(){

      try{

        const res = await fetch("/api/karyawan")
        const result = await res.json()

        setData(result)

      }catch(err){

        console.error(err)

      }finally{

        setLoading(false)

      }

    }

    load()

  },[])

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
    accessor: "status_karyawan"
  }
]

  return(

    <DashboardLayout>

      <div className="space-y-6">

        <PageTitle title="Karyawan" />

        <DataTable
          columns={columns}
          data={data}
          loading={loading}
        />

      </div>

    </DashboardLayout>

  )

}