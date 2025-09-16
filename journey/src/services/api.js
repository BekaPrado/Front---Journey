import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v1/planify", // seu backend
});

export default api;
