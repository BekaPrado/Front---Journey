import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState(null)
  const { login } = useAuth()

  async function handle(e) {
    e.preventDefault()
    if (!email || !senha) return setMsg('Preencha email e senha')
    login({ email })
    setMsg('Logado com sucesso ')
  }

  return (
    <div className="container">
      <div className="form-area">
        <h2>Entre em sua conta.</h2>
        <p>Não possui conta? <a href="/register">Cadastrar</a></p>

        <form onSubmit={handle}>
          <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>

        <p><a href="/recover">Esqueceu sua senha?</a></p>
        <p>Já é um profissional? <a href="/register?type=pro">Criar conta como profissional</a></p>
        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  )
}
