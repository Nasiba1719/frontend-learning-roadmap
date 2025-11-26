"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "ecommerce_auth_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Auth localStorage read error:", error);
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (user) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Auth localStorage write error:", error);
    }
  }, [user]);

  const login = (email) => {
    // Demo üçün sadə auth (real layihədə backend istifadə olunacaq)
    const namePart = email.split("@")[0] || "İstifadəçi";
    const name =
      namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
    setUser({ id: 1, name, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}


