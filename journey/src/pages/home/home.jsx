import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "./home.css";
import {
  FaPlus,
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
  const [userImage, setUserImage] = useState("");

  const BASE_URL = "http://localhost:8080/v1/journey";

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Carrega os grupos
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

  // Carrega a imagem do usuário do localStorage (ou da API)
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("journey_user"));
    if (usuarioLocal?.foto_perfil) {
      setUserImage(usuarioLocal.foto_perfil);
    }
  }, []);

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
            

            <h1 className="home-title">Bem-vindo ao Journey!</h1>

            <div className="header-right">
              <button
                className="profile-avatar-circle"
                onClick={goToProfile}
                aria-label="Ir para Perfil"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Perfil"
                    className="profile-avatar-img"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </button>

              <button className="theme-btn" onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </header>

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
      </main>
    </div>
  );
}
