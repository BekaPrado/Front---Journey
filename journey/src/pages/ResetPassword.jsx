import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("recoverEmail");

    try {
      const res = await api.post("/validar-codigo", { email, codigo });

      if (res.data && res.data.userId) {
        // Salva o id do usuário somente após validar o código
        localStorage.setItem("userId", res.data.userId);
        navigate("/new-password");
      } else {
        alert("Código inválido ou expirado.");
      }
    } catch (err) {
      alert("Erro ao validar código.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Digite o código recebido</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <button type="submit">Validar Código</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
