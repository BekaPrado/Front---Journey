
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 220px;
  background-color: #2c1e92;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 15px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  height: 100vh;
  box-sizing: border-box;
`;

export const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 2px solid rgba(255, 255, 255, 0.18);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Menu = styled.div`
  background: linear-gradient(180deg, #3b2cb0 0%, #2c1e92 100%);
  width: 100%;
  border-radius: 12px;
  padding: 14px;
  margin-top: 12px;
  box-shadow: 0 6px 18px rgba(16, 10, 60, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MenuItem = styled.button`
  background: transparent;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 15px;
  padding: 12px 14px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.18s ease, transform 0.12s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

