import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recuperar-senha", { email });
      // Salva apenas o email (seguro)
      localStorage.setItem("recoverEmail", email);
      navigate("/reset-password");
    } catch (err) {
      alert("Erro ao enviar código. Tente novamente.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar código</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
