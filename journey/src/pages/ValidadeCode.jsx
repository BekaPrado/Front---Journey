import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { validateCode } from '../api/recovery'

export default function ValidateCode() {
  const nav = useNavigate()
  const loc = useLocation()
  const preEmail = loc.state?.email || ''
  const [email, setEmail] = useState(preEmail)
  const [codigo, setCodigo] = useState('')
  const [msg, setMsg] = useState(null)

  async function handle(e) {
    e.preventDefault()
    if (!email || !codigo) return setMsg('Preencha email e código')
    const res = await validateCode(email, codigo)
    if (res?.id_usuario) {
      nav(`/reset-password/${res.id_usuario}`)
    } else {
      setMsg(res?.message || 'Código inválido')
    }
  }

  return (
    <div className="container">
      <div className="form-area">
        <h2>Verifique seu e-mail!</h2>
        <p>Enviamos um código para seu e-mail, digite abaixo:</p>

        <form onSubmit={handle}>
          <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="código" value={codigo} onChange={e => setCodigo(e.target.value)} />
          <button type="submit">Confirmar</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  )
}
