// components/header/index.jsx

import React from "react";
import {
  SidebarContainer,
  UserAvatar,
  Menu,
  MenuItem,
  SidebarToggle, // Adicionado
} from "./style.js"

// Ícones de menu e toggle (setas)
import { FaPlus, FaUsers, FaComments, FaBook, FaAngleLeft, FaAngleRight } from "react-icons/fa";

// O Sidebar agora recebe as props de colapso
const Sidebar = ({ isCollapsed, setCollapsed }) => { 
  return (
    // Usa isCollapsed para definir a largura (via style.js)
    <SidebarContainer isCollapsed={isCollapsed}> 
      <UserAvatar>
        <img
          src="https://via.placeholder.com/80"
          alt="Avatar"
          width="80"
          height="80"
        />
      </UserAvatar>

      <Menu isCollapsed={isCollapsed}>
        <MenuItem isCollapsed={isCollapsed}> 
          <FaPlus />
          <span>Criar Grupo</span> 
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed}>
          <FaUsers />
          <p> <a href="/calendary">Meus Grupos</a></p>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed}>
          <FaComments />
          <span>Chats</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed}>
          <FaBook />
          <span>E-Books</span>
        </MenuItem>
      </Menu>

      {/* Botão de Toggle da Sidebar (seta) - Posicionado no fundo */}
      <SidebarToggle 
        isCollapsed={isCollapsed} 
        onClick={() => setCollapsed(!isCollapsed)}
      >
        {/* Alterna entre as setas com base no estado de colapso */}
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </SidebarToggle>
    </SidebarContainer>
  );
};

export default Sidebar;