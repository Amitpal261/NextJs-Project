import Filters from "./Fliters";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { getProducts } from "./data";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
    limit?: number;
  }>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const category = params.category || "all";
  const sort = params.sort || "relevance";
  const page = Number(params.page || 1);
  const limit = Number(params.limit || 8);
   
  const {products, total }= await getProducts({ q, category, sort, page, limit });
  const totalPages = Math.ceil(total / limit);
 
//  if (page > totalPages) {
//    page = totalPages || 1;
// }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black/80 via-gray-900 to-black text-white p-6">

      {/* 🔥 Glass Container */}
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Amazon Clone Search
        </h1>

        {/* Search */}
        <div className="mb-6">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-lg">
            <SearchBar />
          </div>
        </div>

         <Filters/>
        {/* Products */}
        <div className="mb-6 mt-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
            <ProductList products={products} />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-3 shadow-lg">
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </div>

      </div>
    </div>
  );
}