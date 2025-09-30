// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/header/index.jsx";
import styled, { ThemeProvider } from "styled-components";
import { FaPlus, FaFilter, FaUsers } from "react-icons/fa";
import api from "../services/api"; // 👈 importando o axios configurado

// ==================== Tema claro/escuro ====================
const lightTheme = {
  background: "#f3f4f6",
  text: "#1e1e2f",
  cardBg: "#4b39b8",
  wrapperBg: "#3b2da0",
};

const darkTheme = {
  background: "#1e1e2f",
  text: "#f3f4f6",
  cardBg: "#2a2361",
  wrapperBg: "#19103d",
};

// ==================== styled-components ====================
const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
  color: ${(props) => props.theme.text};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const GroupsWrapper = styled.div`
  background: ${(props) => props.theme.wrapperBg};
  border-radius: 12px;
  padding: 20px;
  color: white;
  position: relative;
`;

const GroupsTitle = styled.h2`
  margin-bottom: 16px;
`;

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 50px;
`;

const GroupCard = styled.div`
  background: ${(props) => props.theme.cardBg};
  border-radius: 10px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GroupIcon = styled.div`
  font-size: 24px;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupName = styled.span`
  font-weight: bold;
`;

const GroupMembers = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #fff;
  color: #3b2da0;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #e6e6ff;
  }
`;

// ==================== componente ====================
export default function Home() {
  const [groups, setGroups] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await api.get("/group"); // 👈 usa baseURL do api.js
        console.log("RESPOSTA GRUPOS:", res.data);

        if (res.data && res.data.dados) {
          setGroups(res.data.dados);
        } else {
          setGroups([]);
        }
      } catch (err) {
        console.error("Erro ao buscar grupos:", err);
      }
    }
    fetchGroups();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <Container>
          <Header>
            <Title>Bem-vindo ao Journey!</Title>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "🌙 Escuro" : "☀️ Claro"}
            </button>
          </Header>

          <GroupsWrapper>
            <GroupsTitle>Grupos</GroupsTitle>

            {/* Actions no canto direito */}
            <Actions>
              <ActionButton>
                <FaPlus /> Criar Grupo
              </ActionButton>
              <ActionButton>
                <FaFilter /> Filtros
              </ActionButton>
            </Actions>

            <GroupGrid>
              {groups.length > 0 ? (
                groups.map((grupo) => (
                  <GroupCard key={grupo.id_grupo}>
                    <GroupIcon>
                      <FaUsers />
                    </GroupIcon>
                    <GroupInfo>
                      <GroupName>{grupo.nome}</GroupName>
                      <GroupMembers>
                        {grupo.limite_membros
                          ? `${grupo.limite_membros} membros (limite)`
                          : "Sem limite definido"}
                      </GroupMembers>
                    </GroupInfo>
                  </GroupCard>
                ))
              ) : (
                <p>Nenhum grupo encontrado.</p>
              )}
            </GroupGrid>
          </GroupsWrapper>
        </Container>
      </div>
    </ThemeProvider>
  );
}
