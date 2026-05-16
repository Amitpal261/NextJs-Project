"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const activeSort = searchParams.get("sort") || "relevance";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    // console.log("default Param :",params)
      params.set(key, value);
      params.delete("q");

    // console.log("Set Param :", newParams)
    params.set("page", "1");

    router.push(`/search?${params.toString()}`);
  }

  const baseBtn =
    "px-5 py-2 rounded-full text-sm transition-all duration-300 backdrop-blur-md border";

  const activeBtn =
    "bg-white/20 border-white/40 text-white shadow-lg scale-105";

  const inactiveBtn =
    "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white";

  return (
    <div className="flex flex-wrap gap-3">
         <button
        onClick={() => updateFilter("category", "all")}
        className={`${baseBtn} ${
          activeCategory === "all" ? activeBtn : inactiveBtn
        }`}
      >
         All
      </button>

      {/* Category */}
      <button
        onClick={() => updateFilter("category", activeCategory === "men" ? "" : "men")}
        className={`${baseBtn} ${
          activeCategory === "men" ? activeBtn : inactiveBtn
        }`}
      >
        👔 Men
      </button>

      <button
        onClick={() => updateFilter("category", activeCategory === "women" ? "" : "women")}
        className={`${baseBtn} ${
          activeCategory === "women" ? activeBtn : inactiveBtn
        }`}
      >
        👗 Women
      </button>

       <button
        onClick={() => updateFilter("category", activeCategory === "electronics" ? "" : "electronics")}
        className={`${baseBtn} ${
          activeCategory === "electronics" ? activeBtn : inactiveBtn
        }`}
      >
        Electronics
      </button>

       <button
        onClick={() => updateFilter("category", activeCategory === "furniture" ? "" : "furniture")}
        className={`${baseBtn} ${
          activeCategory === "furniture" ? activeBtn : inactiveBtn
        }`}
      >
        Furniture
      </button>

      <button
        onClick={() => updateFilter("category", activeCategory === "clothing" ? "" : "clothing")}
        className={`${baseBtn} ${
          activeCategory === "clothing" ? activeBtn : inactiveBtn
        }`}
      >
        Clothing
      </button>

      <button
        onClick={() => updateFilter("category", activeCategory === "toys" ? "" : "toys")}
        className={`${baseBtn} ${
          activeCategory === "toys" ? activeBtn : inactiveBtn
        }`}
      >
        Toys
      </button>

      <button
        onClick={() => updateFilter("category", activeCategory === "fitness" ? "" : "fitness")}
        className={`${baseBtn} ${
          activeCategory === "fitness" ? activeBtn : inactiveBtn
        }`}
      >
        Fitness
      </button>

      {/* Sort */}
      <button
        onClick={() => updateFilter("sort", activeSort === "price" ? "" : "price")}
        className={`${baseBtn} ${
          activeSort === "price" ? activeBtn : inactiveBtn
        }`}
      >
        💰 Price
      </button>

    </div>
  );
}