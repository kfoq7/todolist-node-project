import express from 'express'
import {
  createTaskUser,
  listTaskUser,
  registerUser,
  listUser,
  loginUser,
} from '../controllers/user.controllers.js'
import { validate } from '../middlewares/validateFields.js'
import { validateTask, validateUserId, validationUser, validationLogin } from '../validators/index.js'

const router = express.Router()

router.get('/list', listUser)

router.post('/register', validate([...validationUser]), registerUser)

router.post('/login', validate([...validationLogin]), loginUser)

router.get('/:userId', validate([...validateUserId]), listTaskUser)

router.post(
  '/:userId/create-task',
  validate([...validateUserId, ...validateTask]),
  createTaskUser
)

export default router
