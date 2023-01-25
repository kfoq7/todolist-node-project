import { check } from 'express-validator'

export const validateUserId = [
  check('userId')
    .isMongoId()
    .withMessage('The param id must be a mongoId')
    .bail(),
]
