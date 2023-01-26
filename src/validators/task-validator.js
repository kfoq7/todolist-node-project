import { check } from 'express-validator'

export const validateTask = [
  check('title')
    .isString()
    .withMessage('The value must be a string')
    .bail()
    .notEmpty()
    .withMessage('The title is required.')
    .bail(),
  check('description')
    .isString()
    .withMessage('The value must be a string')
    .bail()
    .notEmpty()
    .withMessage('A description is required')
    .bail(),
]
