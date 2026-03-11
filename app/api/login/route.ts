import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {

  try{

    const body = await req.json()

    const value = body.login?.trim()
    const pass = body.password?.trim()

    if(!value || !pass){
      return NextResponse.json({ success:false })
    }

    // ========================
    // CEK SUPER ADMIN
    // ========================

    const { data:user } = await supabase
      .from("users")
      .select("*")
      .ilike("email", value)
      .maybeSingle()

    if(user){

      if(user.password !== pass){
        return NextResponse.json({ success:false })
      }

      const res = NextResponse.json({
        success:true,
        role:"super_admin",
        name:user.name
      })

      res.cookies.set("auth",String(user.id),{
        httpOnly:true,
        path:"/",
        maxAge:60*60*24, 
        sameSite:"lax"
      })

      return res
    }

    // ========================
    // CEK KARYAWAN
    // ========================

    const { data:karyawan } = await supabase
      .from("karyawan")
      .select("*")
      .or(
        `email.ilike.${value},nik_karyawan.eq.${value},nama_lengkap.ilike.${value}`
      )
      .maybeSingle()

    if(!karyawan){
      return NextResponse.json({ success:false })
    }

    if(karyawan.password !== pass){
      return NextResponse.json({ success:false })
    }

    const res = NextResponse.json({
      success:true,
      role:"karyawan",
      name:karyawan.nama_lengkap
    })

    res.cookies.set("auth",String(karyawan.id),{
      httpOnly:true,
      path:"/",
      maxAge:60*60*24,
      sameSite:"lax"
    })

    return res

  }catch(err){

    console.log("LOGIN ERROR:",err)

    return NextResponse.json({
      success:false,
      message:"server error"
    })

  }

}