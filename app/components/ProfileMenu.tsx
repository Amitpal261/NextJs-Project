"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  // ✅ Fetch logged-in user
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await fetch("/api/authme", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };

    authCheck(); // ✅ CALL IT
  }, []);

  // ✅ Logout function (OUTSIDE useEffect)
  const logoutUser = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.reload();
  };

  // ❌ If not logged in → don’t show menu
  if (!user) return null;

  return (
    <div className="relative flex justify-end bg-black">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden border border-white/20"
      >
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-16 w-64 p-4 rounded-2xl backdrop-blur-xl bg-black/50 border border-white/20 shadow-2xl"
          >
            {/* Profile Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://i.pravatar.cc/100"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-white font-semibold">
                  {user.username || "User"}
                </p>
                <p className="text-gray-300 text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg transition">
                <User size={16} /> Profile
              </button>

              <button className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg transition">
                <Settings size={16} /> Settings
              </button>

              <button
                onClick={logoutUser}
                className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}