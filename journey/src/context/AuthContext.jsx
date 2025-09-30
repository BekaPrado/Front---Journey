// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // carrega do localStorage ao iniciar
  useEffect(() => {
    const raw = localStorage.getItem("journey_user");
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("journey_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("journey_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
