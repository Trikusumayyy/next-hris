# HRIS - PERUSAHAAN ARSITEK DAN KONTRAKTOR

Sistem HRIS internal untuk manajemen karyawan, absensi, payroll, material, dan proyek.

Project ini dibuat untuk mendukung operasional perusahaan konsultan arsitektur, kontraktor bangunan, dan interior.

---

# Tech Stack

Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

Backend
- Next.js API Route

Database
- PostgreSQL
- Supabase

Icons
- Lucide React

Font
- Plus Jakarta Sans

---

# Cara Menjalankan Project

Install dependencies

npm install

Run development server

npm run dev

Buka di browser

http://localhost:3000

---

# Struktur Project

app/

dashboard/
karyawan/
absensi/
cuti/
payroll/
material/
vendor/
proyek/
laporan/

login/

api/

components/

ui/
button.tsx
input.tsx
card.tsx
table.tsx
container.tsx
page-title.tsx

layout/
sidebar.tsx
header.tsx

lib/

db.ts
auth.ts

public/

logo.webp
login-bg.webp

---

# Modul Sistem

Dashboard  
Karyawan  
Absensi  
Cuti  
Payroll  
Material Request  
Vendor / Supplier  
Proyek  
Laporan  

---

# Sistem Login

Endpoint

POST /api/login

Login dapat menggunakan

Email  
Username  

Session disimpan di

localStorage

---

# Brand Design System

Brand color digunakan melalui CSS variable.

File

app/globals.css
:root {

--brand-orange:#f97316;
--brand-red:#dc2626;
--brand-dark:#252525;

--ui-bg:#f8fafc;
--ui-border:#e5e7eb;
--ui-text:#111827;

}


Penggunaan di Tailwind

text-(--brand-dark)  
bg-(--brand-orange)  
bg-(--brand-red)

---

# UI Component System

Semua UI harus menggunakan reusable component.

Button  
components/ui/button.tsx

Input  
components/ui/input.tsx

Card  
components/ui/card.tsx

Table  
components/ui/table.tsx

Page Title  
components/ui/page-title.tsx

Container  
components/ui/container.tsx

Jangan membuat UI langsung di page.

---

# Authentication

User login menggunakan

email / username  
password  

Password disimpan menggunakan hashing.

---

# Deployment

Project dapat di deploy ke

Vercel  
Railway  
VPS  

Database menggunakan Supabase PostgreSQL.

---

# Tujuan Sistem

Menyatukan seluruh operasional perusahaan dalam satu sistem.

Manajemen karyawan  
Manajemen absensi  
Manajemen payroll  
Manajemen proyek  
Manajemen material  

---

# Author

ArsitekInterior.com