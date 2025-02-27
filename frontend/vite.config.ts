import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import type { PluginOption } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as unknown as PluginOption
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and related packages
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }
          
          // Redux related packages
          if (id.includes('node_modules/@reduxjs/') || 
              id.includes('node_modules/react-redux/')) {
            return 'redux';
          }

          // Recharts and its dependencies
          if (id.includes('node_modules/recharts/')) {
            return 'recharts';
          }

          // D3 dependencies
          if (id.includes('node_modules/d3-')) {
            return 'd3-deps';
          }
        }
      }
    },
    chunkSizeWarningLimit: 400,
    target: 'esnext', // For better tree-shaking
    minify: 'esbuild' // For faster minification
  }
});
