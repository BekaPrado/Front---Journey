import styled from "styled-components";

// ===== Container principal =====
export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  min-height: 720px;
  margin: 24px auto;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  background: var(--bg-card);
  color: var(--text-base);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-subtle);
`;

// ===== Colunas =====
export const Left = styled.div`
  width: 60%;
  padding: 22px;
`;

export const Right = styled.div`
  width: 40%;
  min-height: 100%;
  padding: 22px;
  background: var(--bg-body);
  border-left: 1px solid var(--border-color);
  border-radius: 0 20px 20px 0;
`;

// ===== Calendário =====
export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--bg-body);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 18px;
  color: var(--text-base);
`;

// ===== Mês =====
export const Month = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: capitalize;

  .prev,
  .next {
    cursor: pointer;
    transition: transform .2s ease, color .2s ease;
    &:hover {
      transform: scale(1.12);
      color: var(--primary);
    }
  }

  .date {
    font-size: 1.35rem;
    text-align: center;
    color: var(--text-base);
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
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
    background: var(--bg-card);
    border: 1px solid var(--border-color);

    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-subtle);
    }

    &.today {
      outline: 2px solid rgba(107,114,128,0.45);
      background: rgba(107,114,128,0.10);
    }

    &.active {
      background: rgba(107,114,128,0.18);
      color: inherit;
      border-color: rgba(107,114,128,0.35);
    }

    .event-indicator {
      position: absolute;
      bottom: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(107,114,128,0.85);
    }

    &.prev-date,
    &.next-date {
      color: var(--text-muted);
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
    padding: 10px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--primary), #A78BFA);
    color: #fff;
    font-weight: 800;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(108,74,226,.25);
    transition: transform .15s ease, filter .2s ease, box-shadow .2s ease;
  }
  .today-btn:hover { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 14px 30px rgba(108,74,226,.35); }
`;

// ===== Data do dia =====
export const TodayDate = styled.div`
  margin-bottom: 20px;
  text-transform: capitalize;

  .event-day {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 4px;
    color: var(--primary);
  }

  .event-date {
    font-size: 0.95rem;
    color: var(--text-muted);
  }
`;

// ===== Eventos =====
export const Events = styled.div`
  max-height: 540px;
  overflow: hidden;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .event {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 14px 16px;
    border-radius: 14px;
    transition: transform .2s ease, box-shadow .2s ease;
    box-shadow: var(--shadow-subtle);
    display: flex;
    flex-direction: column;
    gap: 5px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(17,17,26,0.10);
    }

    .title {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .event-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--text-base);
    }

    .event-time {
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .delete {
      align-self: flex-end;
      padding: 8px 12px;
      border: none;
      border-radius: 10px;
      background: linear-gradient(135deg, #ef4444, #f87171);
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      transition: filter .15s ease, transform .15s ease;
    }
    .delete:hover { filter: brightness(1.05); transform: translateY(-1px); }

    .event-user {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 4px;
    }
  }

  .no-event {
    text-align: center;
    color: var(--text-muted);
  }
`;

// ===== Modal de adicionar evento =====
export const AddEventWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  width: 90%;
  max-height: 0;
  overflow: auto;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  color: var(--text-base);
  transform: translateX(-50%);
  transition: all 0.5s ease;

  &.active {
    max-height: 380px;
    padding: 16px;
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
      color: #765cdd;
    }
  }
`;

export const AddEventBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;

  input {
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    outline: none;
    font-size: 0.95rem;
    background: var(--bg-body);
    color: var(--text-base);
    transition: border .2s ease, box-shadow .2s ease, background .2s ease;

    &::placeholder {
      color: var(--text-muted);
    }

    &:focus {
      background: var(--bg-card);
      border-color: rgba(108,74,226,0.35);
      box-shadow: 0 0 0 4px rgba(108,74,226,0.18);
    }
  }
`;

export const AddEventFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .add-event-btn {
    padding: 12px 18px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--primary), #A78BFA);
    color: #fff;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(108,74,226,.25);
    transition: transform .15s ease, filter .2s ease, box-shadow .2s ease;
  }
  .add-event-btn:hover { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 14px 30px rgba(108,74,226,.35); }
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
  background: var(--primary);
  cursor: pointer;
  transition: transform .2s ease, filter .2s ease, box-shadow .2s ease;
  box-shadow: 0 12px 26px rgba(108,74,226,.35);

  &:hover {
    transform: translateY(-1px) scale(0.98);
    filter: brightness(1.05);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;
