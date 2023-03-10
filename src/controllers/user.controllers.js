import bcrypt from 'bcrypt'
import { handleErrorResponse } from '../helpers/handleErrors.js'
import { userModel, taskModel } from '../models/index.js'
import { generateJWT } from '../helpers/generate-JWT.js'

export const registerUser = async (req, res) => {
  const { password, ...userData } = req.body

  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    await userModel.create({
      ...userData,
      password: hash,
    })

    res.status(201).json({
      message: 'Usuario creado',
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Verificar si existe el usuario por email
    const user = await userModel.findOne({ email }).lean()
    if (!user)
      return res.status(400).json({
        message: 'Usuario no encontrado',
      })

    // Verificar password
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        message: 'Password incorrecto',
      })

    // generar el token
    const token = await generateJWT({
      id: user._id,
      name: `${user.name}`,
    })

    const { updatedAt, createdAt, password: _, ...userData } = user

    res.status(200).json({
      message: 'Usuario login exitoso',
      token,
      user: userData,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}

export const createTaskUser = async (req, res) => {
  const { userId } = req.params

  try {
    const task = await taskModel.create(req.body)

    const user = await userModel
      .findByIdAndUpdate(userId, { $push: { tasks: task } }, { new: true })
      .populate('tasks')
      .lean()

    const { name, tasks } = user

    res.status(200).json({
      message: 'Task added',
      name,
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

    const { name, tasks } = user

    res.status(200).json({
      message: 'Task list user',
      name,
      tasks,
    })
  } catch (error) {
    handleErrorResponse(res, 500, error)
  }
}
