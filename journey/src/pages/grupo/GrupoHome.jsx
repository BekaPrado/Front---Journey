// src/pages/grupo/GrupoHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./grupoBase.css";
import "./grupoHome.css";

const STORAGE_KEY = "journey_grupo_atual";

export default function GrupoHome() {
  const [grupo, setGrupo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const grupoSalvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!grupoSalvo) {
      navigate("/home", { replace: true });
      return;
    }
    setGrupo(grupoSalvo);
    setCarregando(false);
  }, [navigate]);

  if (carregando) return <p>Carregando...</p>;
  if (!grupo) return null;

  return (
    <div className={`grupo-page ${darkMode ? "dark" : ""}`}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-area ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="grupo-home-container">
          {/* Cabeçalho */}
          <div className="grupo-header">
            <div className="header-info">
              <h1>{grupo.nome}</h1>
              <p className="descricao">{grupo.descricao}</p>
            </div>
            <div className="header-buttons">
              <button className="btn-voltar" onClick={() => navigate("/home")}>
                ← Voltar
              </button>
              <button className="btn btn-primary" onClick={() => navigate("/grupo/chat")}>
                💬 Ir para o Chat
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="grupo-content">
            <div className="grupo-image">
              <img
                src={grupo.imagem || "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"}
                alt={grupo.nome}
              />
            </div>

            <div className="grupo-info">
              <h3>Sobre o grupo</h3>
              <p>
                Este grupo foi criado para promover o aprendizado colaborativo entre os membros.
                Aqui você pode participar de conversas, trocar materiais e acompanhar eventos.
              </p>

              <div className="info-stats">
                <div>
                  <strong>Criador:</strong> {user?.nome_completo || "Admin"}
                </div>
                <div>
                  <strong>ID do Grupo:</strong> {grupo.id_grupo}
                </div>
              </div>

              <div className="action-area">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/grupo/chat")}
                >
                  Entrar no Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
