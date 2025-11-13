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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Fecha o menu ao redimensionar para desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    
    // Verifica o tamanho da tela ao carregar
    handleResize();
    
    // Adiciona o listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Função para alternar o menu móvel
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Fecha o menu ao clicar em um item
  const handleMenuItemClick = () => {
    if (window.innerWidth <= 768) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`homepage ${theme === "dark" ? "dark" : ""}`}>
      {/* Overlay para fechar o menu ao clicar fora */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Sidebar esquerda */}
      <div className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onItemClick={handleMenuItemClick}
        />
      </div>

      <div 
        className={`dashboard-wrap ${sidebarCollapsed ? "collapsed" : ""} ${!showRight ? "no-right" : ""} ${noPadding ? "no-pad" : ""}`}
        onClick={() => {
          // Fecha o menu lateral quando clicar no conteúdo principal em telas pequenas
          if (window.innerWidth <= 768 && !sidebarCollapsed) {
            setSidebarCollapsed(true);
          }
        }}
      >
        {/* Conteúdo principal */}
        <main className={`main-content no-extra-margin`}>
          <div className="container-home">
            {/* Botão de toggle para mobile */}
            <button 
              className="mobile-menu-toggle"
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileMenu();
              }}
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            {children}
          </div>
        </main>

        {/* Painel da direita */}
        {showRight && (
          <aside className="dashboard-right">
            {rightContent ? (
              rightContent
            ) : (
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
