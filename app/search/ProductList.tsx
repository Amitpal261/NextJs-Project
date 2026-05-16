type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function ProductList({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-10">

      {/* Background Image
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Black Overlay */}
      {/* <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div> */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">

        <h1 className="text-4xl font-bold text-white mb-10">
          🛍️ Luxury Store
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((p) => (
            <div
              key={p.id}
              className="
                bg-white/10 
                backdrop-blur-lg 
                border border-white/20 
                rounded-2xl 
                p-5 
                shadow-lg 
                hover:shadow-2xl 
                hover:scale-105 
                transition 
                duration-300
              "
            >
              {/* Category */}
              <div className=" flex justify-between items-center text-xs text-gray-300 uppercase tracking-widest">
                {p.category}
                <img
                  src={`https://i.pravatar.cc/150?img=${p.id}`}
                  alt={p.name}
                  className="w-14 h-14 rounded-full mb-3"
                />
              </div>
               
              {/* Name */}
              <h3 className="text-lg font-semibold text-white mt-2">
                {p.name}
              </h3>

              {/* Price */}
              <p className="text-2xl font-bold text-green-400 mt-3">
                ${p.price}
              </p>

              {/* Button */}
              <button className="
                mt-5 w-full 
                bg-white/20 
                border border-white/30 
                text-white 
                py-2 rounded-lg 
                hover:bg-white/30 
                transition
              ">
                Add to Cart
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}