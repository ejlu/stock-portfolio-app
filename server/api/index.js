const router = require('express').Router()
module.exports = router

router.use(require('../security'))

router.use('/users', require('./users'))
router.use('/portfolio', require('./portfolio'))
router.use('/symbols', require('./symbol'))
router.use('/transactions', require('./transaction'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
