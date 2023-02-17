const DailyModel = require('./models/daily')

module.exports = function(app) {
  app.get('/api/summary', async (req, res) => {
    if (!req.config) {
      res.status(400).json({
        message: 'Error: Config is missed'
      })
    }

    try {
      const dailyModel = new DailyModel(req.config)
      const summary = await dailyModel.getSummary()

      if (summary.hasOwnProperty('error')) {
        res.status(400).json({
          message: summary['error']
        })
      }

      res.status(200).json({ summary })
    } catch (e) {
      res.status(500).json({
          message: 'Server error'
      })

      throw Error(e)
    }
  });

  app.get('/api/daily', async (req, res) => {
    if (!req.config) {
      res.status(400).json({
        message: 'Error: Config is missed'
      })
    }

    try {
      const dailyModel = new DailyModel(req.config)
      const dailyData = await dailyModel.getDailyData()

      if (dailyData.hasOwnProperty('error')) {
        res.status(400).json({
          message: dailyData['error']
        })
      }

      res.status(200).json({ dailyData })
    } catch (e) {
      res.status(500).json({
          message: 'Server error'
      })

      throw Error(e)
    }
  });

  return app
}
