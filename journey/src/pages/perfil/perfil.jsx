import React, { useState, useEffect } from "react";
import Sidebar from "../../components/header/index.jsx";
import { uploadImageToAzure } from "../../pages/uploadImageToAzure.js";
import { FaUserCircle, FaImage, FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import "./perfil.css";
import { useTheme } from "../../context/ThemeContext";

const Perfil = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [perfilData, setPerfilData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme, toggle } = useTheme();

  const usuarioLocal = JSON.parse(localStorage.getItem("journey_user"));
  const token = localStorage.getItem("journey_token");
  const API_BASE = "http://localhost:3030/v1/journey";

  const azureConfig = {
    storageAccount: "journey2025",
    containerName: "journey",
    sasToken:
      "sp=racwl&st=2025-10-07T12:06:43Z&se=2025-12-20T20:21:43Z&sv=2024-11-04&sr=c&sig=olO%2FAQVZv1dP2I68WhoQ3D%2BcUpAaq7H3CepabScHisg%3D",
  };

  useEffect(() => {
    if (!usuarioLocal?.id_usuario) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/usuario/${usuarioLocal.id_usuario}`);
        const data = await res.json();
        if (data?.usuario?.length > 0) {
          const user = data.usuario[0];
          setPerfilData(user);
          setEditData(user);
          setImagePreviewUrl(user.foto_perfil || "");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      let fotoUrl = editData.foto_perfil;

      if (avatarFile) {
        fotoUrl = await uploadImageToAzure({
          file: avatarFile,
          ...azureConfig,
        });
      }

      const res = await fetch(`${API_BASE}/usuario/${usuarioLocal.id_usuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editData,
          foto_perfil: fotoUrl,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Perfil atualizado com sucesso!");
        setPerfilData(data.usuario[0] || editData);
        setIsEditing(false);
        setAvatarFile(null);
      } else {
        alert(data.message || "Erro ao atualizar perfil");
      }
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao atualizar perfil.");
    }
  };

  const handleCancel = () => {
    setEditData(perfilData);
    setImagePreviewUrl(perfilData?.foto_perfil || "");
    setAvatarFile(null);
    setIsEditing(false);
  };

  const toggleTheme = () => toggle();

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return <div className="loading">Carregando perfil...</div>;
  }

  return (
    <div className={`homepage ${theme === "dark" ? "dark" : ""}`} style={{ display: "flex" }}>
      <Sidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />

      <main className="perfil-wrapper" style={{ marginLeft: isCollapsed ? "80px" : "220px" }}>
        <header className="perfil-header">
          <h1>Meu Perfil</h1>
          <div className="header-right">
            <button className="btn-back" onClick={handleBack}>
              <FaArrowLeft />
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            
          </div>
        </header>

        <section className="perfil-grid">
          {/* COLUNA ESQUERDA */}
          <div className="perfil-left">
            <div className="perfil-photo">
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="Foto de perfil" />
              ) : (
                <FaUserCircle size={130} />
              )}

              {isEditing && (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <label htmlFor="avatar-upload" className="btn-upload">
                    <FaImage />
                    Alterar Foto
                  </label>
                </>
              )}
            </div>

            <div className="perfil-info">
              <h2>{editData?.nome_completo}</h2>
              <p className="email">{editData?.email}</p>
              <p className="tipo">{editData?.tipo_usuario}</p>
            </div>

            <div className="perfil-actions">
              {isEditing ? (
                <>
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button className="btn-save" onClick={handleSave}>
                    Salvar
                  </button>
                </>
              ) : (
                <button className="btn-save" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="perfil-right">
            <h3>Informações Detalhadas</h3>
            <div className="perfil-fields">
              <label>
                Nome Completo:
                <input
                  type="text"
                  value={editData?.nome_completo || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, nome_completo: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </label>

              <label>
                Descrição / Bio:
                <textarea
                  value={editData?.descricao || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, descricao: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </label>

              <label>
                Tipo de Usuário:
                <select
                  value={editData?.tipo_usuario || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, tipo_usuario: e.target.value })
                  }
                  disabled={!isEditing}
                >
                  <option value="Estudante">Estudante</option>
                  <option value="Profissional">Profissional</option>
                </select>
              </label>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Perfil;
