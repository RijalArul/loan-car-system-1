const PaymentController = require('../controllers/payment.controllers')
const { AuthMidleware, AuthorizedInvoice } = require('../middlewares/auth')

const router = require('express').Router()

router.use(AuthMidleware)
// router.use()
router.post('/:invoice_id', AuthorizedInvoice, PaymentController.create)

module.exports = router
