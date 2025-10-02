// criarGrupo.js (Apenas o componente Card foi ajustado)

import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #F0F2FF; 
  min-height: 100vh;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '80px' : '220px')};
  transition: margin-left 0.3s ease;

  .homepage.dark & {
    background-color: #1e1e2f; 
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  max-width: 1200px;
  margin: 0 auto 30px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1e1e2f;
  
  .homepage.dark & {
    color: #e4e4e7;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 100%;
`;

export const Card = styled.div`
  background: #4b39b8;
  border-radius: 12px;
  padding: 30px 40px; 
  /* AUMENTO DE LARGURA PARA HARMONIA */
  width: 650px; 
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);

  .homepage.dark & {
    background: #2a2040; 
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  background: #6c5dd3;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  margin-bottom: 15px;
  transition: background 0.2s;

  &:hover {
    background: #7a6de0;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
`;

const FormElementStyle = `
  padding: 12px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: #f0f2ff;
  color: #1e1e2f;
  width: 100%;
  
  .homepage.dark & {
    background-color: #3a3250;
    color: #e4e4e7;
  }
`;

export const Input = styled.input`
  ${FormElementStyle}
`;

export const Select = styled.select`
  ${FormElementStyle}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
`;

export const Textarea = styled.textarea`
  ${FormElementStyle}
  resize: vertical;
  min-height: 80px;
`;

export const FileInput = styled.input`
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  color: #e4e4e7;
  background: transparent;

  &::file-selector-button {
    background: #6c5dd3;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 15px;
    margin-right: 15px;
    cursor: pointer;
    transition: background 0.2s;
  }
`;

export const CreateButton = styled.button`
  align-self: flex-end; 
  background: #29e84b; 
  color: #1e1e2f;
  border: none;
  border-radius: 12px;
  padding: 12px 25px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s;
  font-size: 16px;

  &:hover {
    background: #4ae867;
  }
`;


