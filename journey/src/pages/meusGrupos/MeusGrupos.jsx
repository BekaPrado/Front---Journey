// src/pages/meusGrupos/MeusGrupos.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import "./meusGrupos.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3030/v1/journey";
const STORAGE_KEY = "journey_grupo_atual";

export default function MeusGrupos() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [gruposCriados, setGruposCriados] = useState([]);
  const [gruposParticipando, setGruposParticipando] = useState([]);
  const [loading, setLoading] = useState(true);

  function resolveUserId() {
    if (user?.id_usuario) return user.id_usuario;
    
    try {
      const raw = JSON.parse(localStorage.getItem("journey_user"));
      return raw?.id_usuario ?? raw?.id ?? null;
    } catch {
      return null;
    }
  }

  const userId = resolveUserId();
  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  const fetchParticipantesCount = async (id_grupo) => {
    try {
      const res = await fetch(`${BASE_URL}/group/${id_grupo}/participantes`);
      const data = await res.json();
      return data?.total ?? 0;
    } catch {
      return 0;
    }
  };

  const normalizeGroup = (g) => ({
    ...g,
    id_grupo: g.id_grupo ?? g.id,
  });

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      // grupos criados
      const rCriados = await fetch(`${BASE_URL}/usuario/${userId}/grupos-criados`);
      const dCriados = await rCriados.json();
      let created = Array.isArray(dCriados.grupos) ? dCriados.grupos.map(normalizeGroup) : [];

      created = await Promise.all(
        created.map(async (g) => ({
          ...g,
          participantes: await fetchParticipantesCount(g.id_grupo),
        }))
      );

      // grupos participando
      const rPart = await fetch(`${BASE_URL}/usuario/${userId}/grupos-participando`);
      const dPart = await rPart.json();
      let part = Array.isArray(dPart.grupos) ? dPart.grupos.map(normalizeGroup) : [];

      part = part.filter((g) => !created.some((c) => c.id_grupo === g.id_grupo)); // remove duplicado

      part = await Promise.all(
        part.map(async (g) => ({
          ...g,
          participantes: await fetchParticipantesCount(g.id_grupo),
        }))
      );

      setGruposCriados(created);
      setGruposParticipando(part);
    } catch {
      setGruposCriados([]);
      setGruposParticipando([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const handler = () => fetchData();
    window.addEventListener("groupsUpdated", handler);
    return () => window.removeEventListener("groupsUpdated", handler);
  }, [userId]);

  const openGroup = (g) => {
    const normalized = normalizeGroup(g);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    navigate("/grupo", { state: normalized });
  };

  return (
    <DashboardLayout>
      <div className="container-home">
        <header className="page-header">
          <h1 className="home-title">Meus Grupos</h1>
          <div className="header-right">
            <button className="btn btn-primary" onClick={() => navigate('/criarGrupo')}>+ Criar Grupo</button>
          </div>
        </header>

        {/* GRUPOS CRIADOS */}
        <section className="big-card">
          <div className="big-card-top">
            <h2>Grupos Criados</h2>
          </div>

          {loading ? <div className="state-msg">Carregando...</div> : gruposCriados.length === 0 ? (
            <div className="state-msg">Você não criou grupos.</div>
          ) : (
            <div className="groups-grid">
              {gruposCriados.map((g) => (
                <div key={g.id_grupo} className="group-card" onClick={() => openGroup(g)}>
                  <div className="group-thumb">
                    <img src={g.imagem || placeholder} alt={g.nome} />
                  </div>
                  <div className="group-info">
                    <div className="group-title">{g.nome}</div>
                    <div className="group-members">{g.participantes} membros</div>
                    <small>👑 Criador: {g.nome_criador}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* GRUPOS QUE PARTICIPO */}
        <section className="big-card" style={{ marginTop: 20 }}>
          <div className="big-card-top">
            <h2>Grupos que Participo</h2>
          </div>

          {loading ? <div className="state-msg">Carregando...</div> : gruposParticipando.length === 0 ? (
            <div className="state-msg">Você ainda não participa de grupos.</div>
          ) : (
            <div className="groups-grid">
              {gruposParticipando.map((g) => (
                <div key={g.id_grupo} className="group-card" onClick={() => openGroup(g)}>
                  <div className="group-thumb">
                    <img src={g.imagem || placeholder} alt={g.nome} />
                  </div>
                  <div className="group-info">
                    <div className="group-title">{g.nome}</div>
                    <div className="group-members">{g.participantes} membros</div>
                    <small>👤 Criador: {g.nome_criador}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
