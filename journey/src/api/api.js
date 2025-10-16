// src/api/user.js
const BASE_URL = "http://localhost:3030/v1/journey";

export async function registerUser(dados) {
  const res = await fetch(`${BASE_URL}/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/usuario`);
  return res.json();
}

export async function updatePassword(id, senha) {
  const res = await fetch(`${BASE_URL}/usuario/senha/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha }),
  });
  return res.json();
}
