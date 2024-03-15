import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/front': {
        target: loadEnv('', process.cwd()).VITE_API_URL,
        changeOrigin: true
      },
      '/boss': {
        target: loadEnv('', process.cwd()).VITE_API_URL,
        changeOrigin: true
      }
    }
  },
  plugins: [
    UnoCSS(),
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver(), IconsResolver()],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
