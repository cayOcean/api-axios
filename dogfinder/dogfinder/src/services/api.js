import axios from "axios";

// cria uma instância do axios configurada
const api = axios.create({
  baseURL: "https://dog.ceo/api", 
  timeout: 5000,
});

export default api;
