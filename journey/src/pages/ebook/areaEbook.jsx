import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import { useTheme } from "../../context/ThemeContext";
import {
  Container,
  Content,
  EbookWrapper,
  EbookImage,
  InfoSection,
  Title,
  Author,
  Description,
  CategoryList,
  CategoryTag,
  PriceTag,
  ButtonRow,
  BuyButton,
  BackButton,
  GradientBackground,
} from "./areaEbook.js";

export default function DetalheEbook() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const ebook = location.state;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!ebook) {
    return (
      <Container>
        <Content>
          <h2 style={{ color: "var(--text-color)" }}>
            Nenhum e-book encontrado.
          </h2>
          <BackButton onClick={() => navigate("/ebook")}>Voltar</BackButton>
        </Content>
      </Container>
    );
  }

  const formatarPreco = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valor));

  const handleComprar = () => {
    alert(
      `Compra iniciada para "${ebook.titulo}" por ${formatarPreco(
        ebook.preco
      )}.`
    );
  };

  return (
    <Container className={theme === "dark" ? "dark" : ""}>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <GradientBackground />

      <Content>
        <EbookWrapper>
          <EbookImage
            src={
              ebook.link_imagem ||
              "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            }
            alt={ebook.titulo}
          />

          <InfoSection>
            <Title>{ebook.titulo}</Title>
            <Author>
              por {ebook.usuario?.nome_completo || "Autor desconhecido"}
            </Author>

            <Description>{ebook.descricao}</Description>

            {ebook.categoriasEbooks?.length > 0 && (
              <CategoryList>
                {ebook.categoriasEbooks.map((cat, index) => (
                  <CategoryTag key={index}>
                    {cat.categoria?.categoria}
                  </CategoryTag>
                ))}
              </CategoryList>
            )}

            <PriceTag>{formatarPreco(ebook.preco)}</PriceTag>

            <ButtonRow>
              <BuyButton onClick={handleComprar}>Comprar E-book</BuyButton>
              <BackButton onClick={() => navigate("/ebook")}>Voltar</BackButton>
            </ButtonRow>
          </InfoSection>
        </EbookWrapper>
      </Content>
    </Container>
  );
}
