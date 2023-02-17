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

      if (statesInfo.hasOwnProperty('error')) {
        res.status(400).json({
          message: summary['error']
        })
      }

      res.status(200).json({ statesInfo })
    } catch (e) {
      res.status(500).json({
          message: 'Server error'
      })

      throw Error(e)
    }
  });

  return app
}
