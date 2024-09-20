import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss-webpack-plugin/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const app = process.env.UNI_PLATFORM === 'app'
const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    uni(),
    ...(isH5 || app ? [] : [uvwt()]),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        'pinia',
        'uni-app'
      ],
      dirs: [
        'src/store',
        'src/hooks/**',
        'src/utils'
      ],
      vueTemplate: true,
      dts: true, // or a custom path
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@img/': `${path.resolve(__dirname, 'src/static/img')}/`
    }
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('tailwindcss'),
        require('postcss-rem-to-responsive-pixel')({
          rootValue: 32,
          propList: ['*'],
          transformUnit: 'rpx'
        })
      ]
    }
  },
  esbuild: {
    drop: isProd ? ['console', 'debugger'] : []
  }
})
