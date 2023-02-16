import config from '../config.json'

export default {
  install: (app: any) => {
    app.config.globalProperties.appConfig = config
  }
}
