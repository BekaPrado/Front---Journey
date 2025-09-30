
import React from "react";
import {
  SidebarContainer,
  UserAvatar,
  Menu,
  MenuItem,
} from "./style.js"

import { FaPlus, FaUsers, FaComments, FaBook } from "react-icons/fa";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <UserAvatar>
        <img
          src="https://via.placeholder.com/80"
          alt="Avatar"
          width="80"
          height="80"
        />
      </UserAvatar>

      <Menu>
        <MenuItem>
          <FaPlus />
          Criar Grupo
        </MenuItem>
        <MenuItem>
          <FaUsers />
          Meus Grupos
        </MenuItem>
        <MenuItem>
          <FaComments />
          Chats
        </MenuItem>
        <MenuItem>
          <FaBook />
          E-Books
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;

