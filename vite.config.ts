import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [
    angular({
      jit: true,
      tsconfig: './tsconfig.app.json',
    })
  ],
  resolve: {
    mainFields: ['module'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: true,
  },
}));
