import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Kombinera båda konfigurationerna i ett objekt
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Skickar alla API-anrop till backend
    },
  },
});
