import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Set base path for GitHub Pages deployment
  // Use repository name for GitHub Pages, or '/' for custom domain
  base: process.env.NODE_ENV === 'production' ? '/vizplay/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
