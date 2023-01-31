const successHandler = require('../helpers/succes-handler')
const { Invoice, Payment } = require('../models')
const IndexRepository = require('../repositories/index.repositories')

const repository = new IndexRepository()
class InvoiceController {
  static async getInvoices (req, res) {
    try {
      const { user_id } = req.headers
      const invoices = await repository.getAllMyInvoices(user_id)

      if (invoices) {
        successHandler(res, 200, invoices, 'Get All Invoices')
      }
    } catch (err) {
      next(err)
    }
  }

  static async getInvoice (req, res) {
    try {
      const { invoice_id } = req.params
      const invoice = await repository.getDetailMyInvoice(invoice_id)
      if (invoice) {
        successHandler(res, 200, invoice, 'Get My Invoice')
      } else {
        throw new Error('Create_Invoice_Please')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = InvoiceController
