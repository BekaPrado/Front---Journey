// app.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from "./pages/Register";
import Recover from "./pages/Recover";
import ValidateCode from "./pages/ValidadeCode";
import ResetPassword from "./pages/ResetPassword"; // <-- corrigido
import Home from "./pages/Home.jsx";

import ProtectedRoute from './components/ProtectedRoute'

// simples navbar para navegar (substituir pelo seu design)
export default function App() {
  return (
    <div>

      <main style={{padding: 24}}>
      <Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/recover" element={<Recover/>} />
  <Route path="/validate-code" element={<ValidateCode/>} />
  <Route path="/reset-password/:id" element={<ResetPassword/>} />
</Routes>

      </main>
    </div>
  )
}
