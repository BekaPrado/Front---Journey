import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", data_nascimento: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuario", form, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Cadastro realizado!");
      navigate("/");
    } catch (err) {
      alert("Erro ao cadastrar: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Criar Conta</h2>
        <p className="subtitle">
          Já tem conta?{" "}
          <Link to="/" className="link">Entrar</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
          <input type="date" name="data_nascimento" onChange={handleChange} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
