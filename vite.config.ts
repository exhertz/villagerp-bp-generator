import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from "vite-plugin-singlefile"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [svelte(), tailwindcss(), viteSingleFile()],
  server: {
    host: "0.0.0.0"
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    polyfillModulePreload: false,
  }
})
