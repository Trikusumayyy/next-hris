import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

  const auth = request.cookies.get("auth")

  const { pathname } = request.nextUrl

  // halaman login boleh diakses tanpa auth
  if (pathname === "/login") {
    if (auth) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // jika belum login → redirect login
  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/karyawan/:path*",
    "/absensi/:path*",
    "/cuti/:path*",
    "/payroll/:path*",
    "/proyek/:path*",
    "/material/:path*",
    "/vendor/:path*",
    "/laporan/:path*",
    "/rab/:path*"
  ]
}