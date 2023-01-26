export const handleErrorResponse = (res, statusCode, error) => {
  console.log(error)
  res.status(statusCode).json({
    message: 'Server error response',
    error: error.message,
  })
}
