import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../../components/header/index.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import "./chat.css";

const SOCKET_URL = "http://localhost:3030";
const API_URL = "http://localhost:3030/v1/journey";
const socket = io(SOCKET_URL);

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [grupo, setGrupo] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const chatEndRef = useRef(null);

  // =============================
  // 1️⃣ Carregar grupo e mensagens
  // =============================
  useEffect(() => {
    const fetchChatRoomAndMessages = async () => {
      try {
        const grupoSalvo = JSON.parse(localStorage.getItem("grupo_atual"));
        if (!grupoSalvo?.id_grupo) {
          console.warn("⚠️ Nenhum grupo encontrado no localStorage");
          setCarregando(false);
          return;
        }

        setGrupo(grupoSalvo);
        setCarregando(true);

        // Buscar a sala de chat do grupo
        const resSala = await fetch(`${API_URL}/chatroom/grupo/${grupoSalvo.id_grupo}`);
        const dataSala = await resSala.json();

        if (dataSala?.sala?.id_chat_room) {
          grupoSalvo.id_chat_room = dataSala.sala.id_chat_room;
          socket.emit("join_room", grupoSalvo.id_chat_room);
          console.log("🔗 Entrou na sala:", grupoSalvo.id_chat_room);

          // Buscar mensagens existentes
          const resMsg = await fetch(`${API_URL}/mensagens`);
          const dataMsg = await resMsg.json();

          if (dataMsg.mensagens) {
            const msgsDaSala = dataMsg.mensagens.filter(
              (m) => m.id_chat_room === grupoSalvo.id_chat_room
            );

            setMensagens(
              msgsDaSala.map((m) => ({
                autor:
                  m.id_usuario === user?.id_usuario
                    ? user?.nome_completo || "Você"
                    : `Usuário ${m.id_usuario}`,
                texto: m.conteudo,
                hora: new Date(m.enviado_em).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }))
            );
          }
        } else {
          console.warn("⚠️ Nenhuma sala de chat encontrada para o grupo:", grupoSalvo.id_grupo);
        }
      } catch (error) {
        console.error("Erro ao carregar sala/mensagens:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchChatRoomAndMessages();

    // =============================
    // 2️⃣ Receber mensagens em tempo real
    // =============================
    socket.on("receive_message", (data) => {
      setMensagens((prev) => [
        ...prev,
        {
          autor:
            data.id_usuario === user?.id_usuario
              ? user?.nome_completo || "Você"
              : `Usuário ${data.id_usuario}`,
          texto: data.conteudo,
          hora: new Date(data.enviado_em).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
      if (grupo?.id_chat_room) socket.emit("leave_room", grupo.id_chat_room);
    };
  }, [user]);

  // =============================
  // 3️⃣ Scroll automático
  // =============================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // =============================
  // 4️⃣ Enviar mensagem
  // =============================
  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim() || !grupo?.id_chat_room) return;

    const novaMensagem = {
      id_chat_room: grupo.id_chat_room,
      id_usuario: user.id_usuario,
      conteudo: mensagem,
    };

    socket.emit("send_message", novaMensagem);

    setMensagens((prev) => [
      ...prev,
      {
        autor: user?.nome_completo || "Você",
        texto: mensagem,
        hora: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMensagem("");
  };

  // =============================
  // 5️⃣ Interface
  // =============================
  if (carregando) return <p>Carregando chat...</p>;
  if (!grupo) return <p>Grupo não encontrado no localStorage.</p>;

  return (
    <div className="chat-page">
      <Sidebar />

      <div className="chat-container">
        <header className="chat-header">
          <div className="chat-header-info">
            <button
              className="btn-voltar"
              onClick={() => navigate("/grupo-home")}
            >
              ←
            </button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Grupo"
              className="chat-avatar"
            />
            <div>
              <h2>{grupo.nome}</h2>
              <span>Chat do grupo</span>
            </div>
          </div>
        </header>

        <div className="chat-messages">
          {mensagens.length > 0 ? (
            mensagens.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.autor === (user?.nome_completo || "Você")
                    ? "sent"
                    : "received"
                }`}
              >
                <div className="chat-bubble">
                  {msg.texto}
                  <div className="chat-time">{msg.hora}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-messages">Nenhuma mensagem ainda.</p>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={enviarMensagem}>
          <input
            type="text"
            placeholder="Digite uma mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit" title="Enviar">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
