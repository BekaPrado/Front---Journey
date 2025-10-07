import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "./home.css";
import {
  FaPlus,
  FaFilter,
  FaMoon,
  FaSun,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const BASE_URL = "http://localhost:8080/v1/journey";

  useEffect(() => {
    fetchGrupos();
  }, []);

  async function fetchGrupos() {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${BASE_URL}/group`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setGrupos(data.grupos || []);
    } catch (err) {
      console.error("Erro ao buscar grupos:", err);
      setError(err.message || "Erro desconhecido");
      setGrupos([]);
    } finally {
      setLoading(false);
    }
  }

  const goToProfile = () => navigate("/perfil");
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const handleCreateGroup = () => navigate("/criarGrupo");

  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <header className="page-header">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <FaBars />
            </button>
            <h1>Bem-vindo ao Journey!</h1>

            <div className="header-right">
              <div
                className="profile-avatar-circle"
                onClick={goToProfile}
                aria-label="Ir para Perfil"
              >
                <FaUserCircle size={22} />
              </div>

              <button className="theme-btn" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </header>

          <div className="content-area">
            <section className="big-card">
              <div className="big-card-top">
                <h2>Grupos em Destaque</h2>
                <div className="big-card-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleCreateGroup}
                  >
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
                        style={{ cursor: "pointer" }}
                      >
                        <div className="group-thumb">
                          <img src={g.imagem || placeholder} alt={g.nome} />
                        </div>
                        <div className="group-info">
                          <div className="group-title">{g.nome}</div>
                          <div className="group-members">
                            {g.limite_membros || 0} membros
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="state-msg">Carregando grupos...</div>
                )}
                {error && <div className="state-msg error">Erro: {error}</div>}
                {!loading && !error && grupos.length === 0 && (
                  <div className="state-msg">Nenhum grupo encontrado.</div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
