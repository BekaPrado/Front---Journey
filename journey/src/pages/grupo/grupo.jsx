// src/pages/grupo/grupo.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useAuth } from "../../context/AuthContext";
import "./grupo.css";

const API_URL = "http://localhost:3030/v1/journey";

export default function Grupo() {
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  // modo escuro (lê o valor salvo pelo Home)
  const [darkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // estado da sidebar (mantém comportamento atual)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // dados do grupo: pode vir via state (navigate(..., { state: g })) ou null
  const grupoState = state || null;
  const [grupo, setGrupo] = useState(grupoState);

  // relação do usuário com o grupo: 'carregando' | 'nenhum' | 'participante' | 'criador'
  const [relation, setRelation] = useState("carregando");
  const [participantes, setParticipantes] = useState(0);

  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  useEffect(() => {
    if (grupoState) setGrupo(grupoState);
  }, [grupoState]);

  useEffect(() => {
    async function loadStatusAndCount() {
      if (!grupo?.id_grupo) return;
  
      try {
        // 🔹 Verifica status do usuário no grupo
        const resp = await fetch(
          `${API_URL}/group/${grupo.id_grupo}/status?userId=${user?.id_usuario}`
        );
  
        if (resp.ok) {
          const data = await resp.json();
          const relationType = data.relation || "nenhum";
          setRelation(relationType);
  
          // ✅ Se o usuário já participa ou é criador, vai direto pra tela do grupo
          if (relationType === "participante" || relationType === "criador") {
            localStorage.setItem(
              "group_id",
              JSON.stringify({ id_grupo: grupo.id_grupo })
            );
            navigate("/grupo-home", { replace: true });
            return;
          }
        } else {
          setRelation("nenhum");
        }
      } catch (err) {
        console.error("Erro ao buscar status do grupo:", err);
        setRelation("nenhum");
      }
  
      // 🔹 Participantes
      try {
        const r2 = await fetch(`${API_URL}/group/${grupo.id_grupo}/participantes`);
        if (r2.ok) {
          const d2 = await r2.json();
          setParticipantes(d2.total ?? 0);
        } else {
          setParticipantes(0);
        }
      } catch (err) {
        console.error("Erro ao buscar participantes:", err);
        setParticipantes(0);
      }
    }
  
    loadStatusAndCount();
  }, [grupo, user, navigate]);
  

  async function handleParticipar() {
    if (!user || !grupo?.id_grupo)
      return alert("Você precisa estar logado para participar.");

    try {
      const resp = await fetch(`${API_URL}/group/${grupo.id_grupo}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: user.id_usuario }),
      });
      const data = await resp.json();

      if (resp.ok && data.status) {
        // Atualiza relação e participantes
        setRelation("participante");
        setParticipantes((p) => p + 1);
        window.dispatchEvent(new Event("groupsUpdated"));
        alert("Você entrou no grupo!");

        // Salva o id do grupo no localStorage
        localStorage.setItem(
          "group_id",
          JSON.stringify({ id_grupo: grupo.id_grupo })
        );
        console.log(localStorage.getItem("group_id"));
        // Navega para a página de calendário
        navigate("/grupo-home");
      } else {
        alert(data.message || "Não foi possível entrar no grupo.");
      }
    } catch (err) {
      console.error("Erro ao entrar no grupo:", err);
      alert("Erro ao entrar no grupo.");
    }
  }

  async function handleSair() {
    if (!user || !grupo?.id_grupo)
      return alert("Você precisa estar logado para sair.");

    try {
      const resp = await fetch(`${API_URL}/group/${grupo.id_grupo}/leave`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: user.id_usuario }),
      });
      const data = await resp.json();
      if (resp.ok && data.status) {
        setRelation("nenhum");
        setParticipantes((p) => Math.max(0, p - 1));
        window.dispatchEvent(new Event("groupsUpdated"));
        alert("Você saiu do grupo.");
      } else {
        alert(data.message || "Não foi possível sair do grupo.");
      }
    } catch (err) {
      console.error("Erro ao sair do grupo:", err);
      alert("Erro ao sair do grupo.");
    }
  }
  const salvarGrupo = async () => {
    localStorage.setItem(
      "group_id",
      JSON.stringify({
        id_grupo: grupo.id_grupo,
      })
    );
  };

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="grupo-container">
          <button className="btn-voltar" onClick={() => navigate(-1)}>
            ← Voltar
          </button>

          {!grupo ? (
            <>
              <p>Grupo não encontrado. Volte e selecione um grupo.</p>
              <button className="btn-acao" onClick={() => navigate(-1)}>
                Voltar
              </button>
            </>
          ) : (
            <>
              <h1 className="grupo-title">{grupo.nome}</h1>
              <img
                src={grupo.imagem || placeholder}
                alt={grupo.nome}
                className="grupo-banner"
              />
              <p className="grupo-desc">{grupo.descricao}</p>

              <div className="grupo-metas" style={{ marginBottom: 16 }}>
                <div className="meta-pill">
                  <strong>{participantes}</strong> membros
                </div>
                <div className="meta-pill">
                  Limite: {grupo.limite_membros ?? "—"}
                </div>
              </div>

              {relation === "carregando" && <p>Verificando status...</p>}

              {relation === "nenhum" && (
                <button className="btn-join" onClick={handleParticipar}>
                  Participar do Grupo
                </button>
              )}

              {relation === "participante" && (
                <button className="btn-leave" onClick={handleSair}>
                  Sair do Grupo
                </button>
              )}

              {relation === "criador" && (
                <div style={{ marginTop: 12 }}>
                  <span className="criador-msg">
                    Você é o criador deste grupo.
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
