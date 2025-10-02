// components/header/style.js

import styled from "styled-components";

// 1. SidebarToggle (Posicionado no fundo e com largura ajustada)
export const SidebarToggle = styled.button`
  position: absolute;
  bottom: 25px; 
  left: 50%;
  transform: translateX(-50%);

  background: #5c46b5; 
  color: white;
  border: none;
  border-radius: 8px; 
  width: 50px; 
  height: 30px; 
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.2s ease, width 0.3s ease;
  font-size: 16px;
  z-index: 1001;

  .homepage.dark & {
    background: #5c46b5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  }
`;

// 2. SidebarContainer (Fixo)
export const SidebarContainer = styled.aside`
  width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '220px')};
  background-color: #2c1e92;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 15px;
  height: 100vh;
  position: fixed; /* CRUCIAL: Fixa a sidebar */
  top: 0; 
  left: 0;
  box-sizing: border-box;
  flex-shrink: 0; 
  transition: width 0.3s ease; 
  z-index: 1000; 

  .homepage.dark & {
    background-color: #1a0f5a; 
  }

  /* Garante que o avatar desapareça suavemente quando colapsado */
  ${({ isCollapsed }) => isCollapsed && `
      ${UserAvatar} {
          opacity: 0;
          transition: opacity 0.3s ease;
          margin-bottom: 0px;
      }
  `}
`;

export const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 2px solid rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// 3. Menu (Com flex-grow para empurrar o toggle)
export const Menu = styled.div`
  background: linear-gradient(180deg, #3b2cb0 0%, #2c1e92 100%);
  width: 100%;
  border-radius: 12px;
  padding: 14px;
  flex-grow: 1; /* Ocupa o espaço restante */
  margin-bottom: auto; /* Garante que o espaço seja ocupado até o topo do toggle */

  .homepage.dark & {
     background: #2a2040;
  }

  ${({ isCollapsed }) => isCollapsed && `
    padding: 10px 0;
  `}
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'flex-start')};
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Esconde o texto quando colapsado */
  p, a, span {
    display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};
    opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
    transition: opacity 0.3s ease;
  }

  svg {
      font-size: 20px;
  }
`;