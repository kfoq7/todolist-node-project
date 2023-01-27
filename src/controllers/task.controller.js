import { handleErrorResponse } from '../helpers/handleErrors.js'
import { taskModel } from '../models/index.js'

export const updateTask = async (req, res) => {
  const { taskId } = req.params

  try {
    const task = await taskModel
      .findByIdAndUpdate(taskId, req.body, {
        new: true,
        upsert: true,
      })
      .lean()

    res.status(200).json({
      message: 'Task updated',
      task,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const changeStatusTask = async (req, res) => {
  const { taskId } = req.params

  try {
    const status = req.body.status ? 'COMPLETED' : 'PENDING'

    const task = await taskModel
      .findByIdAndUpdate(taskId, { status }, { new: true, upsert: true })
      .lean()

    res.status(200).json({
      message: 'The task has been updated',
      task,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}
