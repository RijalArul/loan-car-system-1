const { Invoice, Payment, User, sequelize } = require('../models')

class PaymentController {
  static async create (req, res) {
    const t = await sequelize.transaction()
    try {
      const { user_id } = req.headers
      const { invoice_id } = req.params
      const { transfer } = req.body

      const my_invoice = await Invoice.findOne({
        where: {
          id: invoice_id
        }
      })

      if (my_invoice.status === 'WAITING') {
        const paymentDate = new Date()
        if (
          paymentDate >= my_invoice.invoice_date &&
          paymentDate <= my_invoice.invoice_due_date
        ) {
          const payloadPayment = {
            invoice_id: my_invoice.id,
            user_id: my_invoice.user_id,
            bill_amount: my_invoice.amount_per_month,
            pay_total: transfer,
            remain_payment: my_invoice.amount_per_month - transfer
          }

          if (payloadPayment.remain_payment >= 0) {
            const newPayment = await Payment.create(payloadPayment, {
              transaction: t
            })
            if (newPayment.remain_payment == 0) {
              await Invoice.update(
                { amount_per_month: 0, status: 'PAID OFF' },
                {
                  where: {
                    id: my_invoice.id
                  }
                },
                { transaction: t }
              )
            } else if (
              newPayment.remain_payment < my_invoice.amount_per_month
            ) {
              await Invoice.update(
                { amount_per_month: newPayment.remain_payment, status: 'OWE' },
                {
                  where: {
                    id: my_invoice.id
                  }
                },
                {
                  transaction: t
                }
              )
              await Invoice.update(
                {
                  amount_per_month:
                    newPayment.remain_payment + my_invoice.amount_per_month,
                  status: 'WAITING'
                },
                {
                  where: {
                    id: my_invoice.id + 1
                  }
                },
                { transaction: t }
              )

              const invoices = await Invoice.findAll(
                {
                  where: {
                    installment_id: my_invoice.installment_id
                  }
                },
                {
                  transaction: t
                }
              )

              if (invoices[invoices.length - 1].id === my_invoice.id) {
                await Invoice.update(
                  {
                    amount_per_month: newPayment.remain_payment,
                    status: 'OWE'
                  },
                  {
                    where: {
                      id: my_invoice.id
                    }
                  },
                  {
                    transaction: t
                  }
                )
              }
            }

            await t.commit()

            res.status(201).json({
              data: newPayment,
              message: 'Payment Is Success'
            })
          }
        } else {
          throw new Error('Invalid_Payment_Date')
        }
      }
    } catch (err) {
      await t.rollback()
      if (
        err.name === 'SequelizeValidationError' ||
        'SequelizeUniqueConstraintError' ||
        err.message === 'Invalid_Payment_Date'
      ) {
        let message = err.errors?.map(el => {
          return el.message
        })
        res.status(400).json({
          err:
            err.message === 'Invalid_Payment_Date'
              ? 'Your Invoice has been expired'
              : message[0]
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

module.exports = PaymentController
