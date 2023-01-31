const InvoiceController = require('../controllers/invoice.controllers')
const { AuthMidleware, AuthorizedInvoice } = require('../middlewares/auth')

const router = require('express').Router()

router.use(AuthMidleware)
router.get('/', InvoiceController.getInvoices)
router.get('/:invoice_id', AuthorizedInvoice, InvoiceController.getInvoice)

module.exports = router
