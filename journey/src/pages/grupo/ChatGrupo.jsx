import { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import axios from "axios";

export default function ChatGrupo({ idGrupo }) {
  const socket = useSocket();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const sala = `grupo:${idGrupo}`;
    socket.emit("join_room", sala);

    socket.on("receive_message", (msg) => {
      if (msg.chatId === sala) {
        setMensagens((prev) => [...prev, msg]);
      }
    });

    // (futuro) buscar mensagens do backend
    axios
      .get(`http://localhost:8080/v1/chat/grupo/${idGrupo}`)
      .then((res) => setMensagens(res.data))
      .catch(() => console.log("Aguardando backend..."));

    return () => {
      socket.off("receive_message");
    };
  }, [idGrupo, socket]);

  const enviarMensagem = () => {
    if (!texto.trim()) return;

    const msg = {
      chatId: `grupo:${idGrupo}`,
      conteudo: texto,
      userId: usuario?.id_usuario ?? 1,
      userName: usuario?.nome_completo ?? "Usuário",
      enviado_em: new Date().toISOString(),
    };

    socket.emit("send_message", msg);
    setMensagens((prev) => [...prev, msg]);
    setTexto("");
  };

  return (
    <div className="chat-grupo">
      <div className="mensagens">
        {mensagens.map((m, i) => (
          <p key={i}>
            <strong>{m.userName}:</strong> {m.conteudo}
          </p>
        ))}
      </div>

      <div className="input-chat">
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>
    </div>
  );
}
