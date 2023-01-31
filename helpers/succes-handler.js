function successHandler (res, code, data, message) {
  return res.status(code).json({
    data: data,
    message: message
  })
}

module.exports = successHandler
