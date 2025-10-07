import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const BASE_USER = "http://localhost:8080/v1/journey/usuario";

  // carrega dados do usuário logado (localStorage)
  useEffect(() => {
    const raw = localStorage.getItem("journey_user");
    if (!raw) {
      alert("Usuário não logado!");
      navigate("/auth");
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setUserData(parsed);
    } catch (err) {
      console.error("Erro ao parsear journey_user:", err);
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((s) => ({ ...s, [name]: value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserData((s) => ({ ...s, foto_perfil: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleLogout() {
    localStorage.removeItem("journey_user");
    navigate("/auth");
  }

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  async function handleSave() {
    if (!userData || !userData.id_usuario) {
      alert("Usuário inválido.");
      return;
    }

    if (!userData.nome_completo || !userData.email) {
      alert("Preencha nome e e-mail.");
      return;
    }

    if (userData.senha && userData.senha.length > 0) {
      if (!userData.senha_confirm || userData.senha !== userData.senha_confirm) {
        alert("As senhas não conferem.");
        return;
      }
      if (userData.senha.length < 6) {
        alert("Senha precisa ter ao menos 6 caracteres.");
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        nome_completo: userData.nome_completo,
        email: userData.email,
        senha:
          userData.senha && userData.senha.length > 0
            ? userData.senha
            : undefined,
        data_nascimento: userData.data_nascimento || null,
        descricao: userData.descricao || null,
        foto_perfil: userData.foto_perfil || null,
        tipo_usuario: userData.tipo_usuario || "Estudante",
      };

      Object.keys(payload).forEach((k) => {
        if (typeof payload[k] === "undefined") delete payload[k];
      });

      const token =
        localStorage.getItem("token") || localStorage.getItem("journey_token");

      const resp = await fetch(`${BASE_USER}/${userData.id_usuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error("PUT perfil erro:", resp.status, text);
        throw new Error(`Erro ${resp.status}`);
      }

      const resJson = await resp.json();
      console.log("PUT /usuario/:id =>", resJson);

      // Atualiza localStorage com segurança
      try {
        const raw = localStorage.getItem("journey_user");
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.nome_completo = userData.nome_completo;
          parsed.email = userData.email;
          localStorage.setItem("journey_user", JSON.stringify(parsed));
        }
      } catch (err) {
        console.warn("Falha ao atualizar journey_user:", err);
      }

      alert("Perfil atualizado com sucesso!");
      setUserData((s) => ({ ...s, senha: "", senha_confirm: "" }));
    } catch (err) {
      console.error("Falha ao salvar perfil:", err);
      alert("Falha ao salvar perfil. Veja o console para detalhes.");
    } finally {
      setSaving(false);
    }
  }

  if (!userData) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className={`perfil-page ${darkMode ? "dark" : ""}`}>
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="logo-area">
          <img
            src={userData.foto_perfil || "/logo.png"}
            alt="logo"
            className="logo"
          />
          {!sidebarCollapsed && <h2>Journey</h2>}
        </div>

        <nav className="nav">
          <ul>
            <li onClick={() => navigate("/home")}>
              <span className="icon">🏠</span>
              {!sidebarCollapsed && "Home"}
            </li>
            <li onClick={() => navigate("/calendary")}>
              <span className="icon">📅</span>
              {!sidebarCollapsed && "Calendário"}
            </li>
            <li onClick={() => navigate("/criarGrupo")}>
              <span className="icon">➕</span>
              {!sidebarCollapsed && "Criar Grupo"}
            </li>
            <li onClick={handleLogout}>
              <span className="icon">🚪</span>
              {!sidebarCollapsed && "Sair"}
            </li>
          </ul>
        </nav>

        <button
          className="collapse-btn"
          onClick={() => setSidebarCollapsed((p) => !p)}
        >
          {sidebarCollapsed ? "➡️" : "⬅️"}
        </button>
      </aside>

      <main
        className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}
      >
        <div className="container">
          <header className="page-header">
            <h1>Meu Perfil</h1>
            <div className="header-right">
              <button className="theme-btn" onClick={toggleTheme}>
                {darkMode ? "☀️" : "🌙"}
              </button>
              <div className="avatar">
                {userData.nome_completo?.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <div className="perfil-card">
            <div className="perfil-photo">
              <img
                src={userData.foto_perfil || "/default-avatar.png"}
                alt="foto perfil"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="perfil-fields">
              <label>
                Nome Completo:
                <input
                  name="nome_completo"
                  value={userData.nome_completo || ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Data de Nascimento:
                <input
                  name="data_nascimento"
                  type="date"
                  value={userData.data_nascimento || ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Descrição:
                <textarea
                  name="descricao"
                  value={userData.descricao || ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Nova Senha:
                <input
                  name="senha"
                  type="password"
                  placeholder="Nova senha (opcional)"
                  value={userData.senha || ""}
                  onChange={handleChange}
                />
              </label>

              <label>
                Confirmar Senha:
                <input
                  name="senha_confirm"
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={userData.senha_confirm || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="perfil-actions">
              <button onClick={() => navigate("/home")} className="btn-ghost">
                Voltar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
