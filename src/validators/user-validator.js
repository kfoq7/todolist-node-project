import { check } from 'express-validator'

export const validateUserId = [
  check('userId')
    .isMongoId()
    .withMessage('The param id must be a mongoId')
    .bail(),
]

export const validationUser = [
  check('name')
    .notEmpty()
    .withMessage('The name is required')
    .bail(),
  check('email')
    .isEmail()
    .withMessage('The email is invalid')
    .bail(),
  check('password')
    .isLength({ min: 6 })
    .withMessage("The password must be at least 6 caractéres")
    .bail(), 
  check('confirm-pass')
  .equals('password')
  .withMessage("Password are not correct")
    .bail()       
]

export const validationLogin = [
  check('email')
    .notEmpty()
    .withMessage("The emails is required")
    .isEmail()
    .withMessage('The email is invalid')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage("The password is required")
    .bail(), 
]