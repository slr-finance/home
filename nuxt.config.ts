import path from 'path'
import { defineNuxtConfig } from 'nuxt'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import federation from '@originjs/vite-plugin-federation'
import { container} from 'webpack'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static', // default is 'server'
  generate: {
    fallback: '404.html',
    manifest: true,
  },
  head: {
    bodyAttrs: {
      class: '--landing', // for uikit
    }
  },
  render: {
    static: {
      prefix: false
    },
  },
  build: {
    transpile: ['slr-finance-ui-share']
  },
  modules: ['@nuxtjs/tailwindcss'],
  webpack: {
    plugins:[
      // new container.ModuleFederationPlugin({
      //   remoteType: 'import',
      //   remotes: {
      //     'slr-common': {
      //       /**
      //        * Container locations from which modules should be resolved and loaded at runtime.
      //        */
      //       external: 'slr-common@http://localhost:4000/remoteEntry.js',
      //       /**
      //        * The name of the share scope shared with this remote.
      //        */
      //       shareScope: 'mf-slr-share-cope',
      //       /**
      //        * the remote format
      //        */
      //       // format: 'systemjs',
      //       /**
      //        * from
      //        */
      //     }
      //   }
      // })
    ]
  },
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(process.cwd(), 'components/ui/UiIcon/icons'),
          path.resolve(process.cwd(), 'icons'),
        ],
        inject: 'body-last',
        symbolId: 'ui-icon-[dir]-[name]',
      }),
      // federation({
      //   name: 'slr-home',
      //   remotes: {
      //     'slr-common': {
      //       /**
      //        * Container locations from which modules should be resolved and loaded at runtime.
      //        */
      //       external: 'http://localhost:4000/remoteEntry.js',
      //       externalType: 'url',
      //       /**
      //        * The name of the share scope shared with this remote.
      //        */
      //       shareScope: 'mf-slr-share-cope',
      //       /**
      //        * the remote format
      //        */
      //       // format: 'systemjs',
      //       /**
      //        * from
      //        */
      //       from: 'webpack',
      //     },
      //   },
      //   shared: {
      //     vue: {
      //       import: true,
      //       shareScope: 'mf-slr-share-cope'
      //     },
      //   }
      // })
    ]
  }
})
