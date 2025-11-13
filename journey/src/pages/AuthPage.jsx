// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser, updatePassword } from "../api/user";
import { requestRecoveryCode, validateCode } from "../api/recovery";
import logo from "../assets/logo.png";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const location = useLocation();
  const [screen, setScreen] = useState(location.state?.initialTab || "login");
  const [msg, setMsg] = useState(null);

  // ====== estados login
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (!emailLogin || !senhaLogin) return setMsg("Preencha email e senha");

    try {
      const res = await fetch(
        "http://127.0.0.1:3030/v1/journey/usuario/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailLogin, senha: senhaLogin }),
        }
      );

      const data = await res.json();
      if (![200, 201].includes(res.status)) throw new Error(data.message);

      // salva login no contexto (se houver)
      login(data);

      // 🔹 CORREÇÃO: salva corretamente o usuário e o token
      localStorage.setItem(
        "journey_user",
        JSON.stringify({
          id_usuario: data.usuario.id,
          nome_completo: data.usuario.nome,
          email: data.usuario.email,
          tipo_usuario: data.usuario.tipo_usuario,
        })
      );
      localStorage.setItem("journey_token", data.token);

      console.log("Usuário logado:", data.usuario);
      navigate("/home");
    } catch (err) {
      console.error("Erro no login:", err);
      setMsg("Erro ao efetuar login");
    }
  }

  // ====== estados cadastro
  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    senha: "",
    data_nascimento: "",
    tipo_usuario: "Estudante",
    linkedin: "",
  });

  function changeRegister(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitRegister(e) {
    e.preventDefault();
    if (form.tipo_usuario === "Profissional" && !form.linkedin) {
      return setMsg("Informe o LinkedIn");
    }
    const payload = {
      nome_completo: form.nome_completo,
      email: form.email,
      senha: form.senha,
      data_nascimento: form.data_nascimento,
      tipo_usuario: form.tipo_usuario,
      descricao:
        form.tipo_usuario === "Profissional" ? `linkedin:${form.linkedin}` : "",
    };
    try {
      const res = await registerUser(payload);
      setMsg("Cadastro realizado com sucesso! Redirecionando para o login...");
      
      // Redireciona para o login após 2 segundos
      setTimeout(() => {
        setScreen("login");
        // Preenche o email automaticamente
        setEmailLogin(form.email);
      }, 2000);
      
    } catch (error) {
      setMsg(error.response?.data?.message || "Erro ao realizar cadastro");
    }
  }

  // ====== estados recuperação
  const [emailRec, setEmailRec] = useState("");

  async function handleRecover(e) {
    e.preventDefault();
    if (!emailRec) return setMsg("Informe o email");
    const res = await requestRecoveryCode(emailRec);
    setMsg(res?.message);
    if (/sucesso|enviado/i.test(res?.message)) {
      setEmailVal(emailRec);
      setScreen("validate");
    }
  }

  // ====== estados validação
  const [emailVal, setEmailVal] = useState("");
  const [codigo, setCodigo] = useState("");

  async function handleValidate(e) {
    e.preventDefault();
    if (!emailVal || !codigo) return setMsg("Preencha email e código");
    const res = await validateCode(emailVal, codigo);
    if (res?.id_usuario) {
      localStorage.setItem("resetId", res.id_usuario);
      setScreen("reset");
    } else {
      setMsg(res?.message || "Código inválido");
    }
  }

  // ====== estados reset senha
  const [senha, setSenha] = useState("");
  const [conf, setConf] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    const id = localStorage.getItem("resetId");
    if (!senha || senha.length < 6) return setMsg("Senha muito curta");
    if (senha !== conf) return setMsg("Senhas não conferem");
    const res = await updatePassword(id, senha);
    setMsg(res?.message || "Senha alterada com sucesso");
    setTimeout(() => setScreen("login"), 1500);
  }

  return (
    <div className="container">
      <div className="form-area">
        {screen === "login" && (
          <>
            <div style={{width:'100%',maxWidth:460,marginBottom:10,display:'flex',justifyContent:'flex-start'}}>
              <img src={logo} alt="Logo Journey" style={{height:70,objectFit:'contain'}} />
            </div>
            <h2>Bem-vindo ao Journey</h2>
            <p style={{marginTop:6, marginBottom:16, color:'#6b6f76'}}>Conecte-se, aprenda e evolua com sua comunidade.</p>
            <div className="social-btns">
              <button type="button" className="social google">Entrar com Google</button>
              <button type="button" className="social github">Entrar com GitHub</button>
            </div>
            <div className="divider"><span>ou continue com e-mail</span></div>

            {/* login direto com e-mail/senha */}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Seu e-mail"
                aria-label="E-mail"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
              <input
                type="password"
                placeholder="Sua senha"
                aria-label="Senha"
                value={senhaLogin}
                onChange={(e) => setSenhaLogin(e.target.value)}
              />
              <div className="helper-row">
                <label>
                  <input type="checkbox" style={{accentColor:'#6C4AE2'}} />
                  Lembrar de mim
                </label>
                <button type="button" className="forgot" onClick={()=>setScreen('recover')}>Esqueci minha senha</button>
              </div>
              <button type="submit">Entrar</button>
            </form>
            <p>
              Não possui conta? {" "}
              <button className="link-btn" onClick={() => setScreen("register")}>Cadastrar</button>
            </p>
          </>
        )}

        {screen === "register" && (
          <>
            <h2>Crie sua conta</h2>
            <p style={{marginTop:6, marginBottom:16, color:'#6b6f76'}}>Comece sua jornada em poucos passos.</p>
            <p>Já possui conta? <button className="link-btn" onClick={() => setScreen("login")}>Login</button></p>
            <form onSubmit={submitRegister}>
              <input
                placeholder="Nome completo"
                name="nome_completo"
                value={form.nome_completo}
                onChange={changeRegister}
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                name="email"
                value={form.email}
                onChange={changeRegister}
              />
              <input
                type="password"
                placeholder="Crie uma senha"
                name="senha"
                value={form.senha}
                onChange={changeRegister}
              />
              <input
                type="date"
                name="data_nascimento"
                value={form.data_nascimento}
                onChange={changeRegister}
              />
              <select
                name="tipo_usuario"
                value={form.tipo_usuario}
                onChange={changeRegister}
              >
                <option value="Estudante">Estudante</option>
                <option value="Profissional">Profissional</option>
              </select>
              {form.tipo_usuario === "Profissional" && (
                <input
                  placeholder="LinkedIn (URL)"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={changeRegister}
                />
              )}
              <button type="submit">Cadastrar</button>
            </form>
          </>
        )}

        {screen === "recover" && (
          <>
            <h2>Recupere sua senha</h2>
            <p style={{marginTop:6, marginBottom:16, color:'#6b6f76'}}>Enviaremos um código para seu e-mail cadastrado.</p>
            <form onSubmit={handleRecover}>
              <input
                type="email"
                placeholder="Seu e-mail"
                value={emailRec}
                onChange={(e) => setEmailRec(e.target.value)}
              />
              <button type="submit">Recuperar</button>
            </form>
            <p>
              <button className="link-btn" onClick={() => setScreen("login")}>Voltar</button>
            </p>
          </>
        )}

        {screen === "validate" && (
          <>
            <h2>Verifique seu e-mail</h2>
            <form onSubmit={handleValidate}>
              <input
                placeholder="Seu e-mail"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
              />
              <input
                placeholder="Código recebido"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <button type="submit">Confirmar</button>
            </form>
          </>
        )}

        {screen === "reset" && (
          <>
            <h2>Troque sua senha</h2>
            <form onSubmit={handleReset}>
              <input
                type="password"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirme a nova senha"
                value={conf}
                onChange={(e) => setConf(e.target.value)}
              />
              <button type="submit">Confirmar</button>
            </form>
          </>
        )}

        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="illustration">
        <img src={logo} alt="ilustração cadastro" />
      </div>
    </div>
  );
}
