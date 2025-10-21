import styled from "styled-components";

// ===== Container principal =====
export const Container = styled.div`
  position: relative;
  width: 1200px;
  min-height: 850px;
  margin: 30px auto;
  display: flex;
  border-radius: 20px;
  background: linear-gradient(145deg, #2c2f48, #3e4160);
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
`;

// ===== Colunas =====
export const Left = styled.div`
  width: 60%;
  padding: 30px;
`;

export const Right = styled.div`
  width: 40%;
  min-height: 100%;
  padding: 30px;
  background: #2e314d;
  border-radius: 0 20px 20px 0;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
`;

// ===== Calendário =====
export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #3b3f5c;
  border-radius: 15px;
  padding: 25px;
  color: #dcdce6;
`;

// ===== Mês =====
export const Month = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: capitalize;

  .prev, .next {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.2);
      color: #ff94c2;
    }
  }

  .date {
    font-size: 1.8rem;
    text-align: center;
    color: #fff;
  }
`;

// ===== Dias da semana =====
export const Weekdays = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: 600;
  color: #c2c2d0;

  div {
    width: 14.28%;
    text-align: center;
  }
`;

// ===== Dias =====
export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;

  .day {
    position: relative;
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    &.today {
      background: #ff94c2;
      color: #fff;
      font-weight: 700;
      box-shadow: 0 0 10px rgba(255, 148, 194, 0.7);
    }

    &.active {
      border: 2px solid #ffd700;
      color: #ffd700;
    }

    .event-indicator {
      position: absolute;
      bottom: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ffd700;
    }

    &.prev-date, &.next-date {
      color: #8a8a9f;
      font-weight: 400;
    }
  }
`;

// ===== Botão Hoje =====
export const GotoToday = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  .today-btn {
    padding: 8px 18px;
    border: none;
    border-radius: 10px;
    background: #ffd700;
    color: #2e314d;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
      color: #ffb700;
    }
  }
`;

// ===== Data do dia =====
export const TodayDate = styled.div`
  margin-bottom: 20px;
  text-transform: capitalize;

  .event-day {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: #ffd700;
  }

  .event-date {
    font-size: 1.2rem;
    color: #c2c2d0;
  }
`;

// ===== Eventos =====
export const Events = styled.div`
  max-height: 550px;
  overflow: hidden;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .event {
    background: linear-gradient(120deg, #5a5e7f, #3b3f5c);
    padding: 15px 20px;
    border-radius: 15px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &:hover {
      transform: translateX(5px);
      box-shadow: 0 5px 20px rgba(255, 148, 194, 0.4);
    }

    .title {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .event-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fff;
    }

    .event-time {
      font-size: 0.95rem;
      color: #dcdce6;
    }

    .delete {
      align-self: flex-end;
      padding: 5px 12px;
      border: none;
      border-radius: 10px;
      background: #ff6b6b;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #ff4c4c;
      }
    }
  }

  .no-event {
    text-align: center;
    font-style: italic;
    color: #8a8a9f;
  }
`;

// ===== Modal de adicionar evento =====
export const AddEventWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 90%;
  max-height: 0;
  overflow: auto;
  background: #3b3f5c;
  border-radius: 20px;
  color: #fff;
  transform: translateX(-50%);
  transition: all 0.5s ease;

  &.active {
    max-height: 380px;
    padding: 20px;
  }
`;

export const AddEventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;

  .close {
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #ff94c2;
    }
  }
`;

export const AddEventBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;

  input {
    padding: 12px 15px;
    border-radius: 12px;
    border: none;
    outline: none;
    font-size: 1rem;
    background: #2e314d;
    color: #fff;
    transition: all 0.3s ease;

    &::placeholder {
      color: #a5a5c2;
    }

    &:focus {
      background: #3b3f5c;
      border: 2px solid #ffd700;
      color: #fff;
    }
  }
`;

export const AddEventFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .add-event-btn {
    padding: 12px 25px;
    border: none;
    border-radius: 12px;
    background: #ffd700;
    color: #2e314d;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
      color: #ffb700;
    }
  }
`;

// ===== Botão flutuante de adicionar evento =====
export const AddEventCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #fff;
  border: none;
  border-radius: 50%;
  background: #ff94c2;
  box-shadow: 0 6px 15px rgba(255, 148, 194, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(0.8);
    background: #ffd6f0;
    color: #333;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;




