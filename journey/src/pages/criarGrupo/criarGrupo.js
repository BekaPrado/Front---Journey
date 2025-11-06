// criarGrupo.js (Com Card Roxo, Foco Neutro e Botões Menores/Alinhados)

import styled, { css } from "styled-components";

// Estilo base para os inputs
export const FormElementStyle = css`
  background-color: var(--bg-card);
  color: var(--text-base);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:focus {
    border-color: rgba(107,114,128,0.45);
    box-shadow: 0 0 0 3px rgba(107,114,128,0.20);
    background-color: var(--bg-card);
  }
`;


// --- Layout Principal ---

export const Container = styled.div`
  flex: 1;
  padding: 40px 30px; 
  background-color: var(--bg-body);
  min-height: 100vh;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '80px' : '220px')};
  transition: margin-left 0.3s ease;

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
  color: var(--text-base); 

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
  background-color: var(--bg-card);
  border-radius: 16px; 
  box-shadow: var(--shadow-subtle); 
  transition: all 0.3s;
  color: var(--text-base);
  border: 1px solid var(--border-color);

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
  color: var(--text-base); 
  margin-bottom: 8px;
`;


export const Input = styled.input`${FormElementStyle}`;


export const Select = styled.select`
  ${FormElementStyle}
  appearance: auto; /* usa o ícone padrão do sistema */
  background-image: none; /* remove o SVG que causa bug */
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
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  background-color: var(--bg-card);
  transition: all 0.3s;
  height: fit-content;

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
  border: 5px solid var(--bg-card);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
`;


export const UploadPlaceholder = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--primary);
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
  background: var(--bg-card); 
  color: var(--text-base);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-subtle);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  font-size: 14px;

  &:hover { filter: brightness(1.03); }
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