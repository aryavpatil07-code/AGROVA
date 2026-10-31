import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Required for Capacitor Android & static hosting
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: true,
    open: false
  }
})
