import express from 'express'
import {
  changeStatusTask,
  deleteTask,
  updateTask,
} from '../controllers/task.controller.js'
import { validateAuth, validate } from '../middlewares/index.js'
import { validateTask, validateTaskId } from '../validators/index.js'

const router = express.Router()

router.put(
  '/:taskId',
  [validateAuth, validate([...validateTaskId, ...validateTask])],
  updateTask
)

router.put(
  '/change-status/:userId/:taskId',
  [validateAuth, validate([...validateTaskId])],
  changeStatusTask
)

router.delete('/:taskId', [validateAuth], deleteTask)

export default router
