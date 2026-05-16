"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ get value from URL
  const q = searchParams.get("q") || "";

  function onSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q"); // 🔥 remove if empty
    }

    params.set("page", "1"); // reset page

    router.push(`?${params.toString()}`);
  }

  return (
    <input
      placeholder="Search products..."
      value={q} // ✅ controlled by URL
      onChange={(e) => onSearch(e.target.value)} // 🔥 live sync
      className="border-none outline-none focus:outline-none focus:ring-0"
    />
  );
}