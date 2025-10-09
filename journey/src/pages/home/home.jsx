import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/header/index.jsx";
import "../../pages/home/home.css";

const BASE_URL = "http://localhost:8080/v1/journey";

export default function Home() {
  const [grupos, setGrupos] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarGrupos() {
      try {
        const resp = await fetch(`${BASE_URL}/group`);
        const data = await resp.json();
        setGrupos(data.grupos || []);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }
    buscarGrupos();
  }, []);

  return (
    <div className={`homepage ${darkMode ? "dark" : ""}`} style={{ display: "flex" }}>
      <Sidebar isCollapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="container-home">
          <header className="page-header">
            <h1 className="home-title">Grupos Disponíveis</h1>
          </header>

          <div className="cards-container">
            {grupos.length > 0 ? (
              grupos.map((g) => (
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
              <p>Nenhum grupo encontrado.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
