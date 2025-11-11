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
import ChatHome from "./pages/chat/ChatHome.jsx";
import Participantes from "./pages/grupo/Participantes.jsx";
import EditarGrupo from "./pages/grupo/EditarGrupo.jsx";
import Libary from "./pages/ebook/ebook.jsx";
import CadastrarEbook from "./pages/ebook/CadastrarEbook.jsx";
import DetalheEbook from "./pages/ebook/areaEbook.jsx";

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
            path="/chat"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <ChatHome />
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
            path="/grupo/participantes"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Participantes />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupo/editar"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <EditarGrupo />
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
          <Route
            path="/ebook"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Libary />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastrar-ebook"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <CadastrarEbook />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ebook/:id_ebooks"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <DetalheEbook />
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
