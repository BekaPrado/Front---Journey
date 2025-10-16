import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useAuth } from "../../context/AuthContext";

import { FaImage, FaArrowLeft } from "react-icons/fa";
import {
  Container,
  CardWrapper,
  Card,
  BackButton,
  Label,
  Input,
  Textarea,
  ImagePreviewContainer,
  PreviewImage,
  UploadPlaceholder,
  FileInput,
  FileInputButton,
  CreateButton,
  Header,
  Title,
  Select,
  CardContent,
  InputColumn,
  InputGroup,
} from "./criarGrupo.js";
import { uploadImageToAzure } from "../uploadImageToAzure";

const BASE_URL = "http://localhost:3030/v1/journey";

const CriarGrupo = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // usa o contexto (normalizado pelo AuthContext)
  const usuarioLocal =
    user ?? JSON.parse(localStorage.getItem("journey_user") || "null");

  const [nome, setNome] = useState("");
  const [limite_membros, setLimiteMembros] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id_area, setIdArea] = useState("");
  const [areas, setAreas] = useState([]);

  const [groupImageFile, setGroupImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // pega id_usuario do contexto ou localStorage (fallback robusto)
  const resolvedUserId = usuarioLocal?.id_usuario ?? usuarioLocal?.id ?? null;

  // SUAS CONSTANTES DO AZURE (mantive como estava)
  const AZURE_STORAGE_ACCOUNT = "journey2025";
  const AZURE_CONTAINER_NAME = "journey";
  const AZURE_SAS_TOKEN =
    "sp=racwl&st=2025-10-07T12:06:43Z&se=2025-12-20T20:21:43Z&sv=2024-11-04&sr=c&sig=olO%2FAQVZv1dP2I68WhoQ3D%2BcUpAaq7H3CepabScHisg%3D";

  const [darkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await fetch(`${BASE_URL}/area`);
      if (!res.ok) throw new Error(`Erro status ${res.status}`);
      const data = await res.json();
      const areasArray = Array.isArray(data.Area) ? data.Area : [];
      setAreas(areasArray.map((a) => ({ id: a.id_area, nome: a.area })));
    } catch (err) {
      console.error("Erro ao buscar áreas:", err);
      setAreas([
        { id: -1, nome: `[ERRO] ${err.message || "Falha ao carregar."}` },
      ]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGroupImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleLimiteChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      setLimiteMembros("");
      return;
    }
    const value = parseInt(raw, 10);
    if (!isNaN(value) && value >= 1 && value <= 30) {
      setLimiteMembros(value);
    }
  };

  const handleSubmit = async () => {
    // validações
    if (!nome || !limite_membros || !descricao || !id_area || !groupImageFile) {
      alert("Preencha todos os campos obrigatórios e selecione uma imagem.");
      return;
    }
    if (limite_membros < 1 || limite_membros > 30) {
      alert("O limite de membros deve ser entre 1 e 30.");
      return;
    }

    if (!resolvedUserId) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }

    setIsCreating(true);
    let imageUrl = "default_group_image.png";

    try {
      // upload da imagem para azure
      const uploadParams = {
        file: groupImageFile,
        storageAccount: AZURE_STORAGE_ACCOUNT,
        sasToken: AZURE_SAS_TOKEN,
        containerName: AZURE_CONTAINER_NAME,
      };

      try {
        imageUrl = await uploadImageToAzure(uploadParams);
      } catch (upErr) {
        console.warn(
          "Falha no upload para Azure, continuando com URL padrão:",
          upErr
        );
        // você pode escolher abortar aqui em vez de seguir com fallback
        // throw upErr;
      }

      // payload com id_usuario correto
      const payload = {
        nome,
        limite_membros: Number(limite_membros),
        descricao,
        imagem: imageUrl,
        id_usuario: Number(resolvedUserId),
        id_area: Number(id_area),
      };

      console.log("CriarGrupo -> payload:", payload);

      const response = await fetch(`${BASE_URL}/group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("Erro resposta criar grupo:", data);
        throw new Error(data.message || `Erro ${response.status}`);
      }

      // sucesso!
      alert("Grupo criado com sucesso!");
      // notifica outras páginas para refetch
      window.dispatchEvent(new Event("groupsUpdated"));

      // opcional: navegar para Meus Grupos ou para a página do grupo
      // se o backend retornar id_grupo, você pode navegar diretamente para /grupo com fetch do grupo
      if (data.id_grupo) {
        // tenta navegar para a página do grupo (state)
        const createdGroup = {
          id_grupo: data.id_grupo,
          nome,
          limite_membros,
          descricao,
          imagem: imageUrl,
          id_area,
          id_usuario: Number(resolvedUserId),
        };
        navigate("/grupo", { state: createdGroup });
      } else {
        // fallback: ir para meus-grupos
        navigate("/meus-grupos");
      }

      // limpar formulário (opcional)
      setNome("");
      setLimiteMembros("");
      setDescricao("");
      setIdArea("");
      setGroupImageFile(null);
      setImagePreviewUrl(null);
    } catch (error) {
      console.error("Falha na criação do grupo:", error);
      alert(`Erro ao criar grupo: ${error.message || "Verifique o console."}`);
    } finally {
      setIsCreating(false);
    }
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
        <Header theme={{ darkMode }}>
          <Title>Crie seu Grupo no Journey!</Title>
        </Header>

        <CardWrapper>
          <Card>
            <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: 8 }} />
              Voltar
            </BackButton>

            <CardContent>
              <ImagePreviewContainer>
                <Label className="upload" style={{ marginBottom: 8 }}>
                  Imagem do Grupo
                </Label>

                {imagePreviewUrl ? (
                  <PreviewImage
                    src={imagePreviewUrl}
                    alt="Pré-visualização do Grupo"
                  />
                ) : (
                  <UploadPlaceholder>
                    <FaImage size={35} style={{ marginBottom: 10 }} />
                    <span>Clique para escolher uma imagem</span>
                  </UploadPlaceholder>
                )}

                <FileInput
                  type="file"
                  id="group-image-upload"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={isCreating}
                />
                <FileInputButton
                  htmlFor="group-image-upload"
                  disabled={isCreating}
                >
                  <FaImage />{" "}
                  {imagePreviewUrl ? "Alterar Imagem" : "Escolher Imagem"}
                </FileInputButton>
              </ImagePreviewContainer>

              <InputColumn>
                <Label>Nome do Grupo:</Label>
                <Input
                  type="text"
                  placeholder="Ex: Grupo de Estudos React Avançado"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={isCreating}
                />

                <InputGroup>
                  <div style={{ flex: 1 }}>
                    <Label>Área específica:</Label>
                    <Select
                      value={id_area}
                      onChange={(e) => setIdArea(e.target.value)}
                      disabled={
                        isCreating || (areas.length === 1 && areas[0].id === -1)
                      }
                    >
                      <option value="">Selecione uma área</option>
                      {areas.map((area) => (
                        <option
                          key={area.id}
                          value={area.id}
                          disabled={area.id === -1}
                        >
                          {area.nome}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div style={{ width: 160 }}>
                    <Label>Limite de Membros (1-30):</Label>
                    <Input
                      type="number"
                      placeholder="Máximo 30"
                      min="1"
                      max="30"
                      value={limite_membros}
                      onChange={handleLimiteChange}
                      disabled={isCreating}
                    />
                  </div>
                </InputGroup>

                <Label>Descrição do Grupo:</Label>
                <Textarea
                  placeholder="Descreva o propósito, regras e público-alvo do seu grupo."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  disabled={isCreating}
                />
              </InputColumn>
            </CardContent>

            <CreateButton
              onClick={handleSubmit}
              disabled={isCreating}
              style={{ opacity: isCreating ? 0.8 : 1 }}
            >
              {isCreating ? "CRIANDO E ENVIANDO..." : "+ CRIAR GRUPO"}
            </CreateButton>
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default CriarGrupo;
