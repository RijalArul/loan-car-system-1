const InvoiceController = require('../controllers/invoice.controllers')

const router = require('express').Router()

router.post('/', InvoiceController.create)

module.exports = router
