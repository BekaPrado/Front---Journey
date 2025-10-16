// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030/v1/journey",
});

export default api;
