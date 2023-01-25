import express from 'express'
import {
  createTaskUser,
  listTaskUser,
  registerUser,
} from '../controllers/user.controllers.js'
import { validate } from '../middlewares/validateFields.js'
import { validateTask, validateUserId } from '../validators/index.js'

const router = express.Router()

router.post('/register', registerUser)

router.get('/:userId', validate([...validateUserId]), listTaskUser)

router.post(
  '/:userId/create-task',
  validate([...validateUserId, ...validateTask]),
  createTaskUser
)

export default router
