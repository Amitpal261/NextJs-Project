import React from 'react'

const page = async ({
  searchParams,
}: {
 searchParams: Promise<{ query?: string; page?: string }>
}) => {
  const params = await searchParams; // ✅ unwrap
  const query = params.query;
  console.log("query :",query)
  return (
    <div className='text-5xl  flex flex-col gap-5 text-yellow-200 flex justify-center w-full h-screen  items-center bg-pink-900'>
      barChart
    </div>
  )
}

export default page
