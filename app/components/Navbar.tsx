"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthModal } from "../context/AuthModalContext";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, setMode } = useAuthModal();

  const [user, setUser] = useState<any>(null); // ✅ real auth state

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Service", path: "/service" },
    { name: "Products", path: "/products" },
    { name: "Charts", path: "/charts" },
    { name: "Search Feature", path: "/search" },
  ];

  // ✅ Check auth from backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/authme", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, [mode]);

  return (
    <nav className="w-full px-6 md:px-10 py-4 bg-[#0f172a]/90 backdrop-blur-md text-white shadow-md top-0 left-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-yellow-400 cursor-pointer">
          Amit
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-base font-medium transition-all duration-300 
                ${isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* ✅ Auth Section */}
        {!user || mode ? (
          <>
            {mode === "login" ? (
              <button onClick={() => setMode("signup")}>Signup</button>
            ) : (
              <button onClick={() => setMode("login")}>Login</button>
            )}
          </>
        ) : (
          <ProfileMenu />
        )}

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-[#020617] p-4 rounded-xl shadow-lg">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm px-2 py-1 rounded-md 
                ${isActive ? "text-yellow-400 bg-white/5" : "text-gray-300 hover:text-yellow-400"}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
