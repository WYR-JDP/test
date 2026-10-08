import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'

// 后端地址：写在这里，前端代码里只写 '/api/xxx'
const API_TARGET = 'http://122.51.48.109:8088'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // 端口
    open: true, // 启动自动打开浏览器
    proxy: { // 接口代理
      // 前缀必须和 src/utils/request.js 里的 baseURL 一致，都叫 '/api'。
      // 千万别写成 '/' —— 那会把 index.html、/src/main.ts 这些 vite 自己的
      // 资源也转发给后端，导致整个页面 502。
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        // 后端路由本身不带 /api（/todos/all 而不是 /api/todos/all），
        // 所以转发前要把 /api 前缀去掉。
        // 前端 /api/todos/all  ->  后端 /todos/all
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
