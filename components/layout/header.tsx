"use client"

import Image from "next/image"
import { Bell, Search, User } from "lucide-react"
import { useEffect, useState, useRef } from "react"

type UserType = {
  name: string
  role: string
  foto_profil?: string | null
} | null

export default function Header() {

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<UserType>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    async function getUser(){

      const res = await fetch("/api/me")
      const data = await res.json()

      setUser(data)

    }

    getUser()

  }, [])

  async function handleLogout(){

    await fetch("/api/logout",{
      method:"POST"
    })

    window.location.href="/login"

  }

  return (

    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* SEARCH */}

      <div className="relative w-80">

        <Search
          size={16}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 border rounded-full border-gray-400 text-sm focus:outline-none"
        />

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}

        <button className="relative">
          <Bell size={20} />
        </button>

        {/* USER MENU */}

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
          >

            {/* AVATAR */}

            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

              {user?.foto_profil ? (

                <Image
                  src={user.foto_profil}
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />

              ) : (

                <User size={16} />

              )}

            </div>

            <span className="text-sm font-medium">
              {user?.name || "User"}
            </span>

          </button>

          {open && (

            <div
              className="
              absolute right-0 mt-2 w-40
              bg-white border border-gray-200
              rounded-lg shadow-md
              overflow-hidden
              "
            >

              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  )

}