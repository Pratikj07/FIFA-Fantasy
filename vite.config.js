import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // loadEnv with '' loads ALL vars including non-VITE_ ones (e.g. FOOTBALL_API_KEY)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        // In dev: proxy /api/scores → football-data.org using FOOTBALL_API_KEY from .env
        '/api/scores': {
          target: 'https://api.football-data.org',
          changeOrigin: true,
          rewrite: () => '/v4/competitions/WC/matches?season=2026',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.FOOTBALL_API_KEY) {
                proxyReq.setHeader('X-Auth-Token', env.FOOTBALL_API_KEY)
              }
            })
          },
        },
      },
    },
  }
})
