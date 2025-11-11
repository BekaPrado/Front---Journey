import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: var(--background);
  position: relative;
  overflow: hidden;
`;

export const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(111, 66, 247, 0.15),
    rgba(240, 240, 255, 0.05)
  );
  z-index: 0;
`;

export const Content = styled.div`
  flex: 1;
  padding: 60px 80px;
  z-index: 2;
  overflow-y: auto;
  animation: ${fadeIn} 0.5s ease;
`;

export const EbookWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 40px;
  background: var(--card-bg);
  border-radius: 18px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  padding: 40px;
  max-width: 1100px;
  margin: 0 auto;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 20px rgba(111, 66, 247, 0.2);
  }
`;

export const EbookImage = styled.img`
  width: 320px;
  height: 440px;
  object-fit: cover;
  border-radius: 16px;
  background: #f0f0f0;
  box-shadow: 0 4px 20px rgba(111, 66, 247, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 280px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 5px;
`;

export const Author = styled.p`
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
  opacity: 0.9;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CategoryTag = styled.span`
  background: linear-gradient(90deg, #6f42f7, #9d7cff);
  color: #fff;
  padding: 8px 14px;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

export const PriceTag = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #6f42f7;
  margin-bottom: 25px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

export const BuyButton = styled.button`
  background: linear-gradient(90deg, #6f42f7, #8c52ff);
  color: white;
  padding: 14px 28px;
  font-size: 1.05rem;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(111, 66, 247, 0.4);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(111, 66, 247, 0.5);
  }
`;

export const BackButton = styled.button`
  background: transparent;
  border: 2px solid var(--text-muted);
  color: var(--text-muted);
  padding: 12px 24px;
  border-radius: 14px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--text-muted);
    color: #fff;
  }
`;
