const DataModel = require('./data')

class DailyModel extends DataModel {
  constructor(config) {
    super()
    this.endpoint = config.resources.api.hostname
      + config.resources.api.usDailyDataEndpoint

    this.dailyData = []
  }

  async load() {
    await this.fetch(this.endpoint)
      .then(data => {
        this.dailyData = data
      })
  }

  async getDailyData() {
    if (!this.dailyData.length) {
      await this.load()
    }

    return this.dailyData
  }

  async getSummary() {
    const dailyData = await this.getDailyData()

    return dailyData.length ? dailyData[0] : []
  }
}

module.exports = DailyModel
