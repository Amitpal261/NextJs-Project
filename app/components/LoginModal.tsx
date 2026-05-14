// app/components/LoginModal.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthModal } from "../context/AuthModalContext";
import { useState } from "react";

export default function LoginModal() {
  const { open, setOpen } = useAuthModal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/dashboard");
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h1 className="text-2xl text-white mb-6">Login</h1>

        <div className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />
        </div>

        <button
          onClick={() => {
            setOpen(false);
            handleLogin()
          }}
          className="mt-5 w-full py-3 bg-white text-black rounded-xl"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
