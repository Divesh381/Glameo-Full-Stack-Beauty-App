import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   host: '192.168.1.210', // Listen on all IPs
  //   port: 5173, // or whatever port you prefer
  // },
  plugins: [react()],
})

