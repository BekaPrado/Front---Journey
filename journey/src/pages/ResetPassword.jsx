import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recuperar-senha", { email });
      alert("Código enviado para o email!");
    } catch (err) {
      alert("Erro: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2>Recuperar Senha</h2>
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
  );
}

export default ForgotPassword;
