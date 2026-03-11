import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

type KaryawanRow = {
  id: number
  nama_lengkap: string
  email: string
  status_karyawan: string
  role: {
    nama_role: string
  } | null
}

export async function GET(){

  const { data } = await supabase
    .from("karyawan")
    .select(`
      id,
      nama_lengkap,
      email,
      status_karyawan,
      role:role_id (
        nama_role
      )
    `)
    .order("created_at",{ ascending:false })

  const result = (data as KaryawanRow[] | null)?.map((k)=>({
    id:k.id,
    nama_lengkap:k.nama_lengkap,
    email:k.email,
    status_karyawan:k.status_karyawan,
    nama_role:k.role?.nama_role ?? "-"
  }))

  return NextResponse.json(result)

}