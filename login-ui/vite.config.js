import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/NFC_FRONT_END/login-ui/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5002,
    allowedHosts: ['manila.city.library'],
  },
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled'
    ],
    alias: {
      '@mui': '/srv/Capstone/NFC_FRONT_END/opac/node_modules/@mui',
      '@emotion': '/srv/Capstone/NFC_FRONT_END/opac/node_modules/@emotion'
    }
  }
})
