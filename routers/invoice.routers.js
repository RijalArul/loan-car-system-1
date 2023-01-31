const InvoiceController = require('../controllers/invoice.controllers')

const router = require('express').Router()

router.post('/', InvoiceController.findAll)

module.exports = router
