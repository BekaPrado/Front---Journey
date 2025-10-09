// criarGrupo.js (Com Card Roxo, Foco Neutro e Botões Menores/Alinhados)

import styled, { css } from "styled-components";

// Estilo base para os inputs
export const FormElementStyle = css`
  background-color: #fff;
  color: #1e1e2f;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:focus {
    border-color: #ccc; /* mantém igual ao padrão */
    box-shadow: none; /* remove o brilho roxo */
    background-color: #fff; /* não muda o fundo */
  }

  .homepage.dark & {
    background-color: #2a2a3b;
    color: #f5f5f7;
    border-color: #444;

    &:focus {
      border-color: #444; /* não muda no dark também */
      box-shadow: none;
      background-color: #2a2a3b;
    }
  }
`;


// --- Layout Principal ---

export const Container = styled.div`
  flex: 1;
  padding: 40px 30px; 
  background-color: #f0f2ff;
  min-height: 100vh;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '80px' : '220px')};
  transition: margin-left 0.3s ease;

  .homepage.dark & {
    background-color: #1e1e2f;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px 15px;
  }
`;

export const Header = styled.div`
  max-width: 1100px;
  margin: 0 auto 40px;
  padding-bottom: 0; /* remove o espaço da linha */
  border: none; /* remove qualquer borda */
  box-shadow: none; /* garante que não exista sombra */
  &::after {
    display: none; /* remove pseudo-elementos */
  }
`;


export const Title = styled.h1`
  font-size: 32px; 
  font-weight: 700;
  color: #3a1376; 

  .homepage.dark & {
    color: #ffffff;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1230px; 
  padding: 40px; 
  background-color: #3b2da0;
  border-radius: 16px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); 
  transition: all 0.3s;
  color: #ffffff; 

  .homepage.dark & {
    background-color: #2a2a40; 
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 600px) {
    padding: 25px 20px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  gap: 40px; 
  margin-top: 20px;
  
  @media (max-width: 992px) { 
    flex-direction: column;
    gap: 30px;
  }
`;

export const InputColumn = styled.div`
  flex: 1;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// --- Elementos do Formulário ---

export const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff; 
  margin-bottom: 8px;

  .homepage.dark & {
    color: #d1d5db;
  }
`;

export const Input = styled.input`${FormElementStyle}`;

export const Select = styled.select`
  ${FormElementStyle}
  appearance: auto; /* usa o ícone padrão do sistema */
  background-image: none; /* remove o SVG que causa bug */
  
  .homepage.dark & {
    background-image: none;
  }
`;


export const Textarea = styled.textarea`
  ${FormElementStyle}
  resize: vertical;
  min-height: 120px;
`;


// --- Upload e Preview ---

export const ImagePreviewContainer = styled.div`
  flex-basis: 300px; 
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30px 20px; 
  border: 2px dashed #8c73d9;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
  height: fit-content;

  .homepage.dark & {
    border-color: #8c73d9;
    background-color: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 992px) {
    flex-basis: auto; 
    min-width: 100%;
  }
`;

export const PreviewImage = styled.img`
  width: 150px; 
  height: 150px;
  border-radius: 50%; 
  object-fit: cover;
  border: 5px solid #f0f2ff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;

  .homepage.dark & {
    border-color: #2a2a40;
  }
`;

export const UploadPlaceholder = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #5c46b5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 15px;
  opacity: 0.9;
  flex-shrink: 0;

  .homepage.dark & {
    background: #8c73d9;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputButton = styled.label`
  padding: 10px 25px;
  border-radius: 999px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  background: #ffffff; 
  color: #3a1376;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  font-size: 14px;

  &:hover {
    background: #f0f2ff;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  .homepage.dark & {
    background: #e4e4e7;
    color: #1e1e2f;
  }
`;

// --- Botão de Voltar (Largura Mínima) ---

// --- Botão de Voltar (Compacto e fixo à esquerda) ---
export const BackButton = styled.button`
  background: none;
  border: none;
  color: #3a14a3ff; 
  font-size: 13px; 
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease-in-out;
  width: auto; /* 🔹 Não deixa o botão esticar */
  max-width: fit-content; /* 🔹 Garante largura mínima possível */
  align-self: flex-start; /* 🔹 Mantém ele grudado à esquerda */
  margin-bottom: 0px;

  &:hover {
    color: #351e9bff;
    background-color: rgba(255, 255, 255, 0.12);
  }

  &:active {
    transform: translateY(1px);
    background-color: rgba(255, 255, 255, 0.2);
  }

  .homepage.dark & {
    color: #bda8ff;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;



// --- Botão de Criar Grupo (Alinhado à esquerda) ---

export const CreateButton = styled.button`
  /* Largura e Alinhamento à Esquerda */
  width: 100%;
  max-width: 200px; 
  display: block; 
  margin: 40px auto 0 0; /* Alinha à esquerda */

  /* Estilos Visuais */
  padding: 15px 20px; 
  border-radius: 8px; 
  font-weight: 700;
  font-size: 18px; 
  border: none;
  cursor: pointer;
  transition: all 1.0s;
  background: #ffffff; 
  color: #3a1376; 
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;

  &:hover:not(:disabled) {
    background: #f0f2ff;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    color: #555;
    cursor: not-allowed;
    box-shadow: none;
  }

  .homepage.dark & {
    background: #6f42f7ff;
    color: #1e1e2f;
    box-shadow: 0 8px 15px rgba(140, 115, 217, 0.4);
  }
`;