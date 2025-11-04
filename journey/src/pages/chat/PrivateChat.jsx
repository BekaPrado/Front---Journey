// src/pages/chat/PrivateChat.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "../grupo/grupoBase.css";
import "../grupo/chat/chat.css";

const SOCKET_URL = "http://localhost:3030";
const API_URL = "http://localhost:3030/v1/journey";
const socket = io(SOCKET_URL);
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function PrivateChat() {
  const { id_usuario: idUsuarioDestinoParam } = useParams();
  const idUsuarioDestino = Number(idUsuarioDestinoParam);
  const navigate = useNavigate();
  const { user: me } = useAuth();

  const [contato, setContato] = useState(null);
  const [idChatRoom, setIdChatRoom] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const chatEndRef = useRef(null);

  // Buscar dados do contato
  useEffect(() => {
    async function fetchContato() {
      try {
        const res = await fetch(`${API_URL}/usuario/${idUsuarioDestino}`);
        const data = await res.json();
        const u = Array.isArray(data?.usuario) ? data.usuario[0] : data?.usuario || null;
        setContato(u);
      } catch (e) {
        setContato(null);
      }
    }
    if (idUsuarioDestino) fetchContato();
  }, [idUsuarioDestino]);

  // Criar/obter sala privada
  useEffect(() => {
    async function obterOuCriarSalaPrivada(id_usuario1, id_usuario2) {
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

          // histórico
          const mensagensRes = await fetch(`${API_URL}/chatroom/${idSala}/mensagens`);
          const mensagensData = await mensagensRes.json();
          if (mensagensData?.mensagens) {
            const formatadas = mensagensData.mensagens.map((m) => ({
              id_chat_room: m.id_chat_room,
              id_usuario: m.id_usuario,
              conteudo: m.conteudo,
              autor: m.usuario?.nome_completo || "Usuário",
              avatar: m.usuario?.foto_perfil || DEFAULT_AVATAR,
              hora: new Date(m.enviado_em).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }));
            setMensagens(formatadas);
          }
        }
      } catch (e) {
        console.error("Erro criar/obter sala privada:", e);
      }
    }

    if (me?.id_usuario && idUsuarioDestino && me.id_usuario !== idUsuarioDestino) {
      obterOuCriarSalaPrivada(me.id_usuario, idUsuarioDestino);
    }
  }, [me?.id_usuario, idUsuarioDestino]);

  // Receber mensagens
  useEffect(() => {
    function onReceive(data) {
      const normalizada = {
        id_chat_room: data.id_chat_room,
        id_usuario: data.id_usuario ?? data.userId ?? data.usuario_id,
        conteudo: data.conteudo ?? data.texto ?? "",
        autor: data.autor ?? data.userName ?? (data.usuario?.nome_completo || "Usuário"),
        avatar: data.avatar ?? data.usuario?.foto_perfil ?? DEFAULT_AVATAR,
        hora:
          data.hora ||
          (data.enviado_em
            ? new Date(data.enviado_em).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })),
      };

      setMensagens((prev) => {
        if (!prev.some((m) => m.hora === normalizada.hora && m.conteudo === normalizada.conteudo && String(m.id_usuario) === String(normalizada.id_usuario))) {
          return [...prev, normalizada];
        }
        return prev;
      });
    }

    socket.on("receive_message", onReceive);
    return () => socket.off("receive_message", onReceive);
  }, []);

  // Enviar mensagem
  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim() || !idChatRoom) return;

    const nova = {
      id_chat_room: idChatRoom,
      id_usuario: me.id_usuario,
      conteudo: mensagem,
      autor: me?.nome_completo || "Você",
      avatar: me?.foto_perfil || DEFAULT_AVATAR,
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("send_message", nova);
    setMensagem("");
  };

  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  return (
    <DashboardLayout noPadding showRight={false}>
      <div className="chat-layout">
        <section className="chat-wrapper full">
          <div className="chat-header">
            <button className="btn-voltar" onClick={() => navigate(-1)}>
              ← Voltar
            </button>
            <div>
              <h1>{contato?.nome_completo || "Conversa privada"}</h1>
              <p>Conversa privada</p>
            </div>
          </div>

          <div className="chat-box">
            {mensagens.length === 0 && (
              <div className="sem-mensagens">
                <p>Nenhuma mensagem ainda. Inicie a conversa!</p>
              </div>
            )}

            {mensagens.map((m, i) => (
              <div key={i} className={`mensagem ${String(m.id_usuario) === String(me.id_usuario) ? "minha" : "outro"}`}>
                <img className="avatar" src={m.avatar || DEFAULT_AVATAR} alt={m.autor} />
                <div className="mensagem-bubble">
                  <div className="mensagem-topo">
                    <strong className="autor-link" style={{ cursor: 'pointer' }}>
                      {m.autor}
                    </strong>
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
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
