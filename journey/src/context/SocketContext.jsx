// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:8080", {
        transports: ["websocket"], // usa websocket direto
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => console.log("🟢 Socket conectado:", socket.id));
    socket.on("disconnect", () => console.log("🔴 Socket desconectado"));
    return () => socket.disconnect();
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Aqui é o ponto principal: exportar o hook corretamente
export const useSocket = () => useContext(SocketContext);
