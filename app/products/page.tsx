import Link from "next/link";
import Image from "next/image";

// ✅ Types
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
};

type ApiResponse = {
  products: Product[];
};

// ✅ Fetch
async function getProducts(): Promise<ApiResponse> {
  const res = await fetch(
    "https://dummyjson.com/products/category/vehicle",
    {
      cache: "force-cache",
    }
  );
  return res.json();
}

// ✅ Page
export default async function Page() {
  const data = await getProducts();

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1669295384050-a1d4357bd1d7?w=1600&auto=format&fit=crop&q=80")`,
        }}
      />

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black/90 backdrop-brightness-75" />

      {/* 📦 Content */}
      <div className="relative z-10 p-10">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold text-center mb-14 tracking-tight">
          Luxury Collection :{new Date().getSeconds()}
        </h1>
         
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data.products.map((product) => (
            
            <div
              key={product.id}
              className="group relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition duration-500"
            >
              
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-medium tracking-wide mb-1">
                  {product.title}
                </h2>

                <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                  {product.description}
                </p>

                {/* Price + Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold text-white">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-300">
                    ★ {product.rating}
                  </span>
                </div>

                {/* Button */}
                <Link href={`/products/${product.id}`}>
                  <button className="w-full py-2 rounded-xl border border-white/20 text-sm tracking-wide hover:bg-white hover:text-black transition duration-300">
                    Explore →
                  </button>
                </Link>
              </div>

              {/* ✨ Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
              </div>
            </div>

          ))}
        </div>
      </div>
         
    </div>
  );
}