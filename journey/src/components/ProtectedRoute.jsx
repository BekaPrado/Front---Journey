// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Aguarda o carregamento inicial do contexto (evita redirecionar antes de carregar)
  const isLoading = user === undefined || user === null && !localStorage.getItem("journey_user");

  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Carregando...</div>;
  }

  // Se não há usuário logado → redireciona para /auth
  if (!user && !localStorage.getItem("journey_user")) {
    return <Navigate to="/auth" replace />;
  }

  // Caso contrário, exibe o conteúdo protegido normalmente
  return children;
}
