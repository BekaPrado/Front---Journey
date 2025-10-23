// src/pages/home/home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "./home.css";
import { FaPlus, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // usa o contexto (se estiver populado)
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const BASE_URL = "http://localhost:3030/v1/journey";
  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  // Pegamos o usuário também do localStorage (fallback quando o context não estiver pronto)
  const usuarioLocal =
    user ?? JSON.parse(localStorage.getItem("journey_user") || "null");

  // persistência do tema já é feita no ThemeProvider

  const fetchGrupos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${BASE_URL}/group`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const lista = data.grupos || [];

      // busca participantes para cada grupo (paralelo)
      const withParticipants = await Promise.all(
        lista.map(async (g) => {
          try {
            const r = await fetch(
              `${BASE_URL}/group/${g.id_grupo}/participantes`
            );
            if (!r.ok) return { ...g, participantes: 0 };
            const d = await r.json();
            return { ...g, participantes: d.total ?? 0 };
          } catch {
            return { ...g, participantes: 0 };
          }
        })
      );

      setGrupos(withParticipants);
    } catch (err) {
      console.error("Erro ao buscar grupos:", err);
      setError(err.message || "Erro desconhecido");
      setGrupos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrupos();
  }, [fetchGrupos]);

  // Recarrega quando houver alteração (join/leave)
  useEffect(() => {
    const handler = () => fetchGrupos();
    window.addEventListener("groupsUpdated", handler);
    return () => window.removeEventListener("groupsUpdated", handler);
  }, [fetchGrupos]);

  // navegação
  const handleCreateGroup = () => navigate("/criarGrupo");
  const goToProfile = () => navigate("/perfil");
  const toggleDarkMode = () => toggleTheme();

  // pega a imagem do usuário (fallback da sessão)
  const userImage = usuarioLocal?.foto_perfil || null;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const daysGrid = Array.from({ length: startWeekDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <div className={`homepage ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <header className="page-header">
            <h1 className="home-title">Meus Grupos</h1>

            <div className="header-right">
              <button
                className="profile-avatar-circle"
                onClick={goToProfile}
                title="Ir para perfil"
                aria-label="Ir para perfil"
                style={{ width: 52, height: 52 }}
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Perfil"
                    className="profile-avatar-img"
                  />
                ) : (
                  <FaUserCircle size={26} />
                )}
              </button>

              <button
                className="theme-btn"
                onClick={toggleDarkMode}
                aria-label="Alternar tema"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </header>

          <div className="content-two-col">
            <section className="left-col">
              <div className="filters-bar">
                <div className="filter-chip">Área ▾</div>
              </div>

              <section className="big-card">
                <div className="big-card-top">
                  <h2>Explorar Grupos</h2>
                  <div className="big-card-actions">
                    <button className="btn btn-primary" onClick={handleCreateGroup}>
                      <FaPlus /> Criar Grupo
                    </button>
                  </div>
                </div>

                <div className="big-card-body">
                  {!loading && !error && grupos.length > 0 && (
                    <div className="groups-grid modern">
                      {grupos.map((g, idx) => (
                        <div
                          key={g.id_grupo}
                          className={`group-card modern variant-${(idx % 3) + 1}`}
                          onClick={() => navigate("/grupo", { state: g })}
                        >
                          <div className="illustration">
                            <div className="bubble" />
                            <img src={g.imagem || placeholder} alt={g.nome} />
                          </div>
                          <div className="group-info">
                            <div className="group-title">{g.nome}</div>
                            <div className="group-desc">{g.descricao || "Explore conteúdo, eventos e conversas deste grupo."}</div>
                            <div className="group-meta">Criado por <span>{g.criador || g.nome_criador || "Administrador"}</span></div>
                          </div>
                          <button className="group-card-cta" aria-label="Abrir grupo" onClick={(e)=>{e.stopPropagation();navigate('/grupo',{state:g});}}>→</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {loading && <div className="state-msg">Carregando grupos...</div>}
                  {error && <div className="state-msg error">Erro: {error}</div>}
                  {!loading && !error && grupos.length === 0 && (
                    <div className="state-msg">Nenhum grupo encontrado.</div>
                  )}
                </div>
              </section>
            </section>

            <aside className="right-col">
              <div className="panel calendar">
                <div className="panel-header">
                  <span>{monthNames[month]} {year}</span>
                  <div className="navs">
                    <span>‹</span>
                    <span>›</span>
                  </div>
                </div>
                <div className="calendar-grid">
                  {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d) => (
                    <div key={d} className="calendar-weekday">{d}</div>
                  ))}
                  {daysGrid.map((d, i) => {
                    const isToday = d === now.getDate();
                    return (
                      <div key={i} className={`calendar-day ${isToday ? "today" : ""}`}>
                        {d || ""}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="panel online">
                <div className="panel-header">
                  <span>Online agora</span>
                  <a className="seeall">Ver todos</a>
                </div>
                <div className="online-list">
                  {(grupos.slice(0,4)).map((g) => (
                    <div key={g.id_grupo} className="online-item">
                      <div className="avatar">
                        <img src={g.imagem || placeholder} alt={g.nome} />
                      </div>
                      <div className="meta">
                        <div className="name">{g.nome}</div>
                        <div className="sub">{g.participantes ?? 0} membros</div>
                      </div>
                      <div className="status" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
