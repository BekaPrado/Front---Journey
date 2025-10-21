// src/pages/calendary/calendary.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/header/index.jsx";
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
  AddEventHeader,
  AddEventBody,
  AddEventFooter,
  AddEventCardButton
} from "./calendary.js";
import {
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
  FaTimes,
  FaCircle
} from "react-icons/fa";
import "./calendary.js";

const Calendar = () => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // ===== Sidebar e tema =====
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
  };

  // ===== Estados do calendário =====
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);

  // ===== Modal evento =====
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventFrom, setEventFrom] = useState("");
  const [eventDescription, setEventDesc] = useState("");

  // ===== Funções de navegação =====
  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const gotoToday = () => {
    const current = new Date();
    setToday(current);
    setMonth(current.getMonth());
    setYear(current.getFullYear());
    setActiveDay(current.getDate());
  };

  // ===== Buscar eventos da API =====
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:8080/v1/journey/calendario");
      if (!res.ok) throw new Error("Erro ao buscar eventos");
      const data = await res.json();
      const events = Array.isArray(data.Calendario) ? data.Calendario : [];
      setEventsArr(events);
    } catch (error) {
      console.error("Falha ao carregar eventos:", error);
      setEventsArr([]);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // ===== Adicionar evento =====
  const addEvent = async () => {
    const groupData = localStorage.getItem("group_id");
    let id_grupo = NaN;

    if (groupData) {
      try {
        id_grupo = JSON.parse(groupData).id_grupo;
      } catch (err) {
        console.error("Erro ao parsear localStorage:", err);
      }
    }

    if (!id_grupo || isNaN(id_grupo))
      return alert("ID do grupo inválido! valor atual: " + groupData);

    if (!eventName || eventName.length > 100)
      return alert("Preencha um nome válido!");
    if (!eventFrom) return alert("Preencha um horário de início válido!");
    if (!eventDescription) return alert("Preencha a descrição!");
    if (!eventLink || eventLink.length > 500)
      return alert("Preencha um link válido!");

    const startDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      activeDay
    ).padStart(2, "0")}T${eventFrom}:00`;

    const newEvent = {
      nome_evento: eventName,
      descricao: eventDescription,
      data_evento: startDate,
      link: eventLink,
      id_grupo: id_grupo,
    };

    try {
      const res = await fetch("http://localhost:8080/v1/journey/calendario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

      await fetchEvents();
      setEventName("");
      setEventFrom("");
      setEventDesc("");
      setEventLink("");
      setShowAddEvent(false);
    } catch (error) {
      console.error("Falha ao adicionar evento:", error);
      alert("Erro ao adicionar evento. Verifique os campos e tente novamente.");
    }
  };

  // ===== Deletar evento =====
  const deleteEvent = async (eventToDelete) => {
    const id = Number(eventToDelete.id_calendario);
    if (!id) return alert("ID do evento inválido!");
    try {
      const res = await fetch(`http://localhost:8080/v1/journey/calendario/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Erro ao deletar evento: ${res.status}`);
      setEventsArr(prev => prev.filter(ev => ev.id_calendario !== id));
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      alert("Falha ao deletar o evento.");
    }
  };

  // ===== Eventos do dia =====
  const eventsForActiveDay = eventsArr.filter(ev => {
    const eventDate = new Date(ev.data_evento);
    return (
      eventDate.getDate() === activeDay &&
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  });

  // ===== Renderizar dias =====
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
        const evDate = new Date(ev.data_evento);
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
          {i} {hasEvent && <FaCircle className="event-indicator" size={8} />}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <div className={`calendar-page ${darkMode ? "dark" : ""}`}>
      {/* Sidebar fixa à esquerda */}
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Conteúdo principal */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <Container>
          <Left>
            <CalendarWrapper>
              <Month>
                <FaAngleLeft className="prev" onClick={prevMonth} />
                <div className="date">{months[month]} {year}</div>
                <FaAngleRight className="next" onClick={nextMonth} />
              </Month>
              <Weekdays>
                {["Dom.","Seg.","Ter.","Qua.","Qui.","Sex.","Sab."].map((d,i)=><div key={i}>{d}</div>)}
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
                      <span className="event-title">{ev.nome_evento}</span>
                    </div>
                    <div className="event-time">
                      {new Date(ev.data_evento).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <button className="delete" onClick={() => deleteEvent(ev)}>Excluir</button>
                  </div>
                ))
              ) : (
                <div className="no-event">Sem eventos</div>
              )}

              <AddEventCardButton onClick={() => setShowAddEvent(true)}>
                <FaPlus />
              </AddEventCardButton>
            </Events>

            <AddEventWrapper className={showAddEvent ? "active" : ""}>
              <AddEventHeader>
                <div className="title">Adicionar Evento</div>
                <FaTimes className="close" onClick={() => setShowAddEvent(false)} />
              </AddEventHeader>
              <AddEventBody>
                <input type="text" placeholder="Nome do Evento" value={eventName} onChange={e => setEventName(e.target.value)} />
                <input type="time" placeholder="Horário de Início" value={eventFrom} onChange={e => setEventFrom(e.target.value)} />
                <input type="url" placeholder="Link" value={eventLink} onChange={e => setEventLink(e.target.value)} />
                <input type="text" placeholder="Descrição" value={eventDescription} onChange={e => setEventDesc(e.target.value)} />
              </AddEventBody>
              <AddEventFooter>
                <button className="add-event-btn" onClick={addEvent}>Adicionar Evento</button>
              </AddEventFooter>
            </AddEventWrapper>
          </Right>
        </Container>
      </main>
    </div>
  );
};

export default Calendar;
