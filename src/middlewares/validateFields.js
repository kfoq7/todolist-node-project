import { validationResult } from 'express-validator'

export const validate = validations => {
  return async (req, res, next) => {
    for (const validator of validations) {
      const result = await validator.run(req)
      if (result.errors.length) {
        break
      }
    }

    const results = validationResult(req)

    if (results.isEmpty()) {
      return next()
    }

    res.status(400).json({
      errors: results.array(),
    })
  }
}
