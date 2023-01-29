import express from 'express'
import morgan from 'morgan'
import { mongooseConnect } from './config/dbConnection.js'
import { routerApi } from './routes/index.js'

class Server {
  #app
  #port = process.env.PORT ?? 8000

  constructor() {
    this.#app = express()

    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection() {
    await mongooseConnect()
  }

  middlewares() {
    this.#app.use(express.json())
    this.#app.use(morgan('dev'))
  }

  routes() {
    this.#app.get('/', (_req, res) => {
      res.status(200).json({
        routesAvailable: {
          user: `http://localhost:${this.#port}/api/user`,
          task: `http://localhost:${this.#port}/api/task`,
        },
      })
    })

    routerApi(this.#app)

    this.#app.get('*', (_req, res) => {
      res.redirect('/')
    })
  }

  run() {
    this.#app.listen(this.#port, () => {
      console.log(`Server listning on port http://localhost:${this.#port}`)
    })
  }
}

export default Server
