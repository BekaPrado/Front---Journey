import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePassword } from '../api/user'

export default function ResetPassword() {
  const { id } = useParams()
  const nav = useNavigate()
  const [senha, setSenha] = useState('')
  const [conf, setConf] = useState('')
  const [msg, setMsg] = useState(null)

  async function handle(e) {
    e.preventDefault()
    if (!senha || senha.length < 6) return setMsg('Senha deve ter pelo menos 6 caracteres')
    if (senha !== conf) return setMsg('Senhas não conferem')
    const res = await updatePassword(id, senha)
    setMsg(res?.message || 'Senha alterada com sucesso')
    setTimeout(() => nav('/login'), 1500)
  }

  return (
    <div className="container">
      <div className="form-area">
        <h2>Troque sua senha!</h2>
        <p>Digite a nova senha e confirme abaixo:</p>

        <form onSubmit={handle}>
          <input type="password" placeholder="nova senha" value={senha} onChange={e => setSenha(e.target.value)} />
          <input type="password" placeholder="confirme a nova senha" value={conf} onChange={e => setConf(e.target.value)} />
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
