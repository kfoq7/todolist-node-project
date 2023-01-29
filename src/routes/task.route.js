import express from 'express'
import { changeStatusTask, updateTask } from '../controllers/task.controller.js'
import { validateAuth, validate } from '../middlewares/index.js'
import { validateTask, validateTaskId } from '../validators/index.js'

const router = express.Router()

router.put(
  '/:taskId',
  [validateAuth, validate([...validateTaskId, ...validateTask])],
  updateTask
)

router.put(
  '/:taskId/change-status',
  [validateAuth, validate([...validateTaskId])],
  changeStatusTask
)

export default router
