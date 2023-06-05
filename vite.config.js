import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  resolve: {
    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
      },
    ],
  },
})
