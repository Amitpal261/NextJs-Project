"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const UseRouter = () => {
    const Router = useRouter();
   

       const GotoAbout = ()=>{
        Router.push("/about")
       }

     return <button onClick={GotoAbout} className='mt-10 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>
    Go to About
  </button>

}

export default UseRouter
