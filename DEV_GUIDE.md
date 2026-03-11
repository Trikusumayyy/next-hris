# Developer Guide HRIS

Dokumen ini berisi aturan pengembangan agar project tetap konsisten dan mudah di maintain.

---

# Aturan Struktur Folder

Page hanya berisi logic halaman.

UI harus berada di

components/ui

Layout berada di

components/layout

Database helper berada di

lib/

---

# Aturan Komponen UI

Semua komponen harus reusable.

Jangan membuat button manual di page.

Gunakan

Button  
Input  
Card  
Table  

---

# Aturan Warna

Semua warna harus menggunakan CSS variable.

Jangan hardcode warna.

SALAH

text-gray-900  
bg-red-600

BENAR

text-(--brand-dark)  
bg-(--brand-orange)

---

# Aturan Layout

Semua halaman harus menggunakan

Container component

Contoh

<Container>

<PageTitle />

content

</Container>

---

# Aturan Page Title

Setiap halaman wajib memiliki

PageTitle

Contoh

<PageTitle
title="Karyawan"
subtitle="Daftar karyawan perusahaan"
/>

---

# Aturan Table

Semua data list harus menggunakan

Table component

Jangan membuat table manual di page.

---

# Aturan Form

Semua form harus menggunakan

Input component

supaya konsisten.

---

# Aturan API

Semua API berada di

app/api/

Contoh

/api/login
/api/employees
/api/payroll

---

# Aturan Naming

Gunakan bahasa Inggris untuk kode.

employee  
attendance  
payroll  
material  
vendor  

---

# Aturan State

Gunakan React state sederhana.

Jika sistem semakin besar bisa menggunakan

Zustand

---

# Security

Password harus di hash.

Tidak boleh menyimpan password plain text.

---

# Roadmap Sistem

Tahap 1

Login  
Dashboard  
Karyawan  

Tahap 2

Absensi  
Cuti  
Payroll  

Tahap 3

Material  
Vendor  
Proyek  

Tahap 4

Laporan  
Analitik  

---

# Catatan Penting

Jangan membuat UI langsung di page.

Semua UI harus melalui component system.

Ini penting agar project tetap scalable.

---

# Maintainer

DICOMENT AGENCY | WWW.DICOMENT.COM