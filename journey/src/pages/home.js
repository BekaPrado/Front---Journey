import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f3f4f6;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1e1e2f;
`;

export const GroupsWrapper = styled.div`
  background: #3b2da0;
  border-radius: 12px;
  padding: 20px;
  color: white;
  position: relative; /* necessário para posicionar actions */
`;

export const GroupsTitle = styled.h2`
  margin-bottom: 16px;
`;

export const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 50px; /* para não encostar nos botões */
`;

export const GroupCard = styled.div`
  background: #4b39b8;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const GroupIcon = styled.div`
  font-size: 24px;
`;

export const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupName = styled.span`
  font-weight: bold;
`;

export const GroupMembers = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 20px;
  right: 20px; /* coloca no canto superior direito */
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #fff;
  color: #3b2da0;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #e6e6ff;
  }
`;
