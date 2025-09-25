import React, { useState } from 'react'
import { registerUser } from '../api/user'

export default function Register() {
  const [form, setForm] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    data_nascimento: '',
    tipo_usuario: 'Estudante',
    linkedin: ''
  })
  const [msg, setMsg] = useState(null)

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e) {
    e.preventDefault()
    if (form.tipo_usuario === 'Profissional' && !form.linkedin) {
      return setMsg('Informe o LinkedIn para validar como profissional')
    }
    const payload = {
      nome_completo: form.nome_completo,
      email: form.email,
      senha: form.senha,
      data_nascimento: form.data_nascimento,
      tipo_usuario: form.tipo_usuario,
      descricao: form.tipo_usuario === 'Profissional' ? `linkedin:${form.linkedin}` : ''
    }

    try {
      const res = await registerUser(payload)

      if (res?.status && res?.status_code === 201) {
        setMsg('Usuário cadastrado com sucesso!')
      } else {
        setMsg(res?.message || 'Erro ao registrar')
      }
    } catch (err) {
      console.error('Erro no cadastro:', err)
      setMsg('Erro ao registrar')
    }
  }

  return (
    <div className="container">
      <div className="form-area">
        <h2>Crie sua conta.</h2>
        <p>Já possui conta? <a href="/login">Login</a></p>

        <form onSubmit={submit}>
          <input placeholder="nome completo" name="nome_completo" value={form.nome_completo} onChange={change} />
          <input type="email" placeholder="email" name="email" value={form.email} onChange={change} />
          <input type="password" placeholder="senha" name="senha" value={form.senha} onChange={change} />
          <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={change} />

          <select name="tipo_usuario" value={form.tipo_usuario} onChange={change}>
            <option value="Estudante">Estudante</option>
            <option value="Profissional">Profissional</option>
          </select>

          {form.tipo_usuario === 'Profissional' && (
            <input placeholder="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={change} />
          )}

          <button type="submit">Cadastrar</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  )
}
