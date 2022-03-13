import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Unocss({
    presets: [
      presetAttributify({ /* preset options */ }),
      presetUno(),
      // ...custom presets
    ],
  }),

  ],


  server: {
    proxy: {
      '/api': 'http://localhost:3002/'
    }
  }
})
