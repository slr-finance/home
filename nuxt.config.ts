import path from 'path'
import { defineNuxtConfig } from 'nuxt'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static', // default is 'server'
  generate: {
    fallback: '404.html',
    manifest: true
  },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(process.cwd(), 'components/ui/UiIcon/icons'),
        ],
        inject: 'body-last',
        symbolId: 'ui-icon-[dir]-[name]',
      }),
    ]
  }
})
