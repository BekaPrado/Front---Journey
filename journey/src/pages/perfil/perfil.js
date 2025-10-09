// perfil.js (Styled Components com Dark Mode e Layout de Duas Colunas)

import styled, { css } from "styled-components";

// Estilo Base para os Inputs (Similar ao usado no CriarGrupo)
const FormElementStyle = css`
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px; 
  font-size: 16px;
  border: 1px solid #d1d5db; /* Borda suave */
  background-color: #ffffff;
  color: #1e1e2f;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    /* FOCO NEUTRO (como ajustado anteriormente) */
    border-color: #1e1e2f; 
    box-shadow: 0 0 0 3px rgba(100, 100, 100, 0.3); 
    outline: none;
  }

  .homepage.dark & {
    background-color: #2a2a40;
    color: #e4e4e7;
    border-color: #3b3b55;
    
    &:focus {
      border-color: #e4e4e7;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
  }
`;

// --- Layout Principal ---

export const Container = styled.div`
  flex: 1;
  padding: 40px 30px; 
  background-color: #f0f2ff;
  min-height: 100vh;
  /* Espaçamento da Sidebar, ajuste conforme seu componente de Sidebar fixa */
  margin-left: 220px; 
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
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;

  .homepage.dark & {
    border-color: #3b3b55;
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
  max-width: 1100px; 
  padding: 40px; 
  background-color: #3a1376; /* CARD ROXO */
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

export const Column = styled.div`
  flex: 1;
`;

// --- Upload e Avatar (Coluna Esquerda) ---

export const AvatarContainer = styled.div`
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

export const AvatarImage = styled.img`
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

// --- Campos de Dados (Coluna Direita) ---

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

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`${FormElementStyle}`;

export const Select = styled.select`
  ${FormElementStyle}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e1e2f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  
  .homepage.dark & {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e4e4e7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  }
`;

export const Textarea = styled.textarea`
  ${FormElementStyle}
  resize: vertical;
  min-height: 120px;
`;


// --- Botões de Ação ---

export const ActionButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* Alinha o botão à direita */
    gap: 15px;
    margin-top: 40px;
    
    @media (max-width: 600px) {
        justify-content: center;
        gap: 10px;
    }
`;


export const Button = styled.button`
  padding: 12px 25px; 
  border-radius: 8px; 
  font-weight: 700;
  font-size: 16px; 
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  min-width: 150px;

  &:disabled {
    background: #ccc;
    color: #555;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const CancelButton = styled(Button)`
  background: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .homepage.dark & {
      color: #d1d5db;
      border-color: #d1d5db;
  }
`;

export const SaveButton = styled(Button)`
  background: #ffffff; 
  color: #3a1376; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: #f0f2ff;
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  
  .homepage.dark & {
    background: #8c73d9;
    color: #1e1e2f;
  }
`;