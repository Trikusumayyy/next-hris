import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300","400","500","600","700"],
})

export const metadata: Metadata = {
  title: "HRIS - Management System",
  description: "Sistem HRIS ArsitekInterior",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}