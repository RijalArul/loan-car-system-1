const router = require('express').Router()
const userRouter = require('./user.routers')
const installmentRouter = require('./installment.routers')
const invoiceRouter = require('./invoice.routers')
router.use('/users', userRouter)
router.use('/installments', installmentRouter)
router.use('/invoices', invoiceRouter)
module.exports = router
