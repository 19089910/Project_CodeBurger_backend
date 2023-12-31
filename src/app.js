import express from 'express'
import router from './routes'
import { resolve } from 'path'

import './database'

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file/',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(router)
  }
}

export default new App().app
