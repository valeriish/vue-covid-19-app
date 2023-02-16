import buildApp from './main'
import scripts from './scripts'

const { app, router } = buildApp();

router.isReady()
  .then(() => {
    app.mount('#app', true)
    scripts()
  })
