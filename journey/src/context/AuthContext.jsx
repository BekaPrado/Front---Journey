// src/context/AuthContext.jsx
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
        // Garantir que o objeto tenha a forma esperada (id_usuario, nome_completo, email, tipo_usuario)
        const normalized = normalizeStoredUser(parsed);
        setUser(normalized);
        // Re-salva a versão normalizada (evita inconsistências futuras)
        localStorage.setItem("journey_user", JSON.stringify(normalized));
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        localStorage.removeItem("journey_user");
      }
    }
  }, []);

  // Normaliza a forma do objeto recebido do backend/auth
  function normalizeUserFromBackend(dataUser) {
    if (!dataUser) return null;
    const id_usuario = dataUser.id_usuario ?? dataUser.id ?? null;
    const nome_completo = dataUser.nome_completo ?? dataUser.nome ?? dataUser.fullname ?? "";
    const email = dataUser.email ?? dataUser.user_email ?? "";
    const tipo_usuario = dataUser.tipo_usuario ?? dataUser.tipo ?? "";
    const foto_perfil = dataUser.foto_perfil ?? dataUser.foto ?? dataUser.avatar ?? "";
    return { id_usuario, nome_completo, email, tipo_usuario, foto_perfil };
  }

  // Normaliza qualquer objeto vindo do localStorage (só para garantir)
  function normalizeStoredUser(obj) {
    if (!obj) return null;
    // se já estiver normalizado, retorna direto
    if (obj.id_usuario) return obj;
    // tenta mapear campos comuns
    return normalizeUserFromBackend(obj);
  }

  // 🔹 login agora salva tanto o usuário quanto o token
  const login = (data) => {
    if (!data || !data.usuario) return;

    // data.usuario pode vir em formatos diferentes: { id_usuario, nome_completo } ou { id, nome }
    const usuario = normalizeUserFromBackend(data.usuario);

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
