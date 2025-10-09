import React, { useEffect, useState } from "react";
import Sidebar from "../../components/header/index.jsx";
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
  InputGroup
} from "./criarGrupo.js";
import { uploadImageToAzure } from "../uploadImageToAzure"; 

const BASE_URL = "http://localhost:8080/v1/journey";

const CriarGrupo = () => {
  const [nome, setNome] = useState("");
  const [limite_membros, setLimiteMembros] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id_area, setIdArea] = useState("");
  const [areas, setAreas] = useState([]);
  
  const [groupImageFile, setGroupImageFile] = useState(null); 
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isCreating, setIsCreating] = useState(false); 

  const [id_usuario] = useState(1);

  // SUAS CONSTANTES DO AZURE
  const AZURE_STORAGE_ACCOUNT = "journey2025"; 
  const AZURE_CONTAINER_NAME = "journey";
  const AZURE_SAS_TOKEN = "sp=racwl&st=2025-10-07T12:06:43Z&se=2025-12-20T20:21:43Z&sv=2024-11-04&sr=c&sig=olO%2FAQVZv1dP2I68WhoQ3D%2BcUpAaq7H3CepabScHisg%3D";


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
      setAreas([{ id: -1, nome: `[ERRO] ${err.message || "Falha ao carregar."}`,},]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGroupImageFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLimiteChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 30) {
      setLimiteMembros(value);
    } else if (e.target.value === "") {
      setLimiteMembros("");
    }
  };

  const handleSubmit = async () => {
    if (!nome || !limite_membros || !descricao || !id_area || !groupImageFile) {
      alert("Preencha todos os campos obrigatórios e selecione uma imagem.");
      return;
    }

    if (limite_membros < 1 || limite_membros > 30) {
      alert("O limite de membros deve ser entre 1 e 30.");
      return;
    }
    
    setIsCreating(true);
    let imageUrl = "default_group_image.png";

    try {
        const uploadParams = {
            file: groupImageFile,
            storageAccount: AZURE_STORAGE_ACCOUNT,
            sasToken: AZURE_SAS_TOKEN,
            containerName: AZURE_CONTAINER_NAME,
        };
        
        imageUrl = await uploadImageToAzure(uploadParams);

        const payload = {
            nome,
            limite_membros: Number(limite_membros),
            descricao,
            imagem: imageUrl, 
            id_usuario, 
            id_area: Number(id_area),
        };

        const response = await fetch(`${BASE_URL}/group`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Erro na API" }));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }

        alert("Grupo criado com sucesso!");

        // Limpar formulário
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
            <BackButton onClick={() => window.history.back()}>
              <FaArrowLeft style={{ marginRight: '5px' }} />
              Voltar
            </BackButton>
            
            <CardContent>
                
                {/* COLUNA 1: IMAGEM E UPLOAD */}
                <ImagePreviewContainer>
                    <Label className="upload" style={{ marginBottom: '5px' }}>Imagem do Grupo</Label>
                    
                    {imagePreviewUrl ? (
                        <PreviewImage src={imagePreviewUrl} alt="Pré-visualização do Grupo" />
                    ) : (
                        <UploadPlaceholder>
                            <FaImage size={35} style={{ marginBottom: '10px' }} />
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
                    <FileInputButton htmlFor="group-image-upload" disabled={isCreating}>
                        <FaImage /> {imagePreviewUrl ? 'Alterar Imagem' : 'Escolher Imagem'}
                    </FileInputButton>

                </ImagePreviewContainer>
                
                {/* COLUNA 2: CAMPOS DO FORMULÁRIO */}
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
                        <div>
                            <Label>Área específica:</Label>
                            <Select
                              value={id_area}
                              onChange={(e) => setIdArea(e.target.value)}
                              disabled={isCreating || (areas.length === 1 && areas[0].id === -1)}
                            >
                              <option value="">Selecione uma área</option>
                              {areas.map((area) => (
                                <option key={area.id} value={area.id} disabled={area.id === -1}>
                                  {area.nome}
                                </option>
                              ))}
                            </Select>
                        </div>
                        <div>
                            <Label>Limite de Membros (máx: 30):</Label>
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
            
            <CreateButton onClick={handleSubmit} disabled={isCreating}>
                {isCreating ? "CRIANDO E ENVIANDO..." : "+ CRIAR GRUPO"}
            </CreateButton>
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default CriarGrupo;
