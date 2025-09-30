// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { registerUser, updatePassword } from "../api/user";
import { requestRecoveryCode, validateCode } from "../api/recovery";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode = "login" }) {
  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    senha: "",
    data_nascimento: "",
    tipo_usuario: "Estudante",
    linkedin: "",
    codigo: "",
    conf: ""
  });
  const [msg, setMsg] = useState(null);

  const { login } = useAuth();
  const nav = useNavigate();
  const { id } = useParams();
  const loc = useLocation();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (mode === "login") {
        if (!form.email || !form.senha) return setMsg("Preencha email e senha");
        login({ email: form.email });
        localStorage.setItem("user", JSON.stringify({ email: form.email }));
        setMsg("Logado com sucesso");
        nav("/");
      }

      if (mode === "register") {
        if (form.tipo_usuario === "Profissional" && !form.linkedin) {
          return setMsg("Informe o LinkedIn");
        }
        const payload = {
          nome_completo: form.nome_completo,
          email: form.email,
          senha: form.senha,
          data_nascimento: form.data_nascimento,
          tipo_usuario: form.tipo_usuario,
          descricao:
            form.tipo_usuario === "Profissional"
              ? `linkedin:${form.linkedin}`
              : ""
        };
        const res = await registerUser(payload);
        setMsg(res?.message || "Cadastro realizado!");
      }

      if (mode === "recover") {
        if (!form.email) return setMsg("Informe o email");
        const res = await requestRecoveryCode(form.email);
        setMsg(res?.message);
        if (/sucesso|enviado/i.test(res?.message)) {
          nav("/auth/validate", { state: { email: form.email } });
        }
      }

      if (mode === "validate") {
        const email = loc.state?.email || form.email;
        if (!email || !form.codigo)
          return setMsg("Preencha email e código");
        const res = await validateCode(email, form.codigo);
        if (res?.id_usuario) {
          nav(`/auth/reset/${res.id_usuario}`);
        } else {
          setMsg(res?.message || "Código inválido");
        }
      }

      if (mode === "reset") {
        if (!form.senha || form.senha.length < 6)
          return setMsg("Senha deve ter pelo menos 6 caracteres");
        if (form.senha !== form.conf)
          return setMsg("Senhas não conferem");
        const res = await updatePassword(id, form.senha);
        setMsg(res?.message || "Senha alterada!");
        setTimeout(() => nav("/auth/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      setMsg("Erro ao processar ação");
    }
  }

  // ========= Formulários renderizados por modo =========
  function renderForm() {
    switch (mode) {
      case "login":
        return (
          <>
            <h2>Entre em sua conta</h2>
            <p>
              Não possui conta? <a href="/auth/register">Cadastrar</a>
            </p>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="senha"
              value={form.senha}
              onChange={handleChange}
            />
            <button type="submit">Entrar</button>
            <p><a href="/auth/recover">Esqueceu sua senha?</a></p>
          </>
        );

      case "register":
        return (
          <>
            <h2>Crie sua conta</h2>
            <p>
              Já possui conta? <a href="/auth/login">Login</a>
            </p>
            <input
              name="nome_completo"
              placeholder="nome completo"
              value={form.nome_completo}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="senha"
              placeholder="senha"
              value={form.senha}
              onChange={handleChange}
            />
            <input
              type="date"
              name="data_nascimento"
              value={form.data_nascimento}
              onChange={handleChange}
            />
            <select
              name="tipo_usuario"
              value={form.tipo_usuario}
              onChange={handleChange}
            >
              <option value="Estudante">Estudante</option>
              <option value="Profissional">Profissional</option>
            </select>
            {form.tipo_usuario === "Profissional" && (
              <input
                placeholder="LinkedIn URL"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
              />
            )}
            <button type="submit">Cadastrar</button>
          </>
        );

      case "recover":
        return (
          <>
            <h2>Recupere sua senha!</h2>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
            />
            <button type="submit">Recuperar</button>
            <p><a href="/auth/login">Voltar</a></p>
          </>
        );

      case "validate":
        return (
          <>
            <h2>Verifique seu e-mail!</h2>
            <input
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="codigo"
              placeholder="código"
              value={form.codigo}
              onChange={handleChange}
            />
            <button type="submit">Confirmar</button>
          </>
        );

      case "reset":
        return (
          <>
            <h2>Troque sua senha!</h2>
            <input
              type="password"
              name="senha"
              placeholder="nova senha"
              value={form.senha}
              onChange={handleChange}
            />
            <input
              type="password"
              name="conf"
              placeholder="confirme a nova senha"
              value={form.conf}
              onChange={handleChange}
            />
            <button type="submit">Confirmar</button>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="container">
      <div className="form-area">
        <form onSubmit={handleSubmit}>
          {renderForm()}
          {msg && <p className="msg">{msg}</p>}
        </form>
      </div>
      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  );
}
