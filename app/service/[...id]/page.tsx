import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string[] } }) {
  // ✅ Check params properly
  if (!params.id || params.id.length === 0) {
    notFound();
  }

  return (
    <div className="text-5xl text-yellow-200 flex justify-center w-full h-screen items-center bg-yellow-900">
      You are Searching {params.id.join(" / ")} service
    </div>
  );
}