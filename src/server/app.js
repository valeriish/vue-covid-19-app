const path = require('path')
const express = require('express')

const config = require('../config.json')

class App {
  server

  constructor() {
    this.server = express()

    this.staticResources()
    this.middlewares()
    this.routes()
  }

  staticResources() {
    const clientPath = '../../dist/client'

    this.server.use(
      '/img',
      express.static(path.join(__dirname, clientPath, 'img'))
    )
    this.server.use(
      '/js',
      express.static(path.join(__dirname, clientPath, 'js'))
    )
    this.server.use(
      'manifest.json',
      express.static(path.join(__dirname, clientPath, 'manifest.json'))
    )
    this.server.use(
      '/css',
      express.static(path.join(__dirname, clientPath, 'css'))
    )
    this.server.use(
      '/favicon.ico',
      express.static(path.join(__dirname, clientPath, 'favicon.ico'))
    )
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use((req, res, next) => {
      req.config = config
      next()
    })
  }

  routes() {
    require('./routes')(this.server);
  }
}

module.exports = new App().server
