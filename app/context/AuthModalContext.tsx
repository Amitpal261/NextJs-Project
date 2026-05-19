"use client";
import { createContext, useContext, useState, useEffect } from "react";

type AuthMode = "login" | "signup" | null;

type AuthModalContextType = {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AuthMode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 check token on load
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/authme"); // create this API
      setIsLoggedIn(res.ok);
    };
    checkAuth();
  }, []);

  return (
    <AuthModalContext.Provider value={{ mode, setMode, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used inside provider");
  return ctx;
}