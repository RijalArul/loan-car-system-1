const interestRate = require('../helpers/interest-rate.helpers')
const successHandler = require('../helpers/succes-handler')
const {
  Installment,
  Leasing,
  Car,
  Invoice,
  User,
  sequelize
} = require('../models')
const IndexRepository = require('../repositories/index.repositories')

const repository = new IndexRepository()
class InstallmentController {
  static async create (req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { user_id } = req.headers
      const { name, car_id, leasing_id, offer_terms } = req.body

      const user = await repository.getUser(user_id)
      const leasing = await repository.getLeasing(leasing_id)
      const car = await repository.getCar(car_id)

      if (leasing && car) {
        if (offer_terms > 0 && offer_terms <= leasing.terms) {
          const installment = await Installment.create(
            {
              name: name,
              user_id: user_id,
              car_id: car_id,
              leasing_id: leasing_id,
              offer_terms: offer_terms
            },
            { transaction: t }
          )
          const d = new Date()
          //   console.log(d.setMinutes(d.getMinutes() + 5))
          let payloadInvoice = {
            user_id,
            installment_id: installment.id,
            car_id: car.id,
            leasing_id: leasing.id,
            invoice_number: 'INV000',
            customer_number: 'CUST000' + user_id,
            customer_name: user.username,
            leasing_name: leasing.leasing_name,
            amount_per_month: interestRate(
              car.price,
              offer_terms,
              leasing.rates
            ),
            term: 0,
            status: 'WAITING',
            invoice_date: new Date(),
            invoice_due_date: d.setDate(d.getDate() + 30)
          }
          let arrInvoice = []
          for (let i = 1; i <= offer_terms; i++) {
            /* SPACE 30 DATE */
            let spaceDueDate = 0
            spaceDueDate += 30
            payloadInvoice.invoice_number = 'INV000' + i
            payloadInvoice.term = i
            payloadInvoice.invoice_date = d.setDate(
              d.getDate() + spaceDueDate - 30
            )
            payloadInvoice.invoice_due_date = d.setDate(
              d.getDate() + spaceDueDate
            )

            /* SPACE 5 Minutes */
            // let spaceDueMinute = 0
            // spaceDueMinute += 5
            // payloadInvoice.term = i
            // payloadInvoice.invoice_number = 'INV000' + i
            // payloadInvoice.term = i
            // payloadInvoice.invoice_date = d.setMinutes(
            //   d.getMinutes() + spaceDueMinute - 5
            // )
            // payloadInvoice.invoice_due_date = d.setMinutes(
            //   d.getMinutes() + spaceDueMinute
            // )

            arrInvoice.push(payloadInvoice)
            let newInvoice = [...new Set(arrInvoice)]
            await Invoice.bulkCreate(newInvoice, { transaction: t })
          }

          await t.commit()

          successHandler(res, 201, installment, message)
        } else {
          throw new Error('Offer_Terms_Over_Then_Leasing_Terms_Offer')
        }
      } else {
        throw new Error('Leasing_Car_Not_Found')
      }
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }

  static async findAll (req, res, next) {
    try {
      const { user_id } = req.headers
      const installments = await repository.getAllMyInstallment(user_id)
      successHandler(res, 200, installments, 'Find Installments Success')
    } catch (err) {
      next(err)
    }
  }

  static async findOne (req, res, next) {
    try {
      const { id } = req.params
      const installment = await repository.getMyInstallment(id)
      if (installment) {
        successHandler(res, 200, installment, 'Success Get My Installment')
      } else {
        throw new Error('Installment Not Found')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = InstallmentController
