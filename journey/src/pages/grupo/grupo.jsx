// grupoDetalhes.jsx
import React, { useState } from "react";
import Sidebar from "../../components/header/index.jsx";
import {
  Container,
  Header,
  Title,
  CardWrapper,
  Card,
  TopSection,
  GroupInfo,
  Creator,
  Description,
  Button,
} from "./grupo.js";

const GrupoDetalhes = () => {
  const [darkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const grupo = {
    nome: "Direito",
    membros: 12,
    descricao: `Grupo de Direito — um espaço criado para mentes que gostam de destrinchar leis, debater justiça e entender o impacto real das decisões jurídicas no dia a dia. Aqui, teoria e prática se encontram: discutimos casos atuais, compartilhamos experiências de estágio, trocamos materiais e exploramos as mudanças no cenário jurídico com olhar crítico. É o ponto de encontro perfeito para quem acredita que o Direito vai muito além dos códigos — é uma ferramenta de transformação social.`,
    criador: "@username",
    imagem: "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
  };

  return (
    <div
      className={`homepage ${darkMode ? "dark" : ""}`}
      style={{ display: "flex" }}
    >
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <Container isCollapsed={sidebarCollapsed}>
        <Header>
          <Title>Detalhes do Grupo</Title>
        </Header>

        <CardWrapper>
          <Card>
            <TopSection>
              <GroupInfo>
                <img src={grupo.imagem} alt="ícone do grupo" />
                <div>
                  <h2>{grupo.nome}</h2>
                  <span>{grupo.membros} membros</span>
                </div>
              </GroupInfo>

              <Creator>
                <div className="avatar" />
                <span>criador: {grupo.criador}</span>
              </Creator>
            </TopSection>

            <Description>
              <strong>Descrição:</strong>
              {grupo.descricao}
            </Description>

            <Button>Entrar</Button>
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default GrupoDetalhes;
