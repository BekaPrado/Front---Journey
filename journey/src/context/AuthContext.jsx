// authcontext.jsx
import React, { createContext, useState, useContext } from 'react'

// contexto simples para manter usuario logado no frontend
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('journey_user')
    return raw ? JSON.parse(raw) : null
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('journey_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('journey_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
