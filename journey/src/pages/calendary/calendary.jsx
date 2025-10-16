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
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventFrom, setEventFrom] = useState("");
  const [eventTo, setEventTo] = useState("");
  const [eventDescription, setEventDesc] = useState("");

  // ====== Buscar eventos da API ======
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/v1/journey/calendario");
        if (!res.ok) throw new Error("Erro ao buscar eventos");
        const data = await res.json();
        console.log("Resposta da API:", data);

        const events = Array.isArray(data) ? data : data.data || [];
        setEventsArr(events);
      } catch (error) {
        console.error("Falha ao carregar eventos:", error);
        setEventsArr([]);
      }
    };
    fetchEvents();
  }, []);

  // ====== Navegação ======
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const nextMonth = () => {
    setMonth(prev => {
      if (prev === 11) {
        setYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const prevMonth = () => {
    setMonth(prev => {
      if (prev === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const gotoToday = () => {
    const current = new Date();
    setToday(current);
    setMonth(current.getMonth());
    setYear(current.getFullYear());
    setActiveDay(current.getDate());
  };

  // ====== Adicionar evento (POST na API) ======
  const addEvent = async () => {
    if (!eventName || !eventFrom || !eventTo || !eventDescription) {
      alert("Preencha todos os campos antes de adicionar o evento!");
      return;
    }

    const startDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(activeDay).padStart(2, "0")}T${eventFrom}:00`;
    const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(activeDay).padStart(2, "0")}T${eventTo}:00`;

    const newEvent = {
      titulo: eventName,
      descricao: eventDescription,
      data_inicio: startDate,
      data_fim: endDate,
    };

    console.log("Enviando evento:", newEvent);

    try {
      const res = await fetch("http://localhost:8080/v1/journey/calendario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const responseText = await res.text();
      console.log("Resposta do servidor:", responseText);

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

      const created = JSON.parse(responseText);
      setEventsArr(prev => [...prev, created]);
      setEventName("");
      setEventFrom("");
      setEventTo("");
      setEventDesc("");
      setShowAddEvent(false);
    } catch (error) {
      console.error("Falha ao adicionar evento:", error);
      alert("Erro ao adicionar evento. Verifique os campos e tente novamente.");
    }
  };

  // ====== Deletar evento ======
  const deleteEvent = async (eventToDelete) => {
    try {
      await fetch(`http://localhost:8080/v1/journey/calendario/${eventToDelete.id}`, {
        method: "DELETE",
      });
      setEventsArr(prev => prev.filter(ev => ev.id !== eventToDelete.id));
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  };

  // ====== Filtro dos eventos do dia ======
  const eventsForActiveDay = eventsArr.filter(ev => {
    const eventDate = new Date(ev.data_inicio);
    return (
      eventDate.getDate() === activeDay &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });

  // ====== Renderização dos dias ======
  const renderDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const prevMonthDays = getDaysInMonth(
      month === 0 ? 11 : month - 1,
      month === 0 ? year - 1 : year
    );

    const daysArray = [];

    for (let i = firstDay; i > 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="day prev-date">
          {prevMonthDays - i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isActive = i === activeDay;

      const hasEvent = eventsArr.some(ev => {
        const evDate = new Date(ev.data_inicio);
        return (
          evDate.getDate() === i &&
          evDate.getMonth() === month &&
          evDate.getFullYear() === year
        );
      });

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
            <button className="today-btn" onClick={gotoToday}>Hoje</button>
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
                  <span className="event-title">{ev.titulo}</span>
                </div>
                <div className="event-time">
                  {new Date(ev.data_inicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                  {new Date(ev.data_fim).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <button className="delete" onClick={() => deleteEvent(ev)}>Excluir</button>
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
              placeholder="Início"
              value={eventFrom}
              onChange={e => setEventFrom(e.target.value)}
            />
            <input
              type="time"
              placeholder="Fim"
              value={eventTo}
              onChange={e => setEventTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={eventDescription}
              onChange={e => setEventDesc(e.target.value)}
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
