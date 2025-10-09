import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/home";
import MeusGrupos from "./pages/meusGrupos/MeusGrupos";
import Grupo from "./pages/grupo/grupo";
import Perfil from "./pages/perfil/perfil.jsx";
import CriarGrupo from "./pages/criarGrupo/criarGrupo.jsx";
import Login from "./pages/AuthPage.jsx";
import Cadastro from "./pages/AuthPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meus-grupos"
            element={
              <ProtectedRoute>
                <MeusGrupos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupo/:id"
            element={
              <ProtectedRoute>
                <Grupo />
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
            path="/criarGrupo"
            element={
              <ProtectedRoute>
                <CriarGrupo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
