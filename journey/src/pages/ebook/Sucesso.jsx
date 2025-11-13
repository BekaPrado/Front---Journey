import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sucesso() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #b5e48c, #76c893)",
        color: "#1b4332",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        ✅ Pagamento realizado com sucesso!
      </h1>
      <p style={{ fontSize: "1.2rem", textAlign: "center", maxWidth: 500 }}>
        Seu pagamento foi confirmado. Agora você pode fazer o download do seu e-book.
      </p>

      <button
        onClick={() => navigate("/ebook")}
        style={{
          marginTop: "2rem",
          padding: "12px 24px",
          fontSize: "1rem",
          borderRadius: "8px",
          backgroundColor: "#1b4332",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        📚 Voltar para a loja
      </button>
    </div>
  );
}
