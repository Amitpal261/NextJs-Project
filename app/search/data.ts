export async function getProducts({
  q,
  category,
  sort,
  page =1,
  limit = 8 
}: {
  q: string;
  category: string;
  sort: string;
  page: number;
  limit : number;
}) {
 

 const allProducts = [
  { id: 1, name: "Nike Air Max Shoes", price: 120, category: "men" },
  { id: 2, name: "Adidas Running Shoes", price: 95, category: "men" },
  { id: 3, name: "Puma Sports Shoes", price: 85, category: "men" },

  { id: 4, name: "Women Heels Sandal", price: 70, category: "women" },
  { id: 5, name: "Zara Women Shoes", price: 110, category: "women" },
  { id: 6, name: "H&M Casual Sneakers", price: 60, category: "women" },

  { id: 7, name: "Apple iPhone 14", price: 900, category: "electronics" },
  { id: 8, name: "Samsung Galaxy S23", price: 850, category: "electronics" },
  { id: 9, name: "Apple Watch Series 8", price: 500, category: "electronics" },
  { id: 10, name: "Sony Headphones", price: 200, category: "electronics" },

  { id: 11, name: "Wooden Study Table", price: 300, category: "furniture" },
  { id: 12, name: "Office Chair", price: 150, category: "furniture" },

  { id: 13, name: "Men T-Shirt Nike", price: 40, category: "clothing" },
  { id: 14, name: "Women Kurti", price: 35, category: "clothing" },
  { id: 15, name: "Levi's Jeans", price: 80, category: "clothing" },

  { id: 16, name: "Dell Laptop", price: 1000, category: "electronics" },
  { id: 17, name: "HP Laptop", price: 950, category: "electronics" },

  { id: 18, name: "Kids Toy Car", price: 25, category: "toys" },
  { id: 19, name: "Building Blocks Set", price: 45, category: "toys" },

  { id: 20, name: "Gym Dumbbells", price: 120, category: "fitness" },

  // 🔥 Added more
  { id: 21, name: "Reebok Sneakers", price: 90, category: "men" },
  { id: 22, name: "Formal Leather Shoes", price: 130, category: "men" },
  { id: 23, name: "Women Flats", price: 55, category: "women" },
  { id: 24, name: "High Heel Pumps", price: 95, category: "women" },

  { id: 25, name: "MacBook Air", price: 1200, category: "electronics" },
  { id: 26, name: "iPad Pro", price: 800, category: "electronics" },
  { id: 27, name: "Bluetooth Speaker", price: 150, category: "electronics" },
  { id: 28, name: "Smart TV 55 inch", price: 700, category: "electronics" },

  { id: 29, name: "Dining Table Set", price: 600, category: "furniture" },
  { id: 30, name: "Sofa Set", price: 900, category: "furniture" },
  { id: 31, name: "Bed Frame King Size", price: 750, category: "furniture" },

  { id: 32, name: "Men Hoodie", price: 60, category: "clothing" },
  { id: 33, name: "Women Jacket", price: 85, category: "clothing" },
  { id: 34, name: "Sports Shorts", price: 30, category: "clothing" },

  { id: 35, name: "Gaming Laptop", price: 1500, category: "electronics" },
  { id: 36, name: "Mechanical Keyboard", price: 120, category: "electronics" },

  { id: 37, name: "Toy Train Set", price: 60, category: "toys" },
  { id: 38, name: "Puzzle Game", price: 20, category: "toys" },

  { id: 39, name: "Yoga Mat", price: 35, category: "fitness" },
  { id: 40, name: "Treadmill", price: 800, category: "fitness" },

  { id: 41, name: "Football", price: 25, category: "sports" },
  { id: 42, name: "Cricket Bat", price: 70, category: "sports" },

  { id: 43, name: "Backpack Bag", price: 50, category: "accessories" },
  { id: 44, name: "Sunglasses", price: 40, category: "accessories" },

  { id: 45, name: "Wall Clock", price: 30, category: "home" },
  { id: 46, name: "LED Lamp", price: 45, category: "home" },

  { id: 47, name: "Coffee Maker", price: 100, category: "home" },
  { id: 48, name: "Mixer Grinder", price: 150, category: "home" },

  { id: 49, name: "Hair Dryer", price: 60, category: "beauty" },
  { id: 50, name: "Perfume Set", price: 120, category: "beauty" },
];


  let filtered = allProducts;

  // 🔎 search
  if (q) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()),
    );
  }

  // 📦 category filter
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // 🔃 sorting
  if (sort === "price") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedProducts = filtered.slice(start, end);


 return {
    products: paginatedProducts,
    total: filtered.length, // 🔥 important
  };
}
