import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'v

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(),
  //   tailwindcss(),
  // ],

  //removed tailwindcss() function due to error.
  //error -> when running, it was referencing to tailwind, but it is not installed
  //correction for GPT
  plugins: [react()],
})
