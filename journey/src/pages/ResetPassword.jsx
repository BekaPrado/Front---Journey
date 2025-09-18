import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { id } = useParams(); // id do usuário retornado pela API ao validar código
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1 - validar código
      await api.post("/validar-codigo", { email: "EMAIL_DO_USUARIO", codigo });

      // 2 - trocar senha
      await api.put(`/usuario/senha/${id}`, { senha: novaSenha }, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Senha alterada!");
      navigate("/");
    } catch (err) {
      alert("Erro: " + err.response?.data?.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Definir Nova Senha</h2>
        <p className="subtitle">Digite o código que recebeu no email e sua nova senha</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Código de verificação"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <button type="submit">Alterar Senha</button>
        </form>
        <Link to="/" className="link">Voltar ao Login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
