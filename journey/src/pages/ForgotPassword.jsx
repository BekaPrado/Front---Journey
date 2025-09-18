import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recuperar-senha", { email });
      alert("Código enviado para o email!");
      navigate("/reset-password/1"); // depois você troca para o ID do usuário vindo da API
    } catch (err) {
      alert("Erro: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Recuperar Senha</h2>
        <p className="subtitle">Digite seu email para receber um código de verificação</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Enviar Código</button>
        </form>
        <Link to="/" className="link">Voltar ao Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
