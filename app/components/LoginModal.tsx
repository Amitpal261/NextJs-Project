"use client";

import { useRouter } from "next/navigation";
import { useAuthModal } from "../context/AuthModalContext";
import { useState } from "react";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { mode, setMode, setIsLoggedIn } = useAuthModal();

  if (mode !== "login") return null;

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ success
      setIsLoggedIn(true);
      setMode(null);
     router.refresh(); // ✅ IMPORTANT (Next.js App Router)    } catch (error: any) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={() => setMode(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h1 className="text-2xl text-white mb-6">Login</h1>

        <div className="space-y-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          
          className="mt-5 w-full py-3 transition"
        >
          Do not have an account?{" "}
          <button
            className="text-blue-300 hover:text-blue-400"
            onClick={() => setMode("signup")}
          >
            signup
          </button>
        </button>
        {/* ❗ Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}
         
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-5 w-full py-3 bg-white text-black rounded-xl disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}