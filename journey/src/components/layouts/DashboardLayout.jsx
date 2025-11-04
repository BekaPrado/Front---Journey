// src/components/layouts/DashboardLayout.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import SidebarRight from "../../components/SidebarRight/SidebarRight.jsx";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "../../style/dashboard.css";

export default function DashboardLayout({
  children,
  showRight = false,
  rightContent = null, // conteúdo opcional para o painel direito
  noPadding = false,   // remove padding externo (ex.: páginas fullscreen)
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const usuarioLocal = useMemo(
    () => user ?? JSON.parse(localStorage.getItem("journey_user") || "null"),
    [user]
  );

  const goToProfile = () => navigate("/perfil");

  const userImage = usuarioLocal?.foto_perfil || null;
  const userName =
    usuarioLocal?.nome || usuarioLocal?.nome_completo || "Usuário";
  const userId = usuarioLocal?.id_usuario || usuarioLocal?.email || "";

  return (
    <div className={`homepage ${theme === "dark" ? "dark" : ""}`}>
      {/* Sidebar esquerda */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className={`dashboard-wrap ${sidebarCollapsed ? "collapsed" : ""} ${!showRight ? "no-right" : ""} ${noPadding ? "no-pad" : ""}`}>
        {/* Conteúdo principal */}
        <main className={`main-content no-extra-margin`}>
          <div className="container-home">{children}</div>
        </main>

        {/* Painel da direita */}
        {showRight && (
          <aside className="dashboard-right">
            {rightContent ? (
              // Se passar um conteúdo, exibe ele (ex: calendário funcional)
              rightContent
            ) : (
              // Caso contrário, mantém o padrão (SidebarRight original)
              <SidebarRight
                userImage={userImage}
                userName={userName}
                userId={userId}
                goToProfile={goToProfile}
              />
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
