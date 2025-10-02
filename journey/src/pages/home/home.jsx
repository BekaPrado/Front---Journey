// home.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx"; 
import "./home.css";
// Adicionado FaUserCircle para o avatar
import { FaPlus, FaFilter, FaMoon, FaSun, FaBars, FaUserCircle } from 'react-icons/fa'; 

export default function Home() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ESTADOS DE FUNCIONALIDADE
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // LEITURA E SALVAMENTO DO DARK MODE NO localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  }); 

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
  
  // NOVA FUNÇÃO: Navega para a página de perfil
  const goToProfile = () => {
    navigate('/perfil');
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  function handleCreateGroup() {
    navigate("/criarGrupo");
  }

  const placeholder =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='%235c46b5'/></svg>";

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
                
                {/* NOVO ELEMENTO: Avatar de Perfil Clicável */}
                <div 
                    className="profile-avatar-circle" 
                    onClick={goToProfile}
                    aria-label="Ir para Perfil"
                >
                    {/* Pode ser substituído por <img src={user.foto} /> */}
                    <FaUserCircle size={22} /> 
                </div>

                <button 
                    className="theme-btn" 
                    onClick={toggleDarkMode}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
          </header>

          <div className="content-area">
            <section className="big-card">
              <div className="big-card-top">
                <h2>Grupos em Destaque</h2>
                <div className="big-card-actions">
                  <button className="btn btn-primary" onClick={handleCreateGroup}>
                    <FaPlus /> Criar Grupo
                  </button>
                  <button className="btn btn-ghost">
                    <FaFilter /> Filtros
                  </button>
                </div>
              </div>

              <div className="big-card-body">
                {!loading && !error && grupos.length > 0 && (
                  <div className="groups-grid">
                    {grupos.map((g) => (
                      <div key={g.id_grupo} className="group-card">
                        <div className="group-thumb">
                           <img src={placeholder} alt={g.nome} />
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
                {loading && <div className="state-msg">Carregando grupos...</div>}
                {error && (<div className="state-msg error">Erro: {error}</div>)}
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