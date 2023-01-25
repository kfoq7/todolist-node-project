import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Task')
})

export default router
