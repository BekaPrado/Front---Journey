// src/context/SidebarContext.jsx (NOVO ARQUIVO)
import React, { createContext, useState, useEffect, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // Estado inicial que define se a sidebar está colapsada (true) ou aberta (false).
  // Começa FECHADA (true) se for mobile.
  const [isCollapsed, setIsCollapsed] = useState(
      window.innerWidth <= 768
  );

  // EFEITO: Lógica de Responsividade Centralizada
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Se for mobile, a sidebar deve SEMPRE iniciar FECHADA (true) 
        // e só abrir com o clique do hambúrguer.
        setIsCollapsed(true); 
      } else {
        // Se for desktop, o padrão é ABERTO (false).
        setIsCollapsed(false); 
      }
    };

    // Adiciona o listener e o executa na montagem
    window.addEventListener('resize', handleResize);
    handleResize(); 

    // Função de limpeza
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  // Função que o botão Hambúrguer/Toggle usará
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };
  
  // Você pode adicionar uma função closeSidebar() aqui, mas o toggle já resolve no mobile.

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook Customizado para facilitar o uso
export const useSidebar = () => {
  return useContext(SidebarContext);
};