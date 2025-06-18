import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss({
      config: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      }
    })
  ],
  server: {
    host: '0.0.0.0',   // Allow access from LAN
    port: 5000         // Optional: default port
  }
})
