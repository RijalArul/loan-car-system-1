const { Invoice, Payment } = require('../models')
class InvoiceController {
  static async getInvoices (req, res) {
    try {
      const { user_id } = req.headers
      const invoices = await Invoice.findAll({
        where: {
          user_id: user_id
        },
        include: [Payment]
      })

      if (invoices) {
        res.status(200).json({
          data: invoices,
          message: 'Get All Invoices'
        })
      } else {
        throw new Error('Create_Invoice_Please')
      }
    } catch (err) {
      if (err.message === 'Create_Invoice_Please') {
        res.status(400).json({
          err: err.message,
          message: err.message
        })
      } else {
        res.status(500).json({
          err: err,
          message: 'Internal Server Error'
        })
      }
    }
  }

  static async getInvoice (req, res) {
    try {
      const { invoice_id } = req.params
      const invoice = await Invoice.findOne({
        where: {
          id: invoice_id
        },
        include: [Payment]
      })

      if (invoice) {
        res.status(200).json({
          data: invoice,
          message: 'Get All Invoices'
        })
      } else {
        throw new Error('Create_Invoice_Please')
      }
    } catch (err) {
      if (err.message === 'Create_Invoice_Please') {
        res.status(400).json({
          err: err.message,
          message: err.message
        })
      } else {
        res.status(500).json({
          err: err,
          message: 'Internal Server Error'
        })
      }
    }
  }
}

module.exports = InvoiceController
