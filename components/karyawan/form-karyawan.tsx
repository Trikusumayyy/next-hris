"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Card from "@/components/ui/card"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import Textarea from "@/components/ui/textarea"
import Button from "@/components/ui/button"

import SectionForm from "@/components/karyawan/section-form"

type Divisi = {
  id:number
  nama_divisi:string
}

type Role = {
  id:number
  nama_role:string
  divisi_id:number
}

type FormData = {

  nik_karyawan:string
  nik_ktp:string

  nama_lengkap:string
  nama_panggilan:string

  email:string
  password:string
  akses_login:string

  nomor_telepon:string
  nomor_telepon_darurat:string
  alamat_lengkap:string

  nama_ibu_kandung:string
  tempat_lahir:string
  tanggal_lahir:string
  jenis_kelamin:string
  agama:string
  status_pernikahan:string

  divisi_id:string
  role_id:string
  status_karyawan:string
  tanggal_masuk:string
  tanggal_keluar:string

  tipe_gaji:string
  gaji_bulanan:string
  gaji_harian:string
  bpjs_kesehatan:string
  bpjs_ketenagakerjaan:string

  bank_id:string
  nomor_rekening:string
  nama_rekening:string

  foto_profil:File | null
  file_ktp:File | null

}
type Bank = {
  id:number
  nama_bank:string
}
type Props = {
  initialData?: Partial<FormData>
}

export default function FormKaryawan({initialData}:Props){

const router = useRouter()

const [loading,setLoading] = useState(false)

const [divisi,setDivisi] = useState<Divisi[]>([])
const [role,setRole] = useState<Role[]>([])
const [bank,setBank] = useState<Bank[]>([])

const [form,setForm] = useState<FormData>({

nik_karyawan:initialData?.nik_karyawan || "",
nik_ktp:initialData?.nik_ktp || "",

nama_lengkap:initialData?.nama_lengkap || "",
nama_panggilan:initialData?.nama_panggilan || "",

email:initialData?.email || "",
password:"",
akses_login:initialData?.akses_login || "true",

nomor_telepon:initialData?.nomor_telepon || "",
nomor_telepon_darurat:initialData?.nomor_telepon_darurat || "",
alamat_lengkap:initialData?.alamat_lengkap || "",

nama_ibu_kandung:initialData?.nama_ibu_kandung || "",
tempat_lahir:initialData?.tempat_lahir || "",
tanggal_lahir:initialData?.tanggal_lahir || "",
jenis_kelamin:initialData?.jenis_kelamin || "",
agama:initialData?.agama || "",
status_pernikahan:initialData?.status_pernikahan || "",

divisi_id:initialData?.divisi_id || "",
role_id:initialData?.role_id || "",
status_karyawan:initialData?.status_karyawan || "tetap",
tanggal_masuk:initialData?.tanggal_masuk || "",
tanggal_keluar:initialData?.tanggal_keluar || "",

tipe_gaji:initialData?.tipe_gaji || "bulanan",
gaji_bulanan:initialData?.gaji_bulanan || "",
gaji_harian:initialData?.gaji_harian || "",
bpjs_kesehatan:initialData?.bpjs_kesehatan || "",
bpjs_ketenagakerjaan:initialData?.bpjs_ketenagakerjaan || "",

bank_id:initialData?.bank_id || "",
nomor_rekening:initialData?.nomor_rekening || "",
nama_rekening:initialData?.nama_rekening || "",

foto_profil:null,
file_ktp:null

})

useEffect(()=>{

async function fetchMaster(){

const res = await fetch("/api/master-data")
const data = await res.json()

setDivisi(data.divisi)
setRole(data.role)
setBank(data.bank)

}

fetchMaster()

},[])



const filteredRole = role.filter(
(r)=>String(r.divisi_id) === form.divisi_id
)

function handleChange(
e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
){

const {name,value} = e.target

setForm(prev=>({

...prev,
[name]:value,

...(name === "divisi_id" && {role_id:""})

}))

}

function handleFile(e:React.ChangeEvent<HTMLInputElement>){

const file = e.target.files?.[0] || null

setForm(prev=>({

...prev,
[e.target.name]:file

}))

}

async function handleSubmit(e:React.FormEvent){

e.preventDefault()

try{

setLoading(true)

const data = new FormData()

Object.entries(form).forEach(([key,val])=>{

if(val instanceof File){
data.append(key,val)
}

else if(val !== null){
data.append(key,String(val))
}

})

const res = await fetch("/api/karyawan",{
method:"POST",
body:data
})

if(!res.ok){
throw new Error("Gagal menyimpan")
}

router.push("/karyawan")
router.refresh()

}catch(err){

console.error(err)
alert("Terjadi kesalahan")

}finally{

setLoading(false)

}

}

return(

<Card>

<form onSubmit={handleSubmit} className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

{/* AKUN */}

<SectionForm title="Akun Login">
<Input
label="Email"
name="email"
value={form.email}
onChange={handleChange}
/>

<Input
label="Password"
type="password"
name="password"
value={form.password}
onChange={handleChange}
/>


</SectionForm>


{/* DATA PRIBADI */}

<SectionForm title="Data Pribadi">
<Input label="NIK Karyawan" name="nik_karyawan" value={form.nik_karyawan} onChange={handleChange}/>
<Input label="NIK KTP" name="nik_ktp" value={form.nik_ktp} onChange={handleChange}/>
<Input label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange}/>
<Input label="Nama Panggilan" name="nama_panggilan" value={form.nama_panggilan} onChange={handleChange}/>

<Input label="Tempat Lahir" name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange}/>
<Input label="Tanggal Lahir" type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange}/>

<Select
label="Jenis Kelamin"
name="jenis_kelamin"
value={form.jenis_kelamin}
onChange={handleChange}
options={[
{label:"Laki-laki",value:"laki-laki"},
{label:"Perempuan",value:"perempuan"}
]}
/>

<Select
label="Agama"
name="agama"
value={form.agama}
onChange={handleChange}
options={[
{label:"Islam",value:"islam"},
{label:"Kristen",value:"kristen"},
{label:"Katolik",value:"katolik"},
{label:"Hindu",value:"hindu"},
{label:"Budha",value:"budha"}
]}
/>

<Select
label="Status Pernikahan"
name="status_pernikahan"
value={form.status_pernikahan}
onChange={handleChange}
options={[
{label:"Belum Menikah",value:"belum_menikah"},
{label:"Menikah",value:"menikah"}
]}
/>

<Input label="Nama Ibu Kandung" name="nama_ibu_kandung" value={form.nama_ibu_kandung} onChange={handleChange}/>

</SectionForm>


{/* KONTAK */}

<SectionForm title="Kontak">

<Input label="Nomor Telepon" name="nomor_telepon" value={form.nomor_telepon} onChange={handleChange}/>
<Input label="Telepon Darurat" name="nomor_telepon_darurat" value={form.nomor_telepon_darurat} onChange={handleChange}/>
<Textarea label="Alamat Lengkap" name="alamat_lengkap" value={form.alamat_lengkap} onChange={handleChange}/>

</SectionForm>


{/* DATA PEKERJAAN */}

<SectionForm title="Data Pekerjaan">

<Select
label="Divisi"
name="divisi_id"
value={form.divisi_id}
onChange={handleChange}
options={[
{label:"Pilih Divisi",value:""},
...divisi.map((d)=>({
label:d.nama_divisi,
value:String(d.id)
}))
]}
/>

<Select
label="Jabatan"
name="role_id"
value={form.role_id}
onChange={handleChange}
options={[
{label:"Pilih Jabatan",value:""},
...filteredRole.map((r)=>({
label:r.nama_role,
value:String(r.id)
}))
]}
/>

<Select
label="Status Karyawan"
name="status_karyawan"
value={form.status_karyawan}
onChange={handleChange}
options={[
{label:"Tetap",value:"tetap"},
{label:"Kontrak",value:"kontrak"},
{label:"Resign",value:"resign"}
]}
/>

<Input label="Tanggal Masuk" type="date" name="tanggal_masuk" value={form.tanggal_masuk} onChange={handleChange}/>
<Input label="Tanggal Keluar" type="date" name="tanggal_keluar" value={form.tanggal_keluar} onChange={handleChange}/>

</SectionForm>


{/* PAYROLL */}

<SectionForm title="Payroll">

<Select
label="Tipe Gaji"
name="tipe_gaji"
value={form.tipe_gaji}
onChange={handleChange}
options={[
{label:"Bulanan",value:"bulanan"},
{label:"Harian",value:"harian"}
]}
/>

<Input label="Gaji Bulanan" name="gaji_bulanan" value={form.gaji_bulanan} onChange={handleChange}/>
<Input label="Gaji Harian" name="gaji_harian" value={form.gaji_harian} onChange={handleChange}/>
<Input label="BPJS Kesehatan" name="bpjs_kesehatan" value={form.bpjs_kesehatan} onChange={handleChange}/>
<Input label="BPJS Ketenagakerjaan" name="bpjs_ketenagakerjaan" value={form.bpjs_ketenagakerjaan} onChange={handleChange}/>
<Select
label="Bank"
name="bank_id"
value={form.bank_id}
onChange={handleChange}
options={[
{ label:"Pilih Bank", value:"" },
...bank.map((b)=>({
label:b.nama_bank,
value:String(b.id)
}))
]}
/>
<Input label="Nomor Rekening" name="nomor_rekening" value={form.nomor_rekening} onChange={handleChange}/>
<Input label="Nama Rekening" name="nama_rekening" value={form.nama_rekening} onChange={handleChange}/>

</SectionForm>


{/* DOKUMEN */}

<SectionForm title="Dokumen">

<Input label="Foto Profil" type="file" name="foto_profil" onChange={handleFile}/>
<Input label="Upload KTP" type="file" name="file_ktp" onChange={handleFile}/>

</SectionForm>


<div className="pt-4">

<Button type="submit" disabled={loading}>
{loading ? "Menyimpan..." : "Simpan Karyawan"}
</Button>

</div>

</form>

</Card>

)

}