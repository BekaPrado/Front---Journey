import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestRecoveryCode } from '../api/recovery'

export default function Recover() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const nav = useNavigate()

  async function handle(e) {
    e.preventDefault()
    if (!email) return setMsg('Informe o email')
    const res = await requestRecoveryCode(email)
    if (res?.message) {
      setMsg(res.message)
      if (/sucesso|enviado/i.test(res.message)) {
        nav('/validate-code', { state: { email } })
      }
    }
  }

  return (
    <div className="container">
      <div className="form-area">
        <h2>Recupere sua senha!</h2>
        <p>Digite seu e-mail para enviarmos o código de recuperação.</p>

        <form onSubmit={handle}>
          <input type="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
          <button type="submit">Recuperar</button>
        </form>

        <p><a href="/login">Voltar</a></p>
        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  )
}
