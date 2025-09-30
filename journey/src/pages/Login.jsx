// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handle(e) {
    e.preventDefault();
  
    if (!email || !senha) {
      return setMsg("Preencha email e senha");
    }
  
    try {
      const res = await fetch("http://localhost:8080/v1/journey/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }), // ajusta se backend espera outros campos
      });
  
      const data = await res.json();
      console.log("RESPOSTA LOGIN:", res.status, data);
  
      if (![200, 201].includes(res.status)) {
        throw new Error(data.message || "Erro no login");
      }
  
      // 🔑 supondo que API devolva { token, usuario: {...} }
      login(data);
  
      setMsg("Logado com sucesso!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setMsg("Erro ao efetuar login. Verifique suas credenciais.");
    }
  }

  
  return (
    <div className="container">
      <div className="form-area">
        <h2>Entre em sua conta.</h2>
        <p>
          Não possui conta? <a href="/register">Cadastrar</a>
        </p>

        <form onSubmit={handle}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        <p>
          <a href="/recover">Esqueceu sua senha?</a>
        </p>
        <p>
          Já é um profissional?{" "}
          <a href="/register?type=pro">Criar conta como profissional</a>
        </p>
        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src="/journey.png" alt="ilustração cadastro" />
      </div>
    </div>
  );
}
