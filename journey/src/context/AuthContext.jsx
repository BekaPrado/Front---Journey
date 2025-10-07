// src/context/AuthContext.jsx (versão compatível com AuthPage e Perfil)

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega automaticamente o usuário salvo no localStorage
  useEffect(() => {
    const rawUser = localStorage.getItem("journey_user");
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        setUser(parsed);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        localStorage.removeItem("journey_user");
      }
    }
  }, []);

  // 🔹 login agora salva tanto o usuário quanto o token
  const login = (data) => {
    if (!data || !data.usuario) return;

    const usuario = {
      id_usuario: data.usuario.id,
      nome_completo: data.usuario.nome,
      email: data.usuario.email,
      tipo_usuario: data.usuario.tipo_usuario,
    };

    setUser(usuario);
    localStorage.setItem("journey_user", JSON.stringify(usuario));

    if (data.token) {
      localStorage.setItem("journey_token", data.token);
    }
  };

  // 🔹 logout limpa tudo de forma consistente
  const logout = () => {
    setUser(null);
    localStorage.removeItem("journey_user");
    localStorage.removeItem("journey_token");
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
