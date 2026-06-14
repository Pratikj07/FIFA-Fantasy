import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // loadEnv with '' prefix loads ALL vars from .env (not just VITE_ ones)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/.netlify/functions/scores': {
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
