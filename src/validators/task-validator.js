import { check } from 'express-validator'

export const validateTaskId = [
  check('taskId').isMongoId().withMessage('The param id must be a mongoId'),
]

export const validateTask = [
  check('title')
    .isString()
    .withMessage('The value must be a string')
    .notEmpty()
    .withMessage('The title is required.'),
  check('description')
    .isString()
    .withMessage('The value must be a string')
    .notEmpty()
    .withMessage('A description is required'),
  check('status')
    .optional()
    .isIn(['PENDING', 'COMPLETED'])
    .withMessage('Status value not validate'),
]
