import { createSSRApp, createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { config, markdown } from '@/plugins'

const isSSR = typeof window === 'undefined';

export default function buildApp() {
  const app = (isSSR ? createSSRApp(App) : createApp(App))

  app.use(router)
  app.use(config)
  app.use(markdown)

  return { app, router }
}
