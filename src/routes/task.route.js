import express from 'express'
import { changeStatusTask, updateTask } from '../controllers/task.controller.js'
import { validate } from '../middlewares/validateFields.js'
import { validateTask, validateTaskId } from '../validators/index.js'

const router = express.Router()

router.put(
  '/:taskId',
  validate([...validateTaskId, ...validateTask]),
  updateTask
)

router.put(
  '/:taskId/change-status',
  validate([...validateTaskId]),
  changeStatusTask
)

export default router
