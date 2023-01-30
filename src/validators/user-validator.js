import { check } from 'express-validator'
import { validateUserExist } from '../helpers/existById.js'

export const validateUserId = [
  check('userId')
    .isMongoId()
    .withMessage('The param id must be a mongoId')
    .custom(validateUserExist),
]

export const validationUser = [
  check('username').notEmpty().withMessage('The name is required'),
  check('email').isEmail().withMessage('The email is invalid'),
]

export const validationLogin = [
  check('email')
    .notEmpty()
    .withMessage('The emails is required')
    .isEmail()
    .withMessage('The email is invalid'),
  check('password').notEmpty().withMessage('The password is required'),
]
