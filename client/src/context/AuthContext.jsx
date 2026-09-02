"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("dastan_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const mockUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    localStorage.setItem("dastan_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const register = (name, email, password) => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem("dastan_user", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dastan_user");
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("dastan_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
