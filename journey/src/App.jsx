// src/App.jsx

import React from "react";
// Não precisa importar BrowserRouter se ele estiver no seu index.js/main.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/home/home.jsx";
import CriarGrupo from "./pages/criarGrupo/criarGrupo.jsx";
import Calendar from "./pages/calendary/calendary.jsx";
import Perfil from "./pages/perfil/perfil.jsx"; // Não esqueça de importar
import Grupo from "./pages/grupo/grupo.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // 👈 IMPORTANTE

export default function App() {
  return (
    // Removendo o <div>, pois ele não é necessário
    <AuthProvider>
      {" "}
      {/* 👈 INSERIMOS O PROVEDOR AQUI */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* ROTAS PROTEGIDAS - TODAS precisam ser envolvidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/criarGrupo"
          element={
            <ProtectedRoute>
              <CriarGrupo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendary"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grupo"
          element={
            <ProtectedRoute>
              <Grupo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
    // Fim da remoção do <div>
  );
}