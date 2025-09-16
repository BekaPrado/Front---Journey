import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

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
      alert("Usuário cadastrado!");
      navigate("/");
    } catch (err) {
      alert("Erro ao cadastrar: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
        <input type="date" name="data_nascimento" onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/" className="link">Já tem conta? Faça login</Link>
    </div>
  );
}

export default Register;
