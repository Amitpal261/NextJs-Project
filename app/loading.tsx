"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      
      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[120px] opacity-30 animate-pulse rounded-full"></div>

      {/* 🚀 Image */}
      <Image
        src="https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="loading"
        width={300}
        height={300}
        className="rounded-3xl shadow-2xl animate-bounce"
      />

      {/* 💡 Text */}
      <h1 className="mt-6 text-3xl font-bold tracking-widest animate-pulse">
        Loading Experience...
      </h1>

      {/* 🔄 Spinner */}
      <div className="mt-6 w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}