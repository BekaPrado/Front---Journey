import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../grupo/chat/chat.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3030/v1/journey";
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ChatContacts() {
  const { user: me } = useAuth();
  const navigate = useNavigate();
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchConversas() {
      try {
        const res = await fetch(`${API_URL}/usuario/${me?.id_usuario}/conversas-privadas`);
        const data = await res.json();
        if (cancelled) return;
        const lista = Array.isArray(data?.conversas) ? data.conversas : [];
        const normalizadas = lista.map((c) => {
          const contato = c?.contato || c?.usuario || {};
          return {
            id_chat_room: c.id_chat_room || c.chat_room_id || null,
            contato_id: contato.id_usuario || contato.id || null,
            nome: contato.nome_completo || contato.nome || "Contato",
            avatar: contato.foto_perfil || DEFAULT_AVATAR,
            ultima_mensagem: c.ultima_mensagem || c.last_message || "",
            atualizado_em: c.atualizado_em || c.updated_at || c.enviado_em || null,
          };
        });
        setConversas(normalizadas);
      } catch (e) {
        setConversas([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (me?.id_usuario) fetchConversas();
    return () => { cancelled = true; };
  }, [me?.id_usuario]);

  const filtradas = conversas.filter((c) =>
    c.nome.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h3>Contatos</h3>
        <input
          className="chat-search"
          placeholder="Pesquisar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="chat-contacts">
        {loading && <div className="sem-mensagens"><p>Carregando...</p></div>}
        {!loading && filtradas.length === 0 && (
          <div className="sem-mensagens"><p>Nenhum contato encontrado</p></div>
        )}
        {!loading && filtradas.map((c, idx) => (
          <div
            key={`${c.id_chat_room || idx}`}
            className="contact-item"
            onClick={() => c.contato_id && navigate(`/chat/privado/${c.contato_id}`)}
          >
            <img src={c.avatar || DEFAULT_AVATAR} alt={c.nome} />
            <div>
              <div className="top">
                <span className="name">{c.nome}</span>
                {c.atualizado_em && (
                  <span className="time">{new Date(c.atualizado_em).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                )}
              </div>
              <div className="preview">{c.ultima_mensagem}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
