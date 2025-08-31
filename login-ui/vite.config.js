import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'resolved-muskox-verbally.ngrok-free.app'
    ],
    host: '0.0.0.0',
    port: 5000,
  }
})
