"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/search?${params.toString()}`);
  }

  const baseBtn =
    "flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all duration-300";

  const activeBtn = "bg-white/10 border-white/20 text-white hover:bg-white/20";

  const disabledBtn =
    "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Prev Button */}
      <button
        onClick={() => changePage(page - 1)}
        disabled={page <= 1}
        className={`${baseBtn} ${page <= 1 ? disabledBtn : activeBtn}`}
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      {/* Page Number */}
      <div className="px-6 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium shadow-inner">
        Page {page} of {totalPages}{" "}
      </div>

      {/* Next Button */}
      <button
        onClick={() => changePage(page + 1)}
        disabled={page >= totalPages}
        className={`${baseBtn} ${page >= totalPages ? disabledBtn : activeBtn}`}
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
