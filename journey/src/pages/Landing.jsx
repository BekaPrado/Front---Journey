// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        
    
      </header>

      <main className="hero">
        <div className="hero-copy">
          <h1>Conecte-se à sua jornada de aprendizado</h1>
          <p>Encontre grupos, compartilhe conhecimento e evolua com uma comunidade que vibra junto com você.</p>
          <div className="cta-row">
            <button className="cta btn btn-primary" onClick={() => navigate("/auth")}>
              Começar agora
            </button>
            <button className="secondary btn" onClick={() => navigate("/auth")}>
              Já tenho conta
            </button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="logo-wrap">
            <div
              className="hero-logo-mask"
              aria-label="Journey logo"
              role="img"
              style={{ WebkitMaskImage: `url(${logo})`, maskImage: `url(${logo})` }}
            />
          </div>
        </div>
      </main>

      <section className="highlights">
        <div className="highlight page-card">
          <h3>Comunidades ativas</h3>
          <p>Participe de grupos temáticos com eventos, discussões e projetos.</p>
        </div>
        <div className="highlight page-card">
          <h3>Aprendizado prático</h3>
          <p>Conteúdos e interações que aceleram sua evolução profissional.</p>
        </div>
        <div className="highlight page-card">
          <h3>Crie seu grupo</h3>
          <p>Reúna pessoas com o mesmo objetivo e lidere uma jornada.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <small>© {new Date().getFullYear()} Journey</small>
      </footer>
    </div>
  );
}
