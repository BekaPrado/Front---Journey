// src/pages/meusGrupos/MeusGrupos.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/header/index.jsx";
import "./meusGrupos.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/v1/journey";

export default function MeusGrupos() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [gruposCriados, setGruposCriados] = useState([]);
  const [gruposParticipando, setGruposParticipando] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback robusto para extrair id do usuário (aceita vários formatos)
  function resolveUserId() {
    // 1) tenta o user do contexto
    if (user) {
      if (user.id_usuario) return user.id_usuario;
      if (user.id) return user.id;
    }

    // 2) tenta localStorage
    try {
      const raw = localStorage.getItem("journey_user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.id_usuario) return parsed.id_usuario;
      if (parsed?.id) return parsed.id;
    } catch (err) {
      console.warn("Erro ao ler journey_user do localStorage:", err);
    }
    return null;
  }

  const userId = resolveUserId();

  // função para buscar contagem de participantes (segura)
  async function fetchParticipantesCount(id_grupo) {
    try {
      const r = await fetch(`${BASE_URL}/group/${id_grupo}/participantes`);
      if (!r.ok) return 0;
      const d = await r.json();
      return d?.total ?? 0;
    } catch (err) {
      console.error("Erro fetchParticipantesCount:", err);
      return 0;
    }
  }

  const fetchData = async () => {
    setLoading(true);
    if (!userId) {
      console.warn("userId não encontrado em MeusGrupos (context/localStorage). user:", user);
      setGruposCriados([]);
      setGruposParticipando([]);
      setLoading(false);
      return;
    }

    try {
      // 1) Grupos criados
      const rCriados = await fetch(`${BASE_URL}/usuario/${userId}/grupos-criados`);
      const dCriados = await rCriados.json();
      // dCriados deve ter { grupos: [...] } conforme controller
      const created = Array.isArray(dCriados.grupos) ? dCriados.grupos : dCriados.grupos ?? [];

      // adiciona contagem de participantes em paralelo (melhora UX)
      const createdWithCounts = await Promise.all(
        created.map(async (g) => {
          const participantes = await fetchParticipantesCount(g.id_grupo);
          return { ...g, participantes };
        })
      );

      // 2) Grupos participando
      const rPart = await fetch(`${BASE_URL}/usuario/${userId}/grupos-participando`);
      const dPart = await rPart.json();
      const part = Array.isArray(dPart.grupos) ? dPart.grupos : dPart.grupos ?? [];

      const partWithCounts = await Promise.all(
        part.map(async (g) => {
          const participantes = await fetchParticipantesCount(g.id_grupo);
          return { ...g, participantes };
        })
      );

      setGruposCriados(createdWithCounts);
      setGruposParticipando(partWithCounts);

      // debug console (se quiser ver o retorno cru)
      console.debug("MeusGrupos: criados raw:", dCriados, "participando raw:", dPart);
    } catch (err) {
      console.error("Erro ao buscar MeusGrupos:", err);
      setGruposCriados([]);
      setGruposParticipando([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handler = () => fetchData();
    window.addEventListener("groupsUpdated", handler);
    return () => window.removeEventListener("groupsUpdated", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // re-fetch se o userId mudar

  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  return (
    <div className="homepage">
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <h1 className="home-title">Meus Grupos</h1>

          <section className="big-card">
            <h2>Grupos Criados</h2>

            {loading ? (
              <p className="state-msg">Carregando seus grupos criados...</p>
            ) : gruposCriados.length === 0 ? (
              <p className="state-msg">Você ainda não criou nenhum grupo.</p>
            ) : (
              <div className="groups-grid" style={{ marginTop: 12 }}>
                {gruposCriados.map((g) => (
                  <div
                    key={g.id_grupo}
                    className="group-card"
                    onClick={() => navigate("/grupo", { state: g })}
                  >
                    <div className="group-thumb">
                      <img src={g.imagem || placeholder} alt={g.nome} />
                    </div>
                    <div className="group-info">
                      <div className="group-title">{g.nome}</div>
                      <div className="group-members">
                        {g.participantes ?? g.limite_membros ?? 0} membros
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="big-card" style={{ marginTop: 28 }}>
            <h2>Grupos que Participo</h2>

            {loading ? (
              <p className="state-msg">Carregando seus grupos...</p>
            ) : gruposParticipando.length === 0 ? (
              <p className="state-msg">Você ainda não participa de nenhum grupo.</p>
            ) : (
              <div className="groups-grid" style={{ marginTop: 12 }}>
                {gruposParticipando.map((g) => (
                  <div
                    key={g.id_grupo}
                    className="group-card"
                    onClick={() => navigate("/grupo", { state: g })}
                  >
                    <div className="group-thumb">
                      <img src={g.imagem || placeholder} alt={g.nome} />
                    </div>
                    <div className="group-info">
                      <div className="group-title">{g.nome}</div>
                      <div className="group-members">
                        {g.participantes ?? g.limite_membros ?? 0} membros
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
