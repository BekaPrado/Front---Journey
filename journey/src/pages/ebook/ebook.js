// src/pages/ebook/ebook.js
import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-color: var(--bg-body);
  min-height: 100vh;
  padding: 25px 35px;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? "80px" : "220px")};
  transition: margin-left 0.3s ease;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    width: 250px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    outline: none;
    color: var(--text-base);
    background: var(--bg-card);
  }

  .user-actions {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export const Banner = styled.div`
  margin-top: 40px;
  background: linear-gradient(120deg, #6f42f7, #a684ff);
  border-radius: 20px;
  padding: 40px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

export const BannerText = styled.div`
  max-width: 480px;

  h2 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.9;
    margin-bottom: 18px;
  }

  button {
    background: #fff;
    color: #6f42f7;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const BannerImage = styled.img`
  width: 180px;
  height: auto;
`;

export const Section = styled.section`
  margin-top: 40px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 20px;
    font-weight: bold;
  }

  span {
    font-size: 14px;
    color: var(--text-muted);
    cursor: pointer;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px;
`;

export const BookCard = styled.div`
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: var(--shadow-subtle);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-elevated);
  }
`;

export const BookImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  background: #f5f4ff;
  padding: 10px;
`;

export const BookInfo = styled.div`
  padding: 12px 14px;

  h4 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: var(--text-muted);
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const AchievementCard = styled.div`
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-subtle);

  h4 {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export const SalesList = styled.div`
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-subtle);

  h4 {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export const SalesItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  p {
    font-weight: 600;
  }

  small {
    color: var(--text-muted);
  }

  button {
    background: #6f42f7;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #5930d3;
    }
  }
`;
