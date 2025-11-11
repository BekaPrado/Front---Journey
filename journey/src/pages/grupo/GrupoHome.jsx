// src/pages/grupo/GrupoHome.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext";

const STORAGE_KEY = "journey_grupo_atual";

export default function GrupoHome() {
  const [grupo, setGrupo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  // layout via DashboardLayout

  const isCreator = useMemo(() => {
    if (!grupo || !user) return false;
    return (
      String(user.id_usuario) ===
      String(
        grupo?.id_criador ||
          grupo?.id_usuario_criador ||
          grupo?.criador_id ||
          ""
      )
    );
  }, [grupo, user]);

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
    <div className={`grupo-page ${theme === "dark" ? "dark" : ""}`}>
      <DashboardLayout>
        <div className="grupo-home-container">
          {/* Cabeçalho */}
          <div className="grupo-header">
            <div className="header-info">
              <h1>{grupo.nome}</h1>
            </div>
            <div className="header-buttons">
              <button
                className="btn btn-voltar"
                onClick={() => navigate("/home")}
              >
                ← Voltar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/grupo/chat")}
              >
                💬 Ir para o Chat
              </button>
              <button
                className="btn"
                onClick={() => {
                  try {
                    localStorage.setItem(
                      "group_id",
                      JSON.stringify({ id_grupo: grupo.id_grupo })
                    );
                  } catch {}
                  navigate("/calendary");
                }}
              >
                📅 Calendário do Grupo
              </button>
              <button
                className="btn"
                onClick={() => navigate("/grupo/participantes")}
              >
                👥 Participantes
              </button>
              {isCreator && (
                <button
                  className="btn"
                  onClick={() => navigate("/grupo/editar")}
                >
                  ✏️ Editar Grupo
                </button>
              )}
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="grupo-content">
            <div className="grupo-image page-card">
              <img
                src={
                  grupo.imagem ||
                  "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
                }
                alt={grupo.nome}
              />
            </div>

            <div className="grupo-info page-card">
              <h3>Sobre o grupo</h3>
              <p>{grupo.descricao || "Sem descrição."}</p>

              <div className="info-stats">
                <div>
                  <strong>Criador:</strong>{" "}
                  {grupo.usuario?.nome_completo || "Desconhecido"}
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
      </DashboardLayout>
    </div>
  );
}
