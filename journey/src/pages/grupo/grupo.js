// grupoDetalhes.js
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #f0f2ff;
  min-height: 100vh;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? "80px" : "220px")};
  transition: margin-left 0.3s ease;

  .homepage.dark & {
    background-color: #1e1e2f;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto 30px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1e1e2f;

  .homepage.dark & {
    color: #e4e4e7;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const Card = styled.div`
  background: #3c2aa8;
  border-radius: 16px;
  padding: 30px 40px;
  width: 750px;
  max-width: 90%;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  .homepage.dark & {
    background: #2a2040;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #5b47d1;
    object-fit: cover;
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
  }

  span {
    font-size: 14px;
    color: #d1d1f0;
  }
`;

export const Creator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #d1d1f0;

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #6c5dd3;
  }
`;

export const Description = styled.div`
  margin-top: 25px;
  font-size: 15px;
  line-height: 1.6;

  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  }
`;

export const Button = styled.button`
  background: #5b47d1;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 30px;
  margin-top: 25px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #6f5ef0;
  }
`;
