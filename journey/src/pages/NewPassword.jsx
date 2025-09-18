import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NewPassword() {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Sessão inválida. Refazer recuperação de senha.");
      navigate("/forgot-password");
      return;
    }

    try {
        await api.put(`/usuario/senha/${userId}`, { senha: novaSenha });
        alert("Senha redefinida com sucesso!");
      // Limpa os dados sensíveis do localStorage
      localStorage.removeItem("recoverEmail");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (err) {
      alert("Erro ao redefinir senha.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Definir nova senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Redefinir Senha</button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
