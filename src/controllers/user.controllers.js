import { handleErrorResponse } from '../helpers/handleErrors.js'
import { userModel, taskModel } from '../models/index.js'

export const registerUser = () => {}

export const loginUser = () => {}

export const createTaskUser = async (req, res) => {
  const { userId } = req.params

  try {
    const task = await taskModel.create(req.body)

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        { $push: { tasks: task } },
        { new: true, upsert: true }
      )
      .populate('tasks')
      .lean()

    const { username, tasks } = user

    res.status(200).json({
      message: 'Task added',
      username,
      tasks,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const listTaskUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await userModel.findById(userId).populate('tasks').lean()

    const { username, tasks } = user

    res.status(200).json({
      message: 'Task list user',
      username,
      tasks,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}
