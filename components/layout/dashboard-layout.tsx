"use client"

import Sidebar from "./sidebar"
import Header from "./header"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex h-screen bg-(--ui-bg)">

      {/* SIDEBAR */}

      <Sidebar />

      {/* RIGHT AREA */}

      <div className="flex flex-col flex-1 overflow-hidden">

        {/* HEADER */}

        <Header />

        {/* PAGE CONTENT */}

        <main className="flex-1 overflow-y-auto p-3">

          <div className="max-w-400 mx-auto w-full">
            {children}
          </div>

        </main>

      </div>

    </div>
  )
}