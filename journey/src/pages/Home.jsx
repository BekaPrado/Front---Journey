// home.jsx - pagina simples que mostra que usuario esta logado (protected)
import React from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Home(){
  const { user, logout } = useAuth()
  return (
    <div className="container">
      <h2>bem-vindo {user?.email ?? 'usuário'}</h2>
      <div style={{marginTop:12}}>
        <Button onClick={logout}>sair</Button>
      </div>
    </div>
  )
}
