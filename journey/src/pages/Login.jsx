import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

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
      const usuario = res.data.usuarios.find(
        (u) => u.email === form.email && u.senha === form.senha
      );
      if (usuario) {
        alert("Login realizado!");
        navigate("/dashboard");
      } else {
        alert("Email ou senha incorretos!");
      }
    } catch (err) {
      alert("Erro ao logar");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
        <button type="submit">Entrar</button>
      </form>

      {/* 🔹 Links visíveis e estilizados */}
      <p>
        Não tem conta?{" "}
        <Link to="/register" className="link">
          Cadastre-se aqui
        </Link>
      </p>
      <p>
        <Link to="/forgot-password" className="link">
          Esqueceu a senha?
        </Link>
      </p>
    </div>
  );
}

export default Login;
