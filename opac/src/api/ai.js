import api from './api';

export async function askLibraryAI(message) {
  const { data } = await api.post('/ai/chat', { message });
  return data; // { reply, books }
}   