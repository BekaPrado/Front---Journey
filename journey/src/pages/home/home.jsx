// src/pages/home/home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "./home.css";
import { FaPlus, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // usa o contexto (se estiver populado)
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const BASE_URL = "http://localhost:8080/v1/journey";
  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  // Pegamos o usuário também do localStorage (fallback quando o context não estiver pronto)
  const usuarioLocal = user ?? JSON.parse(localStorage.getItem("journey_user") || "null");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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
            const r = await fetch(`${BASE_URL}/group/${g.id_grupo}/participantes`);
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
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
  };

  // pega a imagem do usuário (fallback da sessão)
  const userImage = usuarioLocal?.foto_perfil || null;

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <header className="page-header">
            <h1 className="home-title">Bem-vindo(a) de Volta!</h1>

            <div className="header-right">
              <button
                className="profile-avatar-circle"
                onClick={goToProfile}
                title="Ir para perfil"
                aria-label="Ir para perfil"
                style={{ width: 52, height: 52 }}
              >
                {userImage ? (
                  <img src={userImage} alt="Perfil" className="profile-avatar-img" />
                ) : (
                  <FaUserCircle size={26} />
                )}
              </button>

              <button className="theme-btn" onClick={toggleDarkMode} aria-label="Alternar tema">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </header>

          <section className="big-card">
            <div className="big-card-top">
              <h2>Grupos em Destaque</h2>
              <div className="big-card-actions">
                <button className="btn btn-primary" onClick={handleCreateGroup}>
                  <FaPlus /> Criar Grupo
                </button>
              </div>
            </div>

            <div className="big-card-body">
              {!loading && !error && grupos.length > 0 && (
                <div className="groups-grid">
                  {grupos.map((g) => (
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
                        <div className="group-members">{g.participantes ?? 0} membros</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && <div className="state-msg">Carregando grupos...</div>}
              {error && <div className="state-msg error">Erro: {error}</div>}
              {!loading && !error && grupos.length === 0 && <div className="state-msg">Nenhum grupo encontrado.</div>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
