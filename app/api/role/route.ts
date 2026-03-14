import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(){

const { data,error } = await supabase
.from("role")
.select("id,nama_role,divisi_id")
.order("id")

if(error){
return NextResponse.json({error:error.message},{status:500})
}

return NextResponse.json(data)

}