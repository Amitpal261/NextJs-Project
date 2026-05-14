"use client"
import { createContext, useContext, useState } from "react"

type AuthModalContextType = {
   open : boolean,
   setOpen : (val :boolean) => void
}

const AuthModalContext = createContext<AuthModalContextType | null>(null)


export function AuthModalProvider({children} :{children : React.ReactNode}) {
     const [ open , setOpen ] = useState(false)
     return (
     <AuthModalContext.Provider value = {{open , setOpen}}>
        {children}
     </AuthModalContext.Provider>
    )
}


export function useAuthModal(){
    const ctx = useContext(AuthModalContext)
    if(!ctx) throw new Error('useAuthModal must be used inside provider')
    return ctx
}