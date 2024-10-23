import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

declare module 'vue' {
  interface ComponentCustomProperties {
      // eslint-disable-next-line no-undef
      env: ImportMetaEnv
      // eslint-disable-next-line no-undef
      console: Console
  }
}

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.config.globalProperties.env = import.meta.env
  app.config.globalProperties.console = console

  app.use(pinia)

  return {
    app,
    pinia
  }
}
