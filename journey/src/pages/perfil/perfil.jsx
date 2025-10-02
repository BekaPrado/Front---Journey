// src/pages/perfil/perfil.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Necessário para navegar ao Cancelar
import Sidebar from "../../components/header/index.jsx"; // Importa a Sidebar
import {
  Container,
  ProfileHeader,
  ProfileImage,
  Title,
  FormGrid,
  InputGroup,
  Label,
  Input,
  Select,
  Textarea,
  ButtonContainer,
  SaveButton,
  CancelButton
} from "./perfil.js";
import { FaUserCircle } from 'react-icons/fa';

const BASE_URL = "http://localhost:8080/v1/journey/usuario";
// MOCK ID: Substitua pelo ID real do usuário logado (ex: lido do token JWT ou localStorage)
const MOCK_USER_ID = 1; 

const Perfil = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Dark Mode e Sidebar (Lê do localStorage)
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  // O estado da Sidebar deve ser compartilhado/lido do componente pai ou contexto se existir, 
  // mas usaremos um estado local temporário para a margem
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  useEffect(() => {
    fetchUserData();
  }, []);
  
  // FUNÇÃO PARA BUSCAR DADOS DO USUÁRIO (GET /usuario/:id)
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${MOCK_USER_ID}`); 
      if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
      }
      const data = await res.json();

      // Se vier objeto direto
      if (data.id_usuario) {
        setUserData(data);
      }
      // Se vier dentro de "usuario" (objeto)
      else if (data.usuario && !Array.isArray(data.usuario)) {
        setUserData(data.usuario);
      }
      // Se vier lista
      else if (Array.isArray(data.usuario) && data.usuario.length > 0) {
        setUserData(data.usuario[0]);
      }
      else {
        setError("Usuário não encontrado.");
      }
      
      
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
      setError("Não foi possível carregar o perfil. Verifique se o Back-end está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // FUNÇÃO PARA ATUALIZAR DADOS DO USUÁRIO (PUT /usuario/:id)
  const handleSave = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
        // Validação básica dos campos obrigatórios
        if (!userData.nome_completo || !userData.email || !userData.tipo_usuario) {
            alert("Preencha os campos obrigatórios: Nome, Email e Tipo de Usuário.");
            return;
        }
        
        // Monta o payload (exclui id_usuario, senha e outros campos internos)
        const payload = {
            nome_completo: userData.nome_completo,
            email: userData.email,
            data_nascimento: userData.data_nascimento || null, 
            foto_perfil: userData.foto_perfil || null, 
            descricao: userData.descricao || null,
            tipo_usuario: userData.tipo_usuario
        };

        const response = await fetch(`${BASE_URL}/${MOCK_USER_ID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
             const errorData = await response.json();
             throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }
        
        const result = await response.json();

        alert(`Perfil atualizado com sucesso!`);
        // O seu controller retorna o objeto atualizado, então atualizamos o estado
        if(result.usuario) {
            setUserData(result.usuario);
        }

    } catch (error) {
        console.error("Erro ao salvar perfil:", error);
        alert(`Erro ao salvar perfil: ${error.message || error}`);
    } finally {
        setIsUpdating(false);
    }
  };

  if (loading) return <Container><Title>Carregando perfil...</Title></Container>;
  if (error) return <Container><Title style={{ color: 'red' }}>Erro: {error}</Title></Container>;

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`} style={{ display: "flex" }}>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      /> 
      <Container isCollapsed={sidebarCollapsed}>
        
        <ProfileHeader>
          <ProfileImage>
            {/* Exibe a foto do perfil ou um ícone padrão */}
            {userData.foto_perfil ? (
              <img src={userData.foto_perfil} alt="Foto de Perfil" />
            ) : (
              <FaUserCircle size={60} style={{ opacity: 0.7 }} />
            )}
          </ProfileImage>
          <Title>Edição de Perfil de {userData.nome_completo}</Title>
        </ProfileHeader>

        <FormGrid>
          {/* Nome Completo */}
          <InputGroup>
            <Label>Nome Completo:</Label>
            <Input
              type="text"
              name="nome_completo"
              value={userData.nome_completo || ''}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Alterar senha ? */}
          <InputGroup>
            <Label>Alterar Senha</Label>
            <Input
              type="password"
              name="senha"
              value={userData.senha || ''}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Email */}
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Data de Nascimento */}
          <InputGroup>
            <Label>Data de Nascimento:</Label>
            <Input
              type="date"
              name="data_nascimento"
              value={userData.data_nascimento || ''}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Tipo de Usuário */}
          <InputGroup>
            <Label>Tipo de Usuário:</Label>
            <Select
              name="tipo_usuario"
              value={userData.tipo_usuario || ''}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="Profissional">Profissional</option>
              <option value="Estudante">Estudante</option>
            </Select>
          </InputGroup>
          
          {/* Foto Perfil (Simulação: URL da imagem) */}
          <InputGroup style={{ gridColumn: '1 / -1' }}>
            <Label>URL/Caminho da Foto de Perfil:</Label>
            <Input
              type="text"
              name="foto_perfil"
              placeholder="Cole a URL da sua foto de perfil aqui"
              value={userData.foto_perfil || ''}
              onChange={handleInputChange}
            />
          </InputGroup>

          {/* Descrição - Ocupa as duas colunas */}
          <InputGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Descrição / Bio:</Label>
            <Textarea
              name="descricao"
              placeholder="Fale um pouco sobre você..."
              value={userData.descricao || ''}
              onChange={handleInputChange}
            />
          </InputGroup>
        
        <ButtonContainer>
            <SaveButton onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
            </SaveButton>
            <CancelButton onClick={() => navigate(-1)}>Cancelar</CancelButton>
        </ButtonContainer>
        
        </FormGrid>
      </Container>
    </div>
  );
};

export default Perfil;