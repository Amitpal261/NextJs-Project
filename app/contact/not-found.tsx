"use client";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
      
      {/* 🖼️ Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="background"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* ✨ Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* 💥 Title */}
        <h1 className="text-8xl font-extrabold bg-white text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">
          404
        </h1>

        {/* ✨ Subtitle */}
        <p className="mt-4 text-lg text-gray-300 max-w-md">
          You are Wrong! Try to Solve it.
        </p>

        {/* 🔘 Button */}
        <Link
          href="/contact"
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:scale-110 transition-all duration-300 "
        >
          Return to Contact
        </Link>
      </div>
    </div>
  );
}