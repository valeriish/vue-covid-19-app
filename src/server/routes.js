const path = require('path')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')

const manifest = require('../../dist/server/ssr-manifest.json')
const appPath = path.join(__dirname, '../../dist', 'server', manifest['app.js'])
const VueApp = require(appPath).default

module.exports = function(app) {
  app = require('./api/summary')(app)
  app = require('./api/states')(app)

  app.get('*', async (req, res) => {
    const { app: vueApp, router } = await VueApp(req)
  
    await router.push(req.url)
    await router.isReady()
    const { title } = router.getMetaData()
  
    let appContent = await renderToString(vueApp)
  
    fs.readFile(
      path.join(__dirname, '../../dist/client/index.html'),
      (err, html) => {
        if (err) {
          throw err
        }
  
        appContent = `<div id="app">${appContent}</div>`
  
        html = html
          .toString()
          .replace(/<title>(.*)<\/title>/g, `<title>${title}</title>`)
          .replace('<div id="app"></div>', `${appContent}`)
        res.setHeader('Content-Type', 'text/html')
        res.send(html)
      }
    );
  });
}
