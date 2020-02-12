function error (res, statusCode = 400, message = '', type = 'error') {
  const result = {
    status: type,
    message
  }
  return res.status(statusCode).json(result)
}

function success (res, data, message, statusCode = 200, type = 'success') {
  const result = {
    status: type,
    message,
    data
  }

  return res.status(statusCode).json(result)
}

module.exports = {
  success,
  error
}
