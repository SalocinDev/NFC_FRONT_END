import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'seriously-trusting-octopus.ngrok-free.app'
    ],
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://seriously-trusting-octopus.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  base: "/NFC_FRONT_END/login-ui/"
})
