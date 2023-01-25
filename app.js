import { config } from 'dotenv'
config({ path: './.env' })

import Server from './src/Server.js'

const server = new Server()

server.run()

// import express from 'express'
// import morgan from 'morgan'
// import { mongooseConnect } from './src/config/dbConnection.js'

// const PORT = process.env.PORT ?? 8000

// const app = express()

// app.use(express.json())
// app.use(morgan('dev'))

// app.get('/', (_req, res) => {
//   res.status(200).json({
//     routesAviables: {
//       user: '',
//     },
//   })
// })

// app.get('*', (_req, res) => {
//   res.redirect('/')
// })

// mongooseConnect()

// app.listen(PORT, () => {
//   console.log(`Server listeing on port http://localhost:${PORT}`)
// })
