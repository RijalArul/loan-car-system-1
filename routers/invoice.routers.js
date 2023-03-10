const InvoiceController = require('../controllers/invoice.controllers')
const { errorHandler } = require('../helpers/err-handler.helpers')
const { AuthMidleware, AuthorizedInvoice } = require('../middlewares/auth')

const router = require('express').Router()

router.use(AuthMidleware)
router.get('/', InvoiceController.getInvoices)
router.get('/:invoice_id', AuthorizedInvoice, InvoiceController.getInvoice)
router.use(errorHandler)
module.exports = router
