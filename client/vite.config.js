import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, '/v1'),
      }
    }
  },
})
