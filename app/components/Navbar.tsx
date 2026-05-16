"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuthModal } from "../context/AuthModalContext"

const Navbar = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { setOpen } = useAuthModal()

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Service", path: "/service" },
    { name: "Products", path: "/products" },
    { name: "Charts", path: "/charts" },
    { name: "Search Feature", path: "/search" },


  ]

  return (
    <nav className="w-full px-6 md:px-10 py-4 bg-[#0f172a]/90 backdrop-blur-md text-white shadow-md  top-0 left-0 z-50">
      
      <div className="flex items-center justify-between">
        
        {/* 🔥 Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-yellow-400 tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer">
          Amit
        </h1>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = pathname === link.path

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-base font-medium transition-all duration-300 
                  ${isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}
              >
                {link.name}

                {/* underline */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-yellow-400 transition-all duration-300 
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            )
          })}
        </div>
        <button onClick={() => setOpen(true)}>
        Open Login
      </button>
        {/* 📱 Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-[#020617] p-4 rounded-xl shadow-lg">
          {links.map((link) => {
            const isActive = pathname === link.path

            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 
                  ${isActive 
                    ? "text-yellow-400 bg-white/5" 
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

export default Navbar