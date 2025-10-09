// grupo.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const Grupo = () => {
  const { state: grupo } = useLocation();
  const navigate = useNavigate();
  const [darkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");

  const BASE_URL = "http://localhost:8080/v1/journey/group";

  if (!grupo) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Nenhum grupo selecionado.</h2>
        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "#5c46b5",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  async function handleJoinGroup() {
    setIsJoining(true);
    setJoinMessage("");

    try {
      const response = await fetch(`${BASE_URL}/${grupo.id_grupo}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Se precisar enviar o ID do usuário:
        // body: JSON.stringify({ user_id: usuario.id }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao entrar no grupo (HTTP ${response.status})`);
      }

      const result = await response.json();
      setJoinMessage("✅ Você entrou no grupo com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      setJoinMessage("❌ Não foi possível entrar no grupo.");
    } finally {
      setIsJoining(false);
    }
  }

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
          <Title>{grupo.nome}</Title>
          <button
            onClick={() => navigate("/home")}
            style={{
              background: "transparent",
              border: "none",
              color: "#5c46b5",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ← Voltar
          </button>
        </Header>

        <CardWrapper>
          <Card>
            <TopSection>
              <GroupInfo>
                <img
                  src={
                    grupo.imagem ||
                    "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
                  }
                  alt="ícone do grupo"
                />
                <div>
                  <h2>{grupo.nome}</h2>
                  <span>{grupo.limite_membros || 0} membros</span>
                </div>
              </GroupInfo>

              <Creator>
                <div className="avatar" />
                <span>criador: {grupo.criador || "@desconhecido"}</span>
              </Creator>
            </TopSection>

            <Description>
              <strong>Descrição:</strong>{" "}
              {grupo.descricao || "Nenhuma descrição disponível."}
            </Description>

            <Button onClick={handleJoinGroup} disabled={isJoining}>
              {isJoining ? "Entrando..." : "Entrar"}
            </Button>

            {joinMessage && (
              <p
                style={{
                  marginTop: "15px",
                  color: joinMessage.startsWith("✅") ? "green" : "red",
                }}
              >
                {joinMessage}
              </p>
            )}
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default Grupo;