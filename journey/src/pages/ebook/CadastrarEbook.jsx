import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FaImage, FaArrowLeft, FaFilePdf } from "react-icons/fa";
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
  CardContent,
  InputColumn,
  Select,
} from "./CadastrarEbook.js";
import { uploadImageToAzure } from "../uploadImageToAzure";

const BASE_URL = "http://localhost:3030/v1/journey";

const CadastrarEbook = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const usuarioLocal =
    user ?? JSON.parse(localStorage.getItem("journey_user") || "null");
  const resolvedUserId = usuarioLocal?.id_usuario ?? usuarioLocal?.id ?? null;

  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [idCategoriasSelecionadas, setIdCategoriasSelecionadas] = useState([]);
  const [ebookImageFile, setEbookImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const AZURE_STORAGE_ACCOUNT = "journey2025";
  const AZURE_CONTAINER_NAME = "journey";
  const AZURE_SAS_TOKEN =
    "sp=racwl&st=2025-10-07T12:06:43Z&se=2025-12-20T20:21:43Z&sv=2024-11-04&sr=c&sig=olO%2FAQVZv1dP2I68WhoQ3D%2BcUpAaq7H3CepabScHisg%3D";

  // Carrega as categorias direto do endpoint /ebook-categoria
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const res = await fetch(`${BASE_URL}/ebook-categoria`);
      if (!res.ok) throw new Error(`Erro status ${res.status}`);
      const data = await res.json();

      // Extrai categorias únicas do retorno da API
      if (Array.isArray(data.ebookCategoria)) {
        const categoriasUnicas = [];
        const nomes = new Set();

        data.ebookCategoria.forEach((item) => {
          const cat = item?.categoria;
          if (cat && !nomes.has(cat.categoria)) {
            nomes.add(cat.categoria);
            categoriasUnicas.push({
              id_categoria: cat.id_categoria,
              categoria: cat.categoria,
            });
          }
        });

        setCategorias(categoriasUnicas);
      } else {
        throw new Error("Formato inesperado da resposta da API");
      }
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEbookImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  const handleCategoriaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setIdCategoriasSelecionadas(selectedOptions);
  };

  const handleSubmit = async () => {
    if (!titulo || !descricao || !preco || !ebookImageFile || !pdfFile) {
      alert("Preencha todos os campos obrigatórios e selecione imagem e PDF.");
      return;
    }

    if (!resolvedUserId) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }

    if (idCategoriasSelecionadas.length === 0) {
      alert("Selecione pelo menos uma categoria.");
      return;
    }

    setIsCreating(true);
    let imageUrl = "";
    let pdfUrl = "";

    try {
      const imageUploadParams = {
        file: ebookImageFile,
        storageAccount: AZURE_STORAGE_ACCOUNT,
        sasToken: AZURE_SAS_TOKEN,
        containerName: AZURE_CONTAINER_NAME,
      };
      imageUrl = await uploadImageToAzure(imageUploadParams);

      const pdfUploadParams = {
        file: pdfFile,
        storageAccount: AZURE_STORAGE_ACCOUNT,
        sasToken: AZURE_SAS_TOKEN,
        containerName: AZURE_CONTAINER_NAME,
      };
      pdfUrl = await uploadImageToAzure(pdfUploadParams);

      const payload = {
        titulo,
        preco: parseFloat(preco),
        descricao,
        link_imagem: imageUrl,
        link_arquivo_pdf: pdfUrl,
        id_usuario: Number(resolvedUserId),
        categorias: idCategoriasSelecionadas.map((id) => ({
          id_categoria: id,
        })),
      };

      console.log("Payload final ->", payload);

      const response = await fetch(`${BASE_URL}/ebook-categoria`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("Erro resposta criar ebook:", data);
        throw new Error(data.message || `Erro ${response.status}`);
      }

      alert("E-book cadastrado com sucesso!");
      navigate("/ebook");
    } catch (error) {
      console.error("Falha no cadastro do e-book:", error);
      alert(`Erro ao cadastrar: ${error.message || "Verifique o console."}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className={`homepage ${theme === "dark" ? "dark" : ""}`}
      style={{ display: "flex" }}
    >
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <Container $isCollapsed={sidebarCollapsed}>
        <Header>
          <Title>Cadastre seu Ebook no Journey!</Title>
        </Header>

        <CardWrapper>
          <Card>
            <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: 8 }} /> Voltar
            </BackButton>

            <CardContent>
              <ImagePreviewContainer>
                <Label>Imagem de Capa</Label>

                {imagePreviewUrl ? (
                  <PreviewImage
                    src={imagePreviewUrl}
                    alt="Pré-visualização da capa"
                  />
                ) : (
                  <UploadPlaceholder>
                    <FaImage size={35} style={{ marginBottom: 10 }} />
                    <span>Clique para escolher uma imagem</span>
                  </UploadPlaceholder>
                )}

                <FileInput
                  type="file"
                  id="image-upload"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <FileInputButton htmlFor="image-upload" disabled={isCreating}>
                  <FaImage />{" "}
                  {imagePreviewUrl ? "Alterar Imagem" : "Escolher Imagem"}
                </FileInputButton>

                <Label style={{ marginTop: "20px" }}>Arquivo PDF:</Label>
                <FileInput
                  type="file"
                  id="pdf-upload"
                  onChange={handlePdfChange}
                  accept="application/pdf"
                />
                <FileInputButton htmlFor="pdf-upload" disabled={isCreating}>
                  <FaFilePdf /> {pdfFile ? "Alterar PDF" : "Enviar PDF"}
                </FileInputButton>
              </ImagePreviewContainer>

              <InputColumn>
                <Label>Título do Ebook:</Label>
                <Input
                  type="text"
                  placeholder="Ex: Introdução a Machine Learning"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Label>Preço do Ebook:</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ex: 49.90"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />

                <Label>Descrição:</Label>
                <Textarea
                  placeholder="Descreva o conteúdo do ebook..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                <Label>Selecione as Categorias:</Label>
                <Select
                  multiple
                  onChange={handleCategoriaChange}
                  value={idCategoriasSelecionadas}
                >
                  {categorias.map((c) => (
                    <option key={c.id_categoria} value={c.id_categoria}>
                      {c.categoria}
                    </option>
                  ))}
                </Select>
              </InputColumn>
            </CardContent>

            <CreateButton onClick={handleSubmit} disabled={isCreating}>
              {isCreating ? "ENVIANDO..." : "+ CADASTRAR EBOOK"}
            </CreateButton>
          </Card>
        </CardWrapper>
      </Container>
    </div>
  );
};

export default CadastrarEbook;
