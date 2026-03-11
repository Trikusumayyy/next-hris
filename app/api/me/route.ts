import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"

export async function GET() {

  const cookieStore = await cookies()
  const auth = cookieStore.get("auth")

  if (!auth) {
    return NextResponse.json(null)
  }

  const id = auth.value

  // cek users
  const { data:user } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (user) {
    return NextResponse.json({
      name: user.name,
      role: "super_admin",
      foto_profil: null
    })
  }

  // cek karyawan
  const { data:karyawan } = await supabase
    .from("karyawan")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (karyawan) {
    return NextResponse.json({
      name: karyawan.nama_lengkap,
      role: "karyawan",
      foto_profil: karyawan.foto_profil
    })
  }

  return NextResponse.json(null)
}