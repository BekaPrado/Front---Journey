import React, { useState, useEffect } from "react";
import {
  Container,
  Left,
  Right,
  CalendarWrapper,
  Month,
  Weekdays,
  Days,
  GotoToday,
  TodayDate,
  Events,
  AddEventWrapper,
  AddEventButton,
  AddEventHeader,
  AddEventBody,
  AddEventFooter,
} from "./calendary.js";

import { FaAngleLeft, FaAngleRight, FaPlus, FaTimes, FaCircle } from "react-icons/fa";

const Calendar = () => {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventFrom, setEventFrom] = useState("");
  const [eventTo, setEventTo] = useState("");

  // Salva no localStorage sempre que muda
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }, [eventsArr]);

  // Dias do calendário
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

//seta proximo mes
  const nextMonth = () => {
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  //seta voltar um mes 
  const prevMonth = () => {
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  //clique do dia 
  const gotoToday = () => {
    const current = new Date();
    setToday(current);
    setMonth(current.getMonth());
    setYear(current.getFullYear());
    setActiveDay(current.getDate());
  };

//adicionar evento no calendario 
  const addEvent = () => {
    if (!eventName || !eventFrom || !eventTo) return;

    const newEvent = {
      day: activeDay,
      month,
      year,
      title: eventName,
      from: eventFrom,
      to: eventTo,
    };

    setEventsArr(prev => [...prev, newEvent]);
    setEventName("");
    setEventFrom("");
    setEventTo("");
    setShowAddEvent(false);
  };

  //deletar evento no calendario
  const deleteEvent = (eventToDelete) => {
    setEventsArr(prev =>
      prev.filter(ev =>
        !(
          ev.day === activeDay &&
          ev.month === month &&
          ev.year === year &&
          ev.title === eventToDelete.title &&
          ev.from === eventToDelete.from &&
          ev.to === eventToDelete.to
        )
      )
    );
  };

  const eventsForActiveDay = eventsArr.filter(
    ev => ev.day === activeDay && ev.month === month && ev.year === year
  );

  // Renderização de dias
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const prevMonthDays = getDaysInMonth(month === 0 ? 11 : month - 1, month === 0 ? year - 1 : year);

    const daysArray = [];

    // Dias anteriores
    for (let i = firstDay; i > 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="day prev-date">
          {prevMonthDays - i + 1}
        </div>
      );
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isActive = i === activeDay;

      const hasEvent = eventsArr.some(
        ev => ev.day === i && ev.month === month && ev.year === year
      );

      daysArray.push(
        <div
          key={i}
          className={`day ${isToday ? "today" : ""} ${isActive ? "active" : ""}`}
          onClick={() => setActiveDay(i)}
        >
          {i}
          {hasEvent && <FaCircle className="event-indicator" size={8} />}
        </div>
      );
    }

    return daysArray;
  };
  return (


    
    <Container>
      <Left>
        <CalendarWrapper>
          <Month>
            <FaAngleLeft onClick={prevMonth} className="prev" />
            <div className="date">{months[month]} {year}</div>
            <FaAngleRight onClick={nextMonth} className="next" />
          </Month>

          <Weekdays>
            <div>Dom.</div><div>Seg.</div><div>Ter.</div>
            <div>Qua.</div><div>Qui.</div><div>Sex.</div><div>Sab.</div>
          </Weekdays>

          <Days>{renderDays()}</Days>

          <GotoToday>
            <button className="today-btn" onClick={gotoToday}>Today</button>
          </GotoToday>
        </CalendarWrapper>
      </Left>

      <Right>
        <TodayDate>
          <div className="event-day">
            {new Date(year, month, activeDay).toLocaleDateString("pt-br", { weekday: "long" })}
          </div>
          <div className="event-date">{activeDay} {months[month]} {year}</div>
        </TodayDate>

        <Events>
          {eventsForActiveDay.length > 0 ? (
            eventsForActiveDay.map((ev, idx) => (
              <div key={idx} className="event">
                <div className="title">
                  <FaCircle size={8} />
                  <span className="event-title">{ev.title}</span>
                </div>
                <div className="event-time">{ev.from} - {ev.to}</div>
                
                <deleteEvent>
                <button className="delete" onClick={() => deleteEvent(ev)}>Delete</button>
                </deleteEvent>
              
              </div>
            ))
          ) : (
            <div className="no-event">Sem eventos</div>
          )}
        </Events>

        <AddEventWrapper className={showAddEvent ? "active" : ""}>
          <AddEventHeader>
            <div className="title">Adicionar Evento</div>
            <FaTimes className="close" onClick={() => setShowAddEvent(false)} />
          </AddEventHeader>
          <AddEventBody>
            <input
              type="text"
              placeholder="Nome do Evento"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
            />
            <input
              type="time"
              placeholder="Hora do Evento"
              value={eventFrom}
              onChange={e => setEventFrom(e.target.value)}
            />
            <input
              type="url"
              placeholder="Link"
              value={eventTo}
              onChange={e => setEventTo(e.target.value)}
            />
          </AddEventBody>
          <AddEventFooter>
            <button className="add-event-btn" onClick={addEvent}>Adicionar Evento</button>
          </AddEventFooter>
        </AddEventWrapper>
      </Right>

      <AddEventButton onClick={() => setShowAddEvent(true)}>
        <FaPlus />
      </AddEventButton>
    </Container>
  );
};

export default Calendar;