class DailyModel {
  constructor(config) {
    this.endpoint = config.resources.api.hostname
      + config.resources.api.usDailyDataEndpoint

    this.dailyData = []
  }

  async load() {
    await fetch(this.endpoint)
      .then(response => response.json())
      .then(data => {
        this.dailyData = data
      })
      .catch(function (err) {
        console.log("Unable to fetch -", err);
      });
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
