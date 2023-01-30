const router = require('express').Router()
const userRouter = require('./user.routers')
const installmentRouter = require('./installment.routers')
router.use('/users', userRouter)
router.use('/installments', installmentRouter)

module.exports = router
