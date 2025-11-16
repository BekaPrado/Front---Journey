import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Sucesso() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <CheckCircle size={90} color="#B388FF" />
        </div>

        <h1 style={styles.title}>Pagamento Concluído! 🎉</h1>

        <p style={styles.subtitle}>
          Seu pagamento foi confirmado com sucesso!  
          Agora você já pode acessar seu e-book na sua biblioteca.
        </p>

        <button style={styles.button} onClick={() => navigate("/ebook")}>
          📚 Voltar para a loja
        </button>
      </div>

      {/* fundo */}
      <div style={styles.gradientBg} />
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Poppins, sans-serif",
  },

  gradientBg: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    background:
      "linear-gradient(135deg, #5A00FF 0%, #2C0A5A 50%, #0A051A 100%)",
  },

  card: {
    background: "rgba(255, 255, 255, 0.10)",
    padding: "45px 50px",
    width: "450px",
    backdropFilter: "blur(18px)",
    borderRadius: "22px",
    textAlign: "center",
    boxShadow: "0 0 40px rgba(140, 82, 255, 0.4)",
    animation: "fadeIn 0.8s ease",
  },

  iconWrapper: {
    marginBottom: "20px",
    animation: "pulse 2s infinite ease-in-out",
  },

  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "white",
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: "1.5",
    marginBottom: "30px",
  },

  button: {
    padding: "14px 28px",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #B388FF, #985EFF)",
    color: "white",
    fontWeight: "600",
    transition: "0.3s",

    boxShadow: "0px 0px 20px rgba(179, 136, 255, 0.4)",
  },
};

// Animações CSS injetadas:
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  </style>
`
);
