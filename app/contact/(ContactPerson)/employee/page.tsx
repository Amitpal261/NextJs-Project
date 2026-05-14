import { notFound } from 'next/navigation';
import React from 'react'

const page = () => {
   const isAuthorized = false; // your condition

  if (!isAuthorized) {
    notFound(); // 👈 triggers not-found.tsx
  }
  return (
    <div className='text-5xl text-yellow-200 flex flex-col justify-center w-full h-screen items-center bg-red-900  gap-10'>
      You are Contacting to employees
    </div>
  )
}

export default page
