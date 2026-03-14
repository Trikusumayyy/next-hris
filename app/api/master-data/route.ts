import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(){

try{

const [divisiRes,roleRes,bankRes] = await Promise.all([

supabase
.from("divisi")
.select("id,nama_divisi")
.order("id"),

supabase
.from("role")
.select("id,nama_role,divisi_id")
.order("id"),

supabase
.from("bank")
.select("id,nama_bank")
.order("id")

])

if(divisiRes.error) throw divisiRes.error
if(roleRes.error) throw roleRes.error
if(bankRes.error) throw bankRes.error

return NextResponse.json({

divisi:divisiRes.data,
role:roleRes.data,
bank:bankRes.data

})

}catch(err:unknown){

const message =
err instanceof Error ? err.message : "Unknown error"

return NextResponse.json({
error:message
},{status:500})

}

}