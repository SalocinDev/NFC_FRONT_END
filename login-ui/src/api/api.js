// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // automatically reads from .env.development
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
