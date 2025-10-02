// src/pages/perfil/perfil.js

import styled from "styled-components";

// Estilos base para herdar o Dark Mode
const FormElementStyle = `
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  background-color: #f0f2ff;
  color: #1e1e2f;
  width: 100%;
  transition: all 0.2s ease;
  
  .homepage.dark & {
    background-color: #3a3250;
    color: #e4e4e7;
    border-color: #3a3250;
  }
`;

export const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  padding: 30px;
  background-color: #f3f4f6;
  transition: all 0.3s ease;

  margin-left: ${({ $isCollapsed }) => ($isCollapsed ? "80px" : "250px")};

  .homepage.dark & {
    background-color: #1e1e2f;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .homepage.dark & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #4b39b8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  overflow: hidden;
  margin-right: 30px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e1e2f;

  .homepage.dark & {
    color: #e4e4e7;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
  margin-top: 20px;
  max-width: 900px; /* Limita a largura do formulário */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.8;
  .homepage.dark & {
    color: #ccc;
  }
`;

export const Input = styled.input`
  ${FormElementStyle}
`;

export const Select = styled.select`
  ${FormElementStyle}
`;

export const Textarea = styled.textarea`
  ${FormElementStyle}
  resize: vertical;
  min-height: 100px;
`;

export const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 30px;
`;

export const SaveButton = styled.button`
  background-color: #4b39b8;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6c5dd3;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: #4b39b8;
  border: 1px solid #4b39b8;
  border-radius: 12px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(75, 57, 184, 0.1);
  }
`;
