import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

// Get git commit hash dynamically
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return 'dev'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Since you have a custom domain (tame.wtf), use root path
  define: {
    __GIT_HASH__: JSON.stringify(getGitHash())
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Custom utilities
          'utils': ['./src/utils/markdown.ts']
        }
      }
    },
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Preload modules for better performance
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
