import { userModel } from '../models/index.js'

export const validateUserExist = async userId => {
  const user = await userModel.findById(userId)
  if (!user) throw new Error('User not found')
}
