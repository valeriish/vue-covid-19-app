const StatesDataModel = require('./models/states')

module.exports = function(app) {
  app.get('/api/states', async (req, res) => {
    if (!req.config) {
      res.status(400).json({
        message: 'Error: Config is missed'
      })
    }

    try {
      const statesModel = new StatesDataModel(req.config)
      const statesInfo = await statesModel.getStatesInfo()

      if (Object.prototype.hasOwnProperty.call(statesInfo, 'error')) {
        res.status(400).json({
          message: statesInfo['error']
        })
      }

      res.status(200).json({ statesInfo })
    } catch (e) {
      res.status(500).json({
          message: 'Server error'
      })

      console.error(e)
    }
  })

  app.get('/api/state/:state', async (req, res) => {
    if (!req.config) {
      res.status(400).json({
        message: 'Error: Config is missed'
      })
    }

    try {
      const statesModel = new StatesDataModel(req.config)
      const stateinfo = await statesModel.getStateInfo(req.params.state)
      const historicalData = await statesModel.getHistoricalData(req.params.state)

      if (Object.prototype.hasOwnProperty.call(historicalData, 'error')) {
        res.status(400).json({
          message: historicalData['error']
        })
      }

      res.status(200).json({ historicalData,  stateinfo })
    } catch (e) {
      res.status(500).json({
          message: 'Server error'
      })

      console.error(e)
    }
  });

  return app
}
