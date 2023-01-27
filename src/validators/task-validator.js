import { check } from 'express-validator'

export const validateTaskId = [
  check('taskId')
    .isMongoId()
    .withMessage('The param id must be a mongoId')
    .bail(),
]

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
  check('status')
    .optional()
    .isBoolean()
    .withMessage('The status must be a boolean')
    .bail(),
]
