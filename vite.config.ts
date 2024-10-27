/* eslint-disable @typescript-eslint/no-require-imports */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss-webpack-plugin/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UniPagesTypes from 'vite-plugin-uni-pages-types'
import path from 'path'

// const isH5 = process.env.UNI_PLATFORM === 'h5'
// const isApp = process.env.UNI_PLATFORM === 'app'
const isWechat = process.env.UNI_PLATFORM === 'mp-weixin'
const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    UniPagesTypes(),
    ...(isWechat ? [uvwt()] : []),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.nvue$/
      ],
      imports: [
        'vue',
        'pinia',
        'uni-app'
      ],
      dirs: [
        'src/store',
        'src/utils',
        'src/hooks/**'
      ],
      vueTemplate: true,
      dts: true, // or a custom path
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dirs: [
        'src/components/**',
        'src/uni_modules/**'
      ],
      dts: true
    }),
    uni()
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
