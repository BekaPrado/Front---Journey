import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "../../pages/home/home.css";

const BASE_URL = "http://localhost:8080/v1/journey";

export default function Grupo() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState(location.state?.grupo || null);
  const [membrosCount, setMembrosCount] = useState(0);
  const [usuario, setUsuario] = useState(null);
  const [relacao, setRelacao] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("journey_user"));
    setUsuario(user);

    if (!grupo) {
      buscarGrupoPorId(id);
    } else {
      buscarContagem(grupo.id_grupo);
      verificarRelacao(user, grupo);
    }
  }, [grupo, id]);

  async function buscarGrupoPorId(groupId) {
    try {
      const resp = await fetch(`${BASE_URL}/group/${groupId}`);
      const data = await resp.json();
      if (data?.grupo) {
        setGrupo(data.grupo);
        buscarContagem(data.grupo.id_grupo);
        verificarRelacao(usuario, data.grupo);
      }
    } catch (error) {
      console.error("Erro ao buscar grupo:", error);
    }
  }

  async function buscarContagem(idGrupo) {
    try {
      const resp = await fetch(`${BASE_URL}/group/${idGrupo}/participantes`);
      const data = await resp.json();
      if (data?.total !== undefined) setMembrosCount(data.total);
    } catch (err) {
      console.error("Erro ao buscar contagem de participantes:", err);
    }
  }

  async function verificarRelacao(user, grupo) {
    if (!user || !grupo) return;
    try {
      if (grupo.id_usuario === user.id_usuario) {
        setRelacao("criador");
        return;
      }
      const resp = await fetch(`${BASE_URL}/usuario-grupo`);
      const data = await resp.json();
      const participa = data.usuarios_grupos?.some(
        (ug) => ug.id_usuario === user.id_usuario && ug.id_grupo === grupo.id_grupo
      );
      setRelacao(participa ? "participante" : "nenhum");
    } catch {
      setRelacao("nenhum");
    }
  }

  async function entrarGrupo() {
    await fetch(`${BASE_URL}/usuario-grupo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: usuario.id_usuario, id_grupo: grupo.id_grupo }),
    });
    setRelacao("participante");
    buscarContagem(grupo.id_grupo);
  }

  async function sairGrupo() {
    const resp = await fetch(`${BASE_URL}/usuario-grupo`);
    const data = await resp.json();
    const rel = data.usuarios_grupos.find(
      (ug) => ug.id_usuario === usuario.id_usuario && ug.id_grupo === grupo.id_grupo
    );
    if (rel) {
      await fetch(`${BASE_URL}/usuario-grupo/${rel.id_usuario_grupo}`, { method: "DELETE" });
      setRelacao("nenhum");
      buscarContagem(grupo.id_grupo);
    }
  }

  async function excluirGrupo() {
    await fetch(`${BASE_URL}/group/${grupo.id_grupo}`, { method: "DELETE" });
    navigate(-1);
  }

  function renderBotao() {
    if (relacao === "criador") {
      return (
        <div className="group-actions">
          <button className="btn btn-primary" onClick={() => navigate(`/criarGrupo`, { state: { grupo } })}>
            Editar grupo
          </button>
          <button className="btn btn-danger" onClick={excluirGrupo}>Excluir grupo</button>
        </div>
      );
    }
    if (relacao === "participante") {
      return <button className="btn btn-danger" onClick={sairGrupo}>Sair do grupo</button>;
    }
    return <button className="btn btn-primary" onClick={entrarGrupo}>Entrar no grupo</button>;
  }

  if (!grupo) return <p>Carregando grupo...</p>;

  return (
    <div className="homepage" style={{ display: "flex" }}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <header className="page-header">
            <h1 className="home-title">{grupo.nome}</h1>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>← Voltar</button>
          </header>

          <section className="big-card">
            <img src={grupo.imagem} alt={grupo.nome} className="group-img" />
            <p>{grupo.descricao}</p>
            <p><strong>Membros:</strong> {membrosCount}</p>
            <div style={{ marginTop: "20px" }}>{renderBotao()}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
