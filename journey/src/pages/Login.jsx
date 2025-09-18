import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/usuario");
      const usuario = res.data.usuario.find(
        (u) => u.email === form.email && u.senha === form.senha
      );

      if (usuario) {
        alert("Login realizado!");
        navigate("/dashboard"); // página após login
      } else {
        alert("Email ou senha incorretos!");
      }
    } catch {
  alert("Erro ao logar");
}

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Entrar</h2>
        <p className="subtitle">
          Não tem conta?{" "}
          <Link to="/register" className="link">Cadastre-se</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
          <button type="submit">Entrar</button>
        </form>
        <Link to="/forgot-password" className="link">Esqueceu a senha?</Link>
      </div>
    </div>
  );
}

export default Login;
