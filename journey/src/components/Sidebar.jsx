import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUsers, FaCalendarAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const { logout, user } = useAuth();

  // Atualiza o estado de mobile quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fecha o menu quando a rota muda (apenas em mobile)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  // Itens do menu
  const menuItems = [
    { to: "/home", icon: <FaHome />, label: "Início" },
    { to: "/grupos", icon: <FaUsers />, label: "Meus Grupos" },
    { to: "/eventos", icon: <FaCalendarAlt />, label: "Eventos" },
    { to: "/perfil", icon: <FaUser />, label: "Meu Perfil" },
    { to: "/configuracoes", icon: <FaCog />, label: "Configurações" },
  ];

  // Se for mobile e o menu estiver fechado, mostra apenas o botão do menu
  if (isMobile && !isOpen) {
    return (
      <button 
        className="mobile-menu-button" 
        onClick={toggleSidebar}
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>
    );
  }

  return (
    <>
      {/* Overlay para fechar o menu ao clicar fora (apenas mobile) */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          {isMobile && (
            <button 
              className="close-sidebar" 
              onClick={toggleSidebar}
              aria-label="Fechar menu"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        <div className="user-info">
          <div className="user-avatar">
            {user?.foto_perfil ? (
              <img src={user.foto_perfil} alt={user.nome_completo} />
            ) : (
              <div className="avatar-placeholder">
                {user?.nome_completo?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div className="user-details">
            <h3>{user?.nome_completo || 'Usuário'}</h3>
            <span className="user-email">{user?.email || ''}</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={location.pathname === item.to ? 'active' : ''}>
                <Link to={item.to}>
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
