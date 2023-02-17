const DataModel = require('./data')

class StatesDataModel extends DataModel {
  constructor(config) {
    super()
    this.infoEndpoint = config.resources.api.hostname
      + config.resources.api.statesInfoEndpoint
    this.currentDataEndpoint = config.resources.api.hostname
      + config.resources.api.usCurrentDataEndpoint

    this.statesInfo = []
  }

  async loadInfo() {
    await this.fetch(this.infoEndpoint)
      .then(data => {
        this.statesInfo = data
      })
    await this.fetch(this.currentDataEndpoint)
      .then(data => {
        this.statesInfo.forEach((state, index) => {
          const ind = data.findIndex(item => item.state === state.state)
          if (ind > -1) {
            this.statesInfo[index] = {...data[ind], ...state}
          }
        })
      })
  }

  async getStatesInfo() {
    if (!this.statesInfo.length) {
      await this.loadInfo()
    }

    return this.statesInfo
  }
}

module.exports = StatesDataModel
