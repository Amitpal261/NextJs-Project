"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[120px] opacity-30 animate-pulse rounded-full"></div>

  

      {/* 💡 Text */}
      <h1 className="mt-6 text-3xl font-bold tracking-widest animate-pulse">
        Loading Experience...
      </h1>

      {/* 🔄 Spinner */}
      <div className="mt-6 w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}