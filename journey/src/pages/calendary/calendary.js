import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 1200px;
  min-height: 850px;
  margin: 0 auto;
  padding: 5px;
  color: #fff;
  display: flex;
  border-radius: 10px;
  background-color: #373c4f;
`;

export const Left = styled.div`
  width: 60%;
  padding: 20px;
`;

export const Right = styled.div`
  position: relative;
  width: 40%;
  min-height: 100%;
  padding: 20px 0;
`;

export const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #878895;
  border-radius: 5px;
  background-color: #fff;
`;

export const Month = styled.div`
  width: 80%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;

  .prev,
  .next {
    cursor: pointer;
    &:hover {
      color: #b38add;
    }
  }
`;

export const Weekdays = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: capitalize;

  div {
    width: 14.28%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 colunas fixas */
  gap: 5px;
  padding: 5px 20px;
  font-size: 1rem;

  .day {
    position: relative;
    width: 80px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.today {
      background:rgba(204, 185, 223, 0.25);
      color: #fff;
      border-radius: 15%;
    }

    &.active {
      border: 2px solid #b38add;
      border-radius: 10%;
    }

    .event-indicator {
      position: absolute;
      bottom: 8px;
      width: 6px;
      height: 6px;
      color: #b38add;
    }
  }
`;


export const GotoToday = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 0 20px;
  margin-bottom: 20px;
  color: #b38add;

  .goto {
    display: flex;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #b38add;

    input {
      width: 100%;
      height: 30px;
      outline: none;
      border: none;
      padding: 0 20px;
      color: #b38add;
    }

    button {
      border: none;
      border-left: 1px solid #b38add;
      background: transparent;
      padding: 5px 10px;
      cursor: pointer;
    }
  }

  .today-btn {
    padding: 5px 10px;
    border: 1px solid #b38add;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    color: #b38add;

    &:hover {
      color: #fff;
      background-color: #b38add;
    }
  }
`;

export const TodayDate = styled.div`
  width: 70%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-left: 70px;
  margin-top: 50px;
  margin-bottom: 20px;
  text-transform: capitalize;

  .event-day {
    font-size: 2rem;
    font-weight: 500;
  }

  .event-date {
    font-size: 1rem;
    font-weight: 400;
    color: #878895;
  }
`;

export const Events = styled.div`
  width: 100%;
  height: 100%;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-left: 4px;

  .event {
    position: relative;
    width: 95%;
    min-height: 70px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0 20px;
    padding-left: 50px;
    color: #fff;
    background: linear-gradient(90deg, #3f4458, transparent);
    cursor: pointer;

    .title {
      height: 20px;
      display: flex;
      align-items: center;
    }

    .event-title {
      font-size: 1rem;
      font-weight: 400;
      margin-left: 20px;
    }

    .event-time {
      font-size: 0.8rem;
      font-weight: 400;
      color: #878895;
      margin-left: 10px;
    }
  }
`;

export const AddEventWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  width: 90%;
  max-height: 0;
  overflow: hidden;
  border-radius: 5px;
  background-color: #fff;
  transform: translateX(-50%);
  transition: max-height 0.5s ease;

  &.active {
    max-height: 300px;
  }
`;

export const AddEventHeader = styled.div`
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  color: #373c4f;
  border-bottom: 1px solid #f5f5f5;

  .close {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const AddEventBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;

  input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 10px;
    font-size: 1rem;
    color:rgb(170, 176, 201);

    &::placeholder {
      color: #a5a5a5;
    }

    &:focus {
      border-bottom: 1px solid #b38add;
      &::placeholder {
        color: #b38add;
      }
    }
  }
`;

export const AddEventFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .add-event-btn {
    height: 40px;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    border: none;
    color: #fff;
    background-color: #b38add;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
      background-color: transparent;
      color: #b38add;
      border: 1px solid #b38add;
    }
  }
`;

export const AddEventButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #878895;
  border: 2px solid #878895;
  opacity: 0.5;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const deleteEvent = styled.button`

`



