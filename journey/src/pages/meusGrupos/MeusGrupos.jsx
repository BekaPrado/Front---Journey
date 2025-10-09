import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "../../pages/meusGrupos/meusGrupos.css";

const BASE_URL = "http://localhost:8080/v1/journey";

export default function MeusGrupos() {
  const [gruposCriados, setGruposCriados] = useState([]);
  const [gruposParticipando, setGruposParticipando] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("journey_user"));
    if (!usuario?.id_usuario) {
      setLoading(false);
      return;
    }

    async function buscarGrupos() {
      try {
        const [criadosResp, participandoResp] = await Promise.all([
          fetch(`${BASE_URL}/usuario/${usuario.id_usuario}/grupos-criados`),
          fetch(`${BASE_URL}/usuario/${usuario.id_usuario}/grupos-participando`)
        ]);

        const criadosData = await criadosResp.json();
        const participandoData = await participandoResp.json();

        setGruposCriados(criadosData.grupos || []);
        setGruposParticipando(participandoData.grupos || []);
      } catch (err) {
        console.error("Erro ao buscar grupos:", err);
      } finally {
        setLoading(false);
      }
    }

    buscarGrupos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="homepage" style={{ display: "flex" }}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <h1 className="home-title">Meus Grupos</h1>

          <section>
            <h2>Grupos que Criei</h2>
            <div className="cards-container">
              {gruposCriados.length > 0 ? (
                gruposCriados.map((g) => (
                  <div
                    key={g.id_grupo}
                    className="card"
                    onClick={() => navigate(`/grupo/${g.id_grupo}`, { state: { grupo: g } })}
                  >
                    <img src={g.imagem} alt={g.nome} />
                    <h3>{g.nome}</h3>
                    <p>{g.descricao}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum grupo criado.</p>
              )}
            </div>
          </section>

          <section>
            <h2>Grupos que Participo</h2>
            <div className="cards-container">
              {gruposParticipando.length > 0 ? (
                gruposParticipando.map((g) => (
                  <div
                    key={g.id_grupo}
                    className="card"
                    onClick={() => navigate(`/grupo/${g.id_grupo}`, { state: { grupo: g } })}
                  >
                    <img src={g.imagem} alt={g.nome} />
                    <h3>{g.nome}</h3>
                    <p>{g.descricao}</p>
                  </div>
                ))
              ) : (
                <p>Você ainda não participa de nenhum grupo.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
