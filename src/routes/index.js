import express from 'express'
import routerUser from './user.route.js'
import routerTask from './task.route.js'

export const routerApi = app => {
  const router = express.Router()

  app.use('/api', router)

  router.use('/user', routerUser)
  router.use('/task', routerTask)
}
