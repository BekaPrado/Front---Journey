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
  FaHome,
  FaCalendar,
  FaCar,
  FaCarBattery,
  FaCarAlt,
  FaCartPlus,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <UserAvatar>
        <img src={logo} alt="Logo" />
      </UserAvatar>

      <Menu isCollapsed={isCollapsed}>
        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/home")}>
          <FaHome />
          <span>Home</span>
        </MenuItem>

        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/meus-grupos")}>
          <FaUsers />
          <span>Meus Grupos</span>
        </MenuItem>

        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/calendary")}>
          <FaCalendar />
          <span>Calendario</span>
        </MenuItem>

        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/criarGrupo")}>
          <FaPlus />
          <span>Criar Grupo</span>
        </MenuItem>

        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/chat")}>
          <FaComments />
          <span>Chats</span>
        </MenuItem>

        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/home")}>
          <FaBook />
          <span>E-Books</span>
        </MenuItem>
        <MenuItem isCollapsed={isCollapsed} onClick={() => navigate("/home")}>
          <FaCartPlus />
          <span>Seu Carrinho</span>
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
