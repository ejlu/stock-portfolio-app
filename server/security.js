const userGate = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const error = new Error('403 Unauthorized')
    error.status = 403
    next(error)
  }
}
module.exports = userGate
