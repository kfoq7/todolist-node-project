import express from 'express'
import { deleteTask } from '../controllers/task.controller.js'
import {
  createTaskUser,
  listTaskUser,
  registerUser,
  loginUser,
} from '../controllers/user.controllers.js'
import {
  validateAuth,
  validate,
  validatePassword,
} from '../middlewares/index.js'
import {
  validateTask,
  validateUserId,
  validationUser,
  validationLogin,
} from '../validators/index.js'

const router = express.Router()

router.post(
  '/register',
  [validate([...validationUser]), validatePassword],
  registerUser
)

router.post('/login', [validate([...validationLogin])], loginUser)

router.get(
  '/:userId',
  [validateAuth, validate([...validateUserId])],
  listTaskUser
)

router.post(
  '/:userId/create-task',
  [validateAuth, validate([...validateUserId, ...validateTask])],
  createTaskUser
)

router.delete('/delete-task/:userId/:taskId', [validateAuth], deleteTask)

export default router
