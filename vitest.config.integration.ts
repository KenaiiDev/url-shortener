import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/tests/integration/**/*.test.ts']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
