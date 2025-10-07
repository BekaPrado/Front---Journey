import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

import {
  SidebarContainer,
  UserAvatar,
  Menu,
  MenuItem,
  SidebarToggle,
} from "./style.js";

import {
  FaPlus,
  FaUsers,
  FaComments,
  FaBook,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed, setCollapsed }) => {
  const navigate = useNavigate(); // hook dentro do componente

  const goToCreateGroup = () => {
    navigate("/criarGrupo");
  };

  const goToChats = () => {
    navigate("/chats"); // aqui a navegação pros chats
  };

  const goToMyGroups = () => {
    navigate("/grupo"); // opcional, substituindo o <a>
  };

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <UserAvatar>
        <img src={logo} alt="Logo" />;
      </UserAvatar>

      <Menu isCollapsed={isCollapsed}>
        <MenuItem isCollapsed={isCollapsed} onClick={goToCreateGroup}>
          <FaPlus />
          <span>Criar Grupo</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed} onClick={goToMyGroups}>
          <FaUsers />
          <span>Meus Grupos</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed} onClick>
          <FaComments />
          <span>Chats</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed}>
          <FaBook />
          <span>E-Books</span>
        </MenuItem>
      </Menu>

      <SidebarToggle
        isCollapsed={isCollapsed}
        onClick={() => setCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </SidebarToggle>
    </SidebarContainer>
  );
};

export default Sidebar;
