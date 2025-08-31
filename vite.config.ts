// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // charge toutes les variables (pas seulement celles préfixées VITE_)
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    // indispensable pour un déploiement "project pages" sur /pc-config-generator/
    base: '/pc-config-generator/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // équivaut à '@' => racine du projet
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  }
})
