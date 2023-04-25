/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  corePlugins: {
    preflight: process.env.UNI_PLATFORM !== 'mp-weixin' /* Preflight will be injected base */
  },
  theme: {
    extend: {}
  },
  plugins: []
}

