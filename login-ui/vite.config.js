import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'seriously-trusting-octopus.ngrok-free.app',
      'manila.city.library'
    ],
    host: '0.0.0.0',
    port: 5000,
  },
  base: "/NFC_FRONT_END/login-ui/"
})
