import React from "react";
import { useNavigate } from "react-router-dom";
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

  const goToGroup = () => {
    navigate("/grupo");
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
        <img
          src="https://via.placeholder.com/80"
          alt="Avatar"
          width="80"
          height="80"
        />
      </UserAvatar>

      <Menu isCollapsed={isCollapsed}>
        <MenuItem isCollapsed={isCollapsed} onClick={goToGroup}>
          <FaPlus />
          <span>Criar Grupo</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed} onClick={goToMyGroups}>
          <FaUsers />
          <span>Meus Grupos</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed} onClick={goToGroup}>
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
