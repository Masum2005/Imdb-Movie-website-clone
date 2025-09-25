import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true // open default browser with correct URL
    // remove browser or path here for now
  }
})
