import config from '@/config.json'

/**
 * Add Configuration object to App Global Properties
 */
export default {
  install: (app: any) => {
    app.config.globalProperties.appConfig = config
  }
}
