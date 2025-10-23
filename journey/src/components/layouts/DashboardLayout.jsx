// src/components/layouts/DashboardLayout.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import SidebarRight from "../../components/SidebarRight/SidebarRight.jsx";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "../../style/dashboard.css";

export default function DashboardLayout({ children, showRight = false }) {
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
  const userName = usuarioLocal?.nome || usuarioLocal?.nome_completo || "Usuário";
  const userId = usuarioLocal?.id_usuario || usuarioLocal?.email || "";

  return (
    <div className={`homepage ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className={`dashboard-wrap ${sidebarCollapsed ? "collapsed" : ""}`}>
        <main className={`main-content no-extra-margin`}>
          <div className="container-home">{children}</div>
        </main>

        {showRight && (
          <aside className="dashboard-right">
            <SidebarRight
              userImage={userImage}
              userName={userName}
              userId={userId}
              goToProfile={goToProfile}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
