function errorHandler (err, req, res, next) {
  let code = err.code || 500

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    code = 400
    message = err.errors.map(el => {
      return el.message
    })
  } else if (
    err.message === 'Invalid Username' ||
    err.message === 'Failed Authenthicated'
  ) {
    code = 401
    message = err.message
  } else if (err.name === 'Forbidden Access') {
    code = 403
    message = 'Forbidden Access'
  } else if (err.name === 'ID Not Found') {
    code = 404
    message = err.name
  } else if (err.name === 'UserNotFound') {
    code = 404
    message = err.name
  } else {
    message = 'Internal Server Error'
  }

  res.status(code).json({
    message: message
  })
}

module.exports = {
  errorHandler
}
