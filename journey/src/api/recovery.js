// src/api/recovery.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3030/v1/journey";

/**
 * pede envio de código para o email
 */
export async function requestRecoveryCode(email) {
  const res = await fetch(`${BASE}/recuperar-senha`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

/**
 * valida código
 */
export async function validateCode(email, codigo) {
  const res = await fetch(`${BASE}/validar-codigo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, codigo }),
  });
  return res.json();
}
