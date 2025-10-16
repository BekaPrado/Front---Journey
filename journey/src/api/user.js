// src/api/user.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3030/v1/journey";

/**
 * registra novo usuário
 */
export async function registerUser(dados) {
  const res = await fetch(`${BASE}/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

/**
 * atualiza senha
 */
export async function updatePassword(id, senha) {
  const res = await fetch(`${BASE}/usuario/senha/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha }),
  });
  return res.json();
}
