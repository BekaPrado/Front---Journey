// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; // 👈 novo
import Home from "./pages/home/home.jsx";
import CriarGrupo from './pages/criarGrupo/criarGrupo.jsx'
import Calendar from './pages/calendary/calendary.jsx'


import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
                <Route path='/criarGrupo' element={<CriarGrupo/>}/>
                      <Route path='/calendary' element={<Calendar/>}/>


        </Routes>
    
    </div>
  );
}
