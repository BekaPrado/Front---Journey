// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  
  // VERIFIQUE SE ESTÁ REDIRECIONANDO PARA A ROTA CORRETA
  // A rota de login é /auth, não /login.
  if (!user) return <Navigate to="/auth" replace /> // 👈 Mude para /auth se não estiver
  
  return children
}