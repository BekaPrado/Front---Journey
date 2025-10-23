// src/pages/grupo/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "../../../components/header/index.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import "../grupoBase.css";
import "./chat.css";

const SOCKET_URL = "http://localhost:3030";
const socket = io(SOCKET_URL);
const STORAGE_KEY = "journey_grupo_atual";

export default function Chat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const chatEndRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const grupoSalvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!grupoSalvo) {
      navigate("/home", { replace: true });
      return;
    }
    setGrupo(grupoSalvo);
    socket.emit("join_room", grupoSalvo.id_grupo);
  }, [navigate]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMensagens((prev) => [...prev, data]);
    });
    return () => socket.off("receive_message");
  }, []);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = {
      autor: user?.nome_completo || "Você",
      texto: mensagem,
      hora: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      id_grupo: grupo.id_grupo,
    };

    socket.emit("send_message", novaMensagem);
    setMensagens((prev) => [...prev, novaMensagem]);
    setMensagem("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  return (
    <div className="grupo-page">
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-area ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="chat-wrapper">
          <div className="chat-header">
            <button className="btn-voltar" onClick={() => navigate("/grupo-home")}>
              ← Voltar
            </button>
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
                className={`mensagem ${
                  m.autor === user?.nome_completo ? "minha" : "outro"
                }`}
              >
                <div className="mensagem-bubble">
                  <div className="mensagem-topo">
                    <strong>{m.autor}</strong>
                    <span className="hora">{m.hora}</span>
                  </div>
                  <p>{m.texto}</p>
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
