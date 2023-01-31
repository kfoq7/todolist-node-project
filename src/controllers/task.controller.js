import { handleErrorResponse } from '../helpers/handleErrors.js'
import { taskModel, userModel } from '../models/index.js'

export const updateTask = async (req, res) => {
  const { taskId } = req.params

  try {
    const task = await taskModel
      .findByIdAndUpdate(taskId, req.body, { new: true })
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
  const { userId, taskId } = req.params
  const { status } = req.body

  try {
    await taskModel.findByIdAndUpdate(taskId, { status }, { new: true }).lean()

    const user = await userModel.findById(userId).populate('tasks')

    res.status(200).json({
      message: 'The task has been updated',
      user,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params

  try {
    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $pullAll: { tasks: [{ _id: taskId }] } },
        { new: true }
      )
      .populate('tasks')
      .lean()

    await taskModel.findByIdAndDelete(taskId)

    res.status(200).json({
      message: 'Task deleted',
      user,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}
