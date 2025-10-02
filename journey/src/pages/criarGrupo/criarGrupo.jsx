// criarGrupo.jsx

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/header/index.jsx";
import {
  Container,
  CardWrapper,
  Card,
  BackButton,
  Label,
  Input,
  Textarea,
  FileInput,
  CreateButton,
  Header,
  Title,
  Select 
} from "./criarGrupo.js";

const BASE_URL = "http://localhost:8080/v1/journey";

const CriarGrupo = () => {
  const [nome, setNome] = useState("");
  const [limite_membros, setLimiteMembros] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id_usuario] = useState(1);
  const [id_area, setIdArea] = useState("");
  const [areas, setAreas] = useState([]);
  
  // Dark Mode
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  // NOVO: Consumo da API para o campo 'Área'
  useEffect(() => {
    fetchAreas();
  }, []);
  
  const fetchAreas = async () => {
      try {
          const res = await fetch(`${BASE_URL}/area`); 
          
          if (!res.ok) {
              console.error(`Erro HTTP: ${res.status}`);
              throw new Error(`Erro ao buscar áreas: status ${res.status}`);
          }
          
          const data = await res.json();
          
          // CRUCIAL: Mapeia a lista que está na chave "Area" do seu retorno
          const areasArray = Array.isArray(data.Area) ? data.Area : []; 
          
          const formattedAreas = areasArray.map(a => ({
              // CRUCIAL: Mapeia para os nomes de coluna corretos (id_area e area)
              id: a.id_area, 
              nome: a.area  
          }));
          
          setAreas(formattedAreas);
          
      } catch (err) {
          console.error("Erro ao buscar áreas:", err);
          // Adiciona uma opção de erro no select para visualização
          setAreas([{ id: -1, nome: `[ERRO] ${err.message || "Não foi possível carregar as áreas"}` }]);
      }
  };
  
  // Função handleSubmit (mantida)
  const handleSubmit = async () => {
    if (!nome || !limite_membros || !descricao || !id_area) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const payload = {
      nome,
      limite_membros: Number(limite_membros),
      descricao,
      imagem: null,
      id_usuario,
      id_area: Number(id_area),
    };

    try {
      const response = await fetch(`${BASE_URL}/group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao criar grupo");
      const data = await response.json();
      alert(data.message || "Grupo criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar grupo");
    }
  };
  
  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`} style={{ display: "flex" }}>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      <Container isCollapsed={sidebarCollapsed}> 
        <Header>
          <Title>Crie seu Grupo no Journey!</Title>
        </Header>

        <CardWrapper>
          <Card>
            <BackButton onClick={() => window.history.back()}>← Voltar</BackButton>

            <Label>Nome do Grupo:</Label>
            <Input
              type="text"
              placeholder="Digite o nome do grupo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <Label>Área específica:</Label>
            <Select
              value={id_area}
              onChange={(e) => setIdArea(e.target.value)}
              // Desabilita o Select se houver erro
              disabled={areas.length === 1 && areas[0].id === -1} 
            >
              <option value="">Selecione uma área</option>
              {areas.map(area => (
                <option 
                  key={area.id} 
                  value={area.id} 
                  disabled={area.id === -1} // Desabilita opção de erro
                >
                  {area.nome}
                </option>
              ))}
            </Select>

            <Label>Limite de Membros (máx: 30)</Label>
            <Input
              type="number"
              placeholder="Máximo 30"
              value={limite_membros}
              max={30}
              onChange={(e) => setLimiteMembros(e.target.value)}
            />

            <Label>Descrição do Grupo:</Label>
            <Textarea
              placeholder="Digite a descrição do grupo"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <Label className="upload">Imagem do Grupo:</Label>
            <FileInput
              type="file"
            />

            <CreateButton onClick={handleSubmit}>+ Criar Grupo</CreateButton>
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default CriarGrupo;