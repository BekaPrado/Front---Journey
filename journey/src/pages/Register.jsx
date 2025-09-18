import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    senha: "",
    data_nascimento: "",
    tipo_usuario: "Estudante"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validação de data antes de enviar
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(form.data_nascimento)) {
      alert("Data de nascimento inválida! Use o formato YYYY-MM-DD.");
      return;
    }

    try {
      await api.post("/usuario", form, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Cadastro realizado!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Criar Conta</h2>
        <p className="subtitle">
          Já tem conta? <Link to="/" className="link">Entrar</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            name="nome_completo"
            placeholder="Nome completo"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="data_nascimento"
            onChange={handleChange}
            required
          />
          <select name="tipo_usuario" onChange={handleChange}>
            <option value="Estudante">Estudante</option>
            <option value="Profissional">Profissional</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
