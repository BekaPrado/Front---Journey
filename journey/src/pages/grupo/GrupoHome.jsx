import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:3030/v1/journey";

export default function GrupoHome() {
  const [grupo, setGrupo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarGrupo = async () => {
      try {
        const grupoSalvo = JSON.parse(localStorage.getItem("grupo_atual"));

        if (!grupoSalvo?.id_grupo) {
          console.warn("⚠️ Nenhum grupo encontrado no localStorage");
          setGrupo(null);
          setCarregando(false);
          return;
        }

        // 🔹 Buscar grupo atualizado do back-end (caso tenha mudado algo)
        const resp = await fetch(`${API_URL}/group/${grupoSalvo.id_grupo}`);
        const data = await resp.json();

        if (data?.grupo) {
          setGrupo(data.grupo);
          console.log("✅ Grupo carregado:", data.grupo);
        } else {
          console.warn("Nenhum grupo encontrado no servidor para o ID:", grupoSalvo.id_grupo);
          setGrupo(grupoSalvo); // mantém o salvo localmente
        }
      } catch (error) {
        console.error("Erro ao carregar grupo:", error);
        setGrupo(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarGrupo();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (!grupo) return <p>Grupo não encontrado.</p>;

  return (
    <div className="grupo-home-container">
      <header className="grupo-header">
        <button className="btn-voltar" onClick={() => navigate("/grupos")}>
          ←
        </button>
        <h1>{grupo.nome}</h1>
      </header>

      <div className="grupo-content">
        <img
          src={grupo.imagem || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt={grupo.nome}
          className="grupo-imagem"
        />

        <div className="grupo-info">
          <p><strong>Descrição:</strong> {grupo.descricao}</p>
          <p><strong>Limite de membros:</strong> {grupo.limite_membros}</p>

          <button
            className="btn-join"
            onClick={() => navigate("/grupo/chat", { state: { grupo } })}
          >
            Ir para o Chat
          </button>
        </div>
      </div>
    </div>
  );
}
