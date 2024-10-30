/* eslint-disable @typescript-eslint/no-require-imports */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss-webpack-plugin/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UniPagesTypes from 'vite-plugin-uni-pages-types'
import RemoveConsole from './plugins/vite-plugin-remove-console'

// const isH5 = process.env.UNI_PLATFORM === 'h5'
// const isApp = process.env.UNI_PLATFORM === 'app'
const isWechat = process.env.UNI_PLATFORM === 'mp-weixin'
// const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    UniPagesTypes(),
    RemoveConsole(), //* 移除所有 console 仅在生产环境（主要为了解决uniapp App打包，使用esbuild配置无效）
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
        'node_modules/@dcloudio/uni-ui/lib/**'
      ],
      dts: true
    }),
    uni()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@img', replacement: '/src/assets/img' },
      { find: /^@(png|jpg|webp)(\/.*)/, replacement: '/src/assets/img' + '$2.$1' }
    ]
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
  }
})
