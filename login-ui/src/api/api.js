// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // automatically reads from .env.development
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY
  },
  withCredentials: true, //this makes cookies (sessions) work
});

export default api;
