import React, { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../../components/header/index.jsx"
import "./areaGrupo.css"

export default function AreaGrupo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [grupo, setGrupo] = useState(state || null)
  const [mensagens, setMensagens] = useState([])
  const [novaMensagem, setNovaMensagem] = useState("")

  const BASE_URL = "http://localhost:8080/v1/journey"

  // 🔹 Caso a navegação não tenha vindo com o state, buscamos o grupo pelo ID
  useEffect(() => {
    if (!grupo) {
      fetch(`${BASE_URL}/group/${id}`)
        .then((r) => r.json())
        .then((data) => setGrupo(data.grupo))
        .catch((err) => console.error("Erro ao carregar grupo:", err))
    }
  }, [id, grupo])

  // 🔹 Placeholder de mensagens (em breve virá do Socket.io)
  useEffect(() => {
    // futuramente: fetch histórico ou conectar socket
    setMensagens([
      { id: 1, usuario: "Admin", texto: "Bem-vindo ao chat do grupo!" },
      { id: 2, usuario: "Maria", texto: "Oi pessoal!" },
    ])
  }, [])

  const handleEnviar = () => {
    if (!novaMensagem.trim()) return
    const msg = {
      id: mensagens.length + 1,
      usuario: "Você",
      texto: novaMensagem.trim(),
    }
    setMensagens([...mensagens, msg])
    setNovaMensagem("")
  }

  return (
    <div className="areaGrupo-page">
      <Sidebar />

      <main className="areaGrupo-main">
        <header className="grupo-header">
          <button className="voltar-btn" onClick={() => navigate("/home")}>
            ← Voltar
          </button>
          <div className="grupo-info-top">
            <img
              src={grupo?.imagem || "https://cdn-icons-png.flaticon.com/512/2965/2965879.png"}
              alt="Grupo"
              className="grupo-avatar"
            />
            <div>
              <h2>{grupo?.nome || "Grupo"}</h2>
              <p>{grupo?.descricao || "Descrição não disponível."}</p>
            </div>
          </div>
        </header>

        <section className="chat-section">
          <div className="chat-box">
            {mensagens.map((m) => (
              <div
                key={m.id}
                className={`chat-msg ${m.usuario === "Você" ? "me" : ""}`}
              >
                <strong>{m.usuario}: </strong>
                <span>{m.texto}</span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
            />
            <button onClick={handleEnviar}>Enviar</button>
          </div>
        </section>
      </main>
    </div>
  )
}
