// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/home/home.jsx";
import CriarGrupo from "./pages/criarGrupo/criarGrupo.jsx";
import Calendar from "./pages/calendary/calendary.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import PublicProfile from "./pages/perfil/PublicProfile.jsx";
import Grupo from "./pages/grupo/grupo.jsx";
import MeusGrupos from "./pages/meusGrupos/MeusGrupos.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import GrupoHome from "./pages/grupo/GrupoHome.jsx";
import Chat from "./pages/grupo/chat/Chat.jsx";
import PrivateChat from "./pages/chat/PrivateChat.jsx";

import "./index.css";

function LayoutController() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    if (location.pathname === "/auth" || location.pathname === "/") {
      body.classList.remove("fullscreen-layout");
    } else {
      body.classList.add("fullscreen-layout");
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutController />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* ROTAS PROTEGIDAS */}
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
            path="/perfil/:id_usuario"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <PublicProfile />
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
            path="/grupo-home"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <GrupoHome />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupo/chat"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Chat />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/privado/:id_usuario"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <PrivateChat />
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
