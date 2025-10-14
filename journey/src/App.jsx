// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/home/home.jsx";
import CriarGrupo from "./pages/criarGrupo/criarGrupo.jsx";
import Calendar from "./pages/calendary/calendary.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Grupo from "./pages/grupo/grupo.jsx";
import MeusGrupos from "./pages/meusGrupos/MeusGrupos.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from './context/SidebarContext'; // Importar o Provedor
import { ThemeProvider } from "./context/ThemeContext"; // ⬅️ importa o novo contexto

// IMPORT DO CSS GLOBAL DE LAYOUT (substitua o index.css atual por esse que te envio abaixo)
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* ROTAS PROTEGIDAS - ENVOLVIDAS COM O SidebarProvider */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <Home />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/criarGrupo"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <CriarGrupo />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendary"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <Calendar />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <Perfil />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/grupo"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <Grupo />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/meus-grupos"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <MeusGrupos />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}