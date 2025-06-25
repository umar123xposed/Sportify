import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from other devices
    port: 5173, // Default Vite port, change if needed
    strictPort: true, // Ensures the specified port is used
  },
});
