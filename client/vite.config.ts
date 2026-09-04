import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    port: 5174,
    host: true
  }
})