import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; // from .env

export default axios.create({
  baseURL: apiUrl,
});
