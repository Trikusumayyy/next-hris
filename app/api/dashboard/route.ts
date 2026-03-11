import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(){

  const today = new Date()
  const yesterday = new Date()

  yesterday.setDate(today.getDate() - 1)

  const todayStr = today.toISOString().slice(0,10)
  const yesterdayStr = yesterday.toISOString().slice(0,10)

  // ==============================
  // TOTAL KARYAWAN
  // ==============================

  const { count:totalKaryawan } = await supabase
    .from("karyawan")
    .select("*",{ count:"exact", head:true })

  // ==============================
  // ABSENSI
  // ==============================

  const { count:absensiHariIni } = await supabase
    .from("absensi")
    .select("*",{ count:"exact", head:true })
    .eq("tanggal",todayStr)

  const { count:absensiKemarin } = await supabase
    .from("absensi")
    .select("*",{ count:"exact", head:true })
    .eq("tanggal",yesterdayStr)

  const absensiChange =
    absensiKemarin && absensiKemarin !== 0
      ? Math.round(((absensiHariIni! - absensiKemarin) / absensiKemarin) * 100)
      : 0

  // ==============================
  // CUTI
  // ==============================

  const { count:cutiPending } = await supabase
    .from("cuti")
    .select("*",{ count:"exact", head:true })
    .eq("status","pending")

  const { count:cutiKemarin } = await supabase
    .from("cuti")
    .select("*",{ count:"exact", head:true })
    .eq("status","pending")
    .lt("created_at",todayStr)

  const cutiChange = (cutiPending || 0) - (cutiKemarin || 0)

  // ==============================
  // PROYEK
  // ==============================

  const { count:proyekAktif } = await supabase
    .from("proyek")
    .select("*",{ count:"exact", head:true })
    .eq("status","aktif")

  const { count:proyekSebelumnya } = await supabase
    .from("proyek")
    .select("*",{ count:"exact", head:true })
    .eq("status","aktif")
    .lt("created_at",todayStr)

  const proyekChange = (proyekAktif || 0) - (proyekSebelumnya || 0)

  // ==============================
  // MATERIAL REQUEST
  // ==============================

  const { count:materialRequest } = await supabase
    .from("material_request")
    .select("*",{ count:"exact", head:true })
    .eq("status","pending")

  const { count:materialSebelumnya } = await supabase
    .from("material_request")
    .select("*",{ count:"exact", head:true })
    .eq("status","pending")
    .lt("created_at",todayStr)

  const materialChange = (materialRequest || 0) - (materialSebelumnya || 0)

  return NextResponse.json({

    total_karyawan: totalKaryawan || 0,

    absensi_hari_ini: absensiHariIni || 0,
    absensi_change: absensiChange,

    cuti_pending: cutiPending || 0,
    cuti_change: cutiChange,

    proyek_aktif: proyekAktif || 0,
    proyek_change: proyekChange,

    material_request: materialRequest || 0,
    material_change: materialChange

  })
}