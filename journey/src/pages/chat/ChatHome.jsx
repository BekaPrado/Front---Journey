import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import ChatContacts from "./ChatContacts.jsx";
import "../grupo/chat/chat.css";

export default function ChatHome() {
  return (
    <DashboardLayout noPadding showRight={false}> 
      <div className="chat-layout two-col">
        <ChatContacts />
        <section className="chat-wrapper full">
          <div className="chat-header">
            <div>
              <h1>Mensagens</h1>
              <p>Selecione um contato à esquerda para começar</p>
            </div>
          </div>

          <div className="chat-box">
            <div className="sem-mensagens">
              <p>Bem-vindo ao chat. Selecione um contato à esquerda.</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
