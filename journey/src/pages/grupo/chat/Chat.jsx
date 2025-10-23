// src/pages/grupo/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../../components/header/index.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import "../grupoBase.css";
import "./chat.css";

const SOCKET_URL = "http://localhost:3030";
const API_URL = "http://localhost:3030/v1/journey";
const socket = io(SOCKET_URL);
const STORAGE_KEY = "journey_grupo_atual";

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [idChatRoom, setIdChatRoom] = useState(null);
  const chatEndRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ------------------------------
  // Carrega o grupo ou sala privada
  // ------------------------------
  useEffect(() => {
    const grupoSalvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!grupoSalvo) {
      navigate("/home", { replace: true });
      return;
    }

    setGrupo(grupoSalvo);
    setMensagens([]); // limpa mensagens antigas

    if (grupoSalvo.tipo_chat === "privado") {
      obterOuCriarSalaPrivada(user.id_usuario, grupoSalvo.id_usuario_destino);
    } else {
      buscarSalaDeGrupo(grupoSalvo.id_grupo);
    }
  }, [navigate, user.id_usuario]);

  // ------------------------------
  // Recebe mensagens via socket
  // ------------------------------
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMensagens((prev) => {
        // evita duplicação
        if (!prev.some((m) => m.hora === data.hora && m.conteudo === data.conteudo && m.id_usuario === data.id_usuario)) {
          return [...prev, data];
        }
        return prev;
      });
    });

    return () => socket.off("receive_message");
  }, []);

  // ------------------------------
  // Busca sala de grupo e histórico
  // ------------------------------
  const buscarSalaDeGrupo = async (id_grupo) => {
    try {
      const res = await fetch(`${API_URL}/group/chat-room/${id_grupo}`);
      const data = await res.json();

      if (data?.grupo?.chat_rooms?.length > 0) {
        const sala = data.grupo.chat_rooms[0];
        setIdChatRoom(sala.id_chat_room);

        socket.emit("join_room", sala.id_chat_room);
        console.log("Entrou na sala:", sala.id_chat_room);

        // busca histórico de mensagens
        if (sala.id_chat_room) {
          const mensagensRes = await fetch(`${API_URL}/chatroom/${sala.id_chat_room}/mensagens`);
          const mensagensData = await mensagensRes.json();
          if (mensagensData?.mensagens) {
            setMensagens(mensagensData.mensagens);
          }
        }
      } else {
        console.warn("Nenhuma sala encontrada para o grupo");
      }
    } catch (error) {
      console.error("Erro buscarSalaDeGrupo:", error);
    }
  };

  // ------------------------------
  // Cria ou obtém sala privada e histórico
  // ------------------------------
  const obterOuCriarSalaPrivada = async (id_usuario1, id_usuario2) => {
    try {
      const res = await fetch(`${API_URL}/chat-room/privado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario1, id_usuario2 }),
      });
      const data = await res.json();

      if (data?.sala?.id_chat_room) {
        const idSala = data.sala.id_chat_room;
        setIdChatRoom(idSala);
        socket.emit("join_room", idSala);

        // busca histórico de mensagens
        const mensagensRes = await fetch(`${API_URL}/chatroom/${idSala}/mensagens`);
        const mensagensData = await mensagensRes.json();
        if (mensagensData?.mensagens) {
          setMensagens(mensagensData.mensagens);
        }
      }
    } catch (error) {
      console.error("Erro obterOuCriarSalaPrivada:", error);
    }
  };

  // ------------------------------
  // Enviar mensagem
  // ------------------------------
  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim() || !idChatRoom) return;

    const novaMensagem = {
      id_chat_room: idChatRoom,
      id_usuario: user.id_usuario,
      conteudo: mensagem,
      autor: user?.nome_completo || "Você",
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("send_message", novaMensagem);
    setMensagem(""); // limpa input
  };

  // ------------------------------
  // Scroll automático
  // ------------------------------
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // ------------------------------
  // Renderização
  // ------------------------------
  return (
    <div className="grupo-page">
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-area ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="chat-wrapper">
          <div className="chat-header">
            <button className="btn-voltar" onClick={() => navigate("/grupo-home")}>
              ← Voltar
            </button>
            <div>
              <h1>{grupo?.nome || "Chat"}</h1>
              <p>{grupo?.tipo_chat === "privado" ? "Conversa privada" : "Chat do grupo"}</p>
            </div>
          </div>

          <div className="chat-box">
            {mensagens.length === 0 && (
              <div className="sem-mensagens">
                <p>Nenhuma mensagem ainda. Inicie a conversa!</p>
              </div>
            )}

            {mensagens.map((m, i) => (
              <div
                key={i}
                className={`mensagem ${m.id_usuario === user.id_usuario ? "minha" : "outro"}`}
              >
                <div className="mensagem-bubble">
                  <div className="mensagem-topo">
                    <strong>{m.autor}</strong>
                    <span className="hora">{m.hora}</span>
                  </div>
                  <p>{m.conteudo}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form className="chat-input" onSubmit={enviarMensagem}>
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite uma mensagem..."
            />
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
