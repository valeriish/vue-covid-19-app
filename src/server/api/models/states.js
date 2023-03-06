const DataModel = require('./data')

class StatesDataModel extends DataModel {
  constructor(config) {
    super()
    this.infoEndpoint = config.resources.api.hostname
      + config.resources.api.statesInfoEndpoint
    this.currentDataEndpoint = config.resources.api.hostname
      + config.resources.api.usCurrentDataEndpoint
    this.historicalDataEndpoint = config.resources.api.hostname
      + config.resources.api.stateHistoricalDataEndpoint
    this.stateInfoEndpoint = config.resources.api.hostname
      + config.resources.api.stateInfoEndpoint

    this.statesInfo = []
    this.stateInfo = []
    this.stateData = []
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

  async loadStateInfo(state) {
    const historicalEndpoint = this.historicalDataEndpoint.replace('{state}', state)
    const infoEndpoint = this.stateInfoEndpoint.replace('{state}', state)

    await this.fetch(infoEndpoint)
      .then(data => {
        this.stateInfo[state] = data
      })

    await this.fetch(historicalEndpoint)
      .then(data => {
        this.stateData[state] = data
      })
  }

  async getStatesInfo() {
    if (!this.statesInfo.length) {
      await this.loadInfo()
    }

    return this.statesInfo
  }

  async getHistoricalData(state) {
    if (!state) {
      return
    }

    state = state.toLowerCase()

    if (!Object.prototype.hasOwnProperty.call(this.stateData, state) || !this.stateData[state]) {
      await this.loadStateInfo(state)
    }

    return this.stateData[state]
  }

  async getStateInfo(state) {
    if (!state) {
      return
    }

    state = state.toLowerCase()

    if (!Object.prototype.hasOwnProperty.call(this.stateInfo, state) || !this.stateInfo[state]) {
      await this.loadStateInfo(state)
    }

    return this.stateInfo[state]
  }
}

module.exports = StatesDataModel
