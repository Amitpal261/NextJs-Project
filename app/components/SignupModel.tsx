"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "../context/AuthModalContext";
import { signUpSchema } from "@/schema/signUpSchma";
import { ZodSafeParseResult } from "zod";

export default function SignupModal() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mode, setMode } = useAuthModal();
  const [displayedValidatedData, setdisplayedValidatedData] = useState<
    ZodSafeParseResult<{
      username: string;
      email: string;
      password: string;
    }>
  >({
    success: true,
    data: { username: "", email: "", password: "" },
  });


  if (mode !== "signup") return null;

  const handleSignup = async () => {
    const validatedData = signUpSchema.safeParse({ username, email, password });
    setdisplayedValidatedData(validatedData);

    if (!validatedData.success) {
      return; // stop here if invalid
    }
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (validatedData.success) {
      alert(data.message);
      setMode(null);
      router.refresh();
    } else {
      alert(data.message || "Signup failed");
      if (data.message === "User already exists!") {
        setMode("login");
      }
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setMode(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h1 className="text-2xl text-white mb-6">Sign Up</h1>

        <div className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400"
          />
          <p className="text-red-500 text-sm ">
            {displayedValidatedData.success
              ? null
              : displayedValidatedData.error?.issues?.find(
                  (err) => err.path[0] === "username",
                )?.message}
          </p>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400"
          />
          <p className="text-red-500 text-sm ">
            {displayedValidatedData.success
              ? null
              : displayedValidatedData.error?.issues?.find(
                  (err) => err.path[0] === "email",
                )?.message}
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400"
          />
        </div>
        <p className="text-red-500 text-sm ">
          {displayedValidatedData.success
            ? null
            : displayedValidatedData.error?.issues?.find(
                (err) => err.path[0] === "password",
              )?.message}
        </p>
        <p className="mt-4 w-full py-3 transition">
          already have an account?{" "}
          <button
            className="text-blue-300 hover:text-blue-400"
            onClick={() => setMode("login")}
          >
            login
          </button>
        </p>

        <button
          onClick={() => {
            handleSignup();
          }}
          className="mt-5 w-full py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
