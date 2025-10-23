// src/pages/grupo/grupo.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./grupoBase.css";
import "./grupoHome.css";

const API_URL = "http://localhost:3030/v1/journey";
const STORAGE_KEY = "journey_grupo_atual";

export default function Grupo() {
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [grupo, setGrupo] = useState(state || null);
  const [relation, setRelation] = useState("carregando");

  const placeholder = "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

  useEffect(() => {
    async function loadStatus() {
      if (!grupo?.id_grupo) return;
      try {
        const resp = await fetch(`${API_URL}/group/${grupo.id_grupo}/status?userId=${user?.id_usuario}`);
        const data = await resp.json();
        const relationType = data.relation || "nenhum";
        setRelation(relationType);

        if (relationType === "participante" || relationType === "criador") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(grupo));
          navigate("/grupo-home", { replace: true });
        }
      } catch {
        setRelation("nenhum");
      }
    }
    loadStatus();
  }, [grupo, user, navigate]);

  if (!grupo)
    return (
      <div className="grupo-page">
        <Sidebar />
        <main className="main-area">
          <div className="page-card">
            <p>Grupo não encontrado.</p>
            <button className="btn btn-primary" onClick={() => navigate("/home")}>
              Voltar
            </button>
          </div>
        </main>
      </div>
    );

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
            </div>
          </div>

          {/* Corpo da página */}
          <div className="grupo-content">
            <div className="grupo-image">
              <img
                src={grupo.imagem || placeholder}
                alt={grupo.nome}
              />
            </div>

            <div className="grupo-info">
              <h3>Sobre o grupo</h3>
              <p>
                Este é um espaço criado para colaboração e aprendizado em grupo. 
                Aqui você pode trocar conhecimentos, participar de discussões e compartilhar materiais.
              </p>

              <div className="info-stats">
                <div>
                  <strong>Criador:</strong> {user?.nome_completo || "Administrador"}
                </div>
                <div>
                  <strong>ID do Grupo:</strong> {grupo.id_grupo}
                </div>
              </div>

              <div className="action-area">
                {relation === "nenhum" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.setItem(STORAGE_KEY, JSON.stringify(grupo));
                      navigate("/grupo-home");
                    }}
                  >
                    Participar do Grupo
                  </button>
                )}

                {relation === "participante" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/grupo-home")}
                  >
                    Entrar no Grupo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
