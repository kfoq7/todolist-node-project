import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { handleErrorResponse } from '../helpers/handleErrors.js'

export const validateAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(400).json({
      message: 'Missing authorization.',
    })
  }

  const token = authorization.split(' ')[1]

  if (!authorization.includes('Bearer') || !token) {
    return res.status(422).json({
      message: 'Token not validate',
    })
  }

  try {
    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY)
    const { iat, exp, ...userData } = verifyToken
    req.user = userData
    next()
  } catch (error) {
    handleErrorResponse(res, 400, error)
  }
}

export const validatePassword = async (req, res, next) => {
  await check('password')
    .isLength({ min: 6 })
    .withMessage('The password must be at least 6 caractéres')
    .run(req)
  await check('confirmPass')
    .equals(req.body.password)
    .withMessage('Password are not correct')
    .run(req)

  const results = validationResult(req)

  if (!results.isEmpty()) {
    return res.status(400).json({
      message: results.array(),
    })
  }

  next()
}
