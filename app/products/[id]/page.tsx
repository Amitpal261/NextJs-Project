import Image from "next/image";

// ✅ ISR
export const revalidate = 30;

// ✅ Type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
};
type NextFetchRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

// ✅ Fetch (SERVER)
async function getProduct(id: string): Promise<Product> {
  const res = await fetch(
    `https://dummyjson.com/products/${id}`,
    
      {next: { revalidate: 30 }} as NextFetchRequestInit
    
  );
  console.log("Res :",res)
  return res.json();
}

// ✅ Static params (optional but recommended)
export async function generateStaticParams() {
  const res = await fetch(
    "https://dummyjson.com/products/category/vehicle" ,
    {cache : "force-cache"}
  );
  const data = await res.json();

  return data.products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

// ✅ PAGE
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1669295384050-a1d4357bd1d7?w=1600&auto=format&fit=crop&q=80")`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-black/90 backdrop-brightness-75" />

      {/* Title */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-semibold text-center pt-10 mb-14 tracking-tight">
        Revalidates every 30s : {new Date().getSeconds()}
      </h1>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-10 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Image */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10">
          <Image
          
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="object-cover w-300"

          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="text-sm text-gray-400">★ {product.rating}</span>
          </div>

          <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative z-10 max-w-6xl mx-auto px-10 pb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {product.images?.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10"
          >
            <Image src={img} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

    </div>
  );
}