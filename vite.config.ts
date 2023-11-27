import { defineConfig } from 'vite'
import {join} from 'path';
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron';
// 安装 vite-plugin-electron 的时候，就同时安装了 vite-plugin-electron-renderer
import electronRender from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), electron({
    entry: {
      entry: 'electron/index.ts'
    }
  }), electronRender()],
  base: './',
  server: {
    port: 3344
  },
  build: {
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})
