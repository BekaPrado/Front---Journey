import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/recuperar-senha", { email });
      if (res.data.success) {
        alert("Código de recuperação enviado para seu email.");
        navigate("/reset-password", { state: { email } }); // passa email para próxima tela
      } else {
        alert(res.data.message || "Erro ao enviar código.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor. Tente novamente.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Recuperar Senha</h2>
        <p className="subtitle">Digite seu email para receber um código de recuperação.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu email"
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
