"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage(){

const router = useRouter()

const [login,setLogin] = useState("")
const [password,setPassword] = useState("")
const [show,setShow] = useState(false)
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")

async function handleLogin(e:React.FormEvent){

e.preventDefault()

setLoading(true)
setError("")

try{

const res = await fetch("/api/login",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
login,
password
})
})

const data = await res.json()

setLoading(false)

if(!data.success){
setError("Login gagal, periksa kembali akun anda")
return
}

router.push("/dashboard")

}catch(err){
  console.log(err)  

setLoading(false)
setError("Server error")

}

}

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
style={{ backgroundImage:"url('/login-bg.webp')" }}
>

<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>

<div className="relative z-10 grid lg:grid-cols-2 w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl">

{/* LEFT */}

<div className="p-10 space-y-8">

<Image
src="/logo.webp"
alt="logo"
width={140}
height={40}
/>

<div>

<h1 className="text-2xl font-semibold text-(--brand-dark)">
Portal HRIS
</h1>

<p className="text-sm text-gray-500 mt-1">
Login menggunakan Email / Nama / NIK
</p>

</div>

<form
onSubmit={handleLogin}
className="space-y-6"
>

<div>

<label className="text-sm text-gray-600">
Email / Nama / NIK
</label>

<input
value={login}
onChange={(e)=>setLogin(e.target.value)}
className="
w-full mt-1 px-4 py-3
border border-gray-300
rounded-lg text-sm
focus:ring-2 focus:ring-orange-500
outline-none
"
/>

</div>

<div>

<label className="text-sm text-gray-600">
Password
</label>

<div className="relative">

<input
type={show ? "text" : "password"}
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="
w-full mt-1 px-4 py-3
border border-gray-300
rounded-lg text-sm
focus:ring-2 focus:ring-orange-500
outline-none
"
/>

<button
type="button"
onClick={()=>setShow(!show)}
className="absolute right-3 top-3 text-gray-500"
>
{show ? <EyeOff size={18}/> : <Eye size={18}/>}
</button>

</div>

</div>

{error && (
<div className="text-red-500 text-sm">
{error}
</div>
)}

<button
disabled={loading}
className="
w-full py-3 rounded-lg
bg-linear-to-r from-orange-500 to-red-600
text-white font-medium
hover:opacity-90
disabled:opacity-50
"
>

{loading ? "Loading..." : "Login"}

</button>

</form>

</div>

{/* RIGHT */}

<div className="bg-[#252525] text-white p-10 flex flex-col justify-center">

<h2 className="text-xl font-semibold mb-6">
Detail Sistem HRIS
</h2>

<div className="grid grid-cols-2 gap-4 text-sm">

<div className="bg-white/10 p-4 rounded-lg">
<h3>Absensi Online</h3>
<p className="text-gray-300 text-xs mt-1">
Monitor absensi realtime
</p>
</div>

<div className="bg-white/10 p-4 rounded-lg">
<h3>Cuti & Approval</h3>
<p className="text-gray-300 text-xs mt-1">
Sistem pengajuan cuti
</p>
</div>

<div className="bg-white/10 p-4 rounded-lg">
<h3>Portal Karyawan</h3>
<p className="text-gray-300 text-xs mt-1">
Data karyawan terpusat
</p>
</div>

<div className="bg-white/10 p-4 rounded-lg">
<h3>Slip Gaji</h3>
<p className="text-gray-300 text-xs mt-1">
Slip gaji digital
</p>
</div>

</div>

</div>

</div>

</div>

)

}