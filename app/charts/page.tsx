export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams; // ✅ unwrap
  const query = params.query;

  console.log("query:", query);

  return (
    <div className="bg-white/70 text-black justify-center items-center text-center py-2 text-xl">
      <h1>You searched: {query}</h1>
    </div>
  );
}

//NOTE MAKE URL LIKE THIS 
//http://localhost:3000/charts?query=Amit%20Pal