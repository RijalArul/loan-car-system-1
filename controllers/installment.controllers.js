const {
  Installment,
  Leasing,
  Car,
  Invoice,
  User,
  sequelize
} = require('../models')

class InstallmentController {
  static async create (req, res) {
    const t = await sequelize.transaction()
    try {
      const { user_id } = req.headers
      const { name, car_id, leasing_id, offer_terms } = req.body

      const user = await User.findOne({
        where: {
          id: user_id
        }
      })

      const leasing = await Leasing.findOne({
        where: {
          id: leasing_id
        }
      })

      const car = await Car.findOne({
        where: {
          id: car_id
        }
      })

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

          const monthlyInstallments = car.price / offer_terms
          const ratesPerMonth = (monthlyInstallments * leasing.rates) / 100 / 12
          const amountInstallmentPerMonth = monthlyInstallments + ratesPerMonth
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
            amount_per_month: amountInstallmentPerMonth,
            term: 0,
            status: 'WAITING',
            invoice_date: new Date(),
            invoice_due_date: d.setMinutes(d.getMinutes() + 5)
          }

          let arrInvoice = []
          for (let i = 1; i <= offer_terms; i++) {
            /* SPACE 30 DATE */
            // let spaceDueDate = 0
            // spaceDueDate += 30
            // payloadInvoice.invoice_number = 'INV000' + i
            //payloadInvoice.term = i
            // payloadInvoice.invoice_date = d.setDate(
            //   d.getDate() + spaceDueDate - 30
            // )
            // payloadInvoice.invoice_due_date = d.setDate(
            //   d.getDate() + spaceDueDate
            // )

            /* SPACE 5 Minutes */
            let spaceDueMinute = 0
            spaceDueMinute += 5
            payloadInvoice.term = i
            payloadInvoice.invoice_number = 'INV000' + i
            payloadInvoice.term = i
            payloadInvoice.invoice_date = d.setMinutes(
              d.getMinutes() + spaceDueMinute - 5
            )
            payloadInvoice.invoice_due_date = d.setMinutes(
              d.getMinutes() + spaceDueMinute
            )

            arrInvoice.push(payloadInvoice)
            let newInvoice = [...new Set(arrInvoice)]
            await Invoice.bulkCreate(newInvoice, { transaction: t })
          }

          await t.commit()

          res.status(201).json({
            data: installment,
            message: 'Success Created Your Installment'
          })
        } else {
          throw new Error('Offer_Terms_Over_Then_Leasing_Terms_Offer')
        }
      } else {
        throw new Error('Leasing_Car_Not_Found')
      }
    } catch (err) {
      await t.rollback()
      if (
        err.name === 'SequelizeValidationError' ||
        'SequelizeUniqueConstraintError' ||
        err.message === 'Leasing_Car_Not_Found' ||
        'Offer_Terms_Over_Then_Leasing_Terms_Offer'
      ) {
        let message = err.errors?.map(el => {
          return el.message
        })
        res.status(400).json({
          err:
            err.message === 'Leasing_Car_Not_Found'
              ? 'Leasing Car is Invalid Request'
              : err.message === 'Offer_Terms_Over_Then_Leasing_Terms_Offer'
              ? 'Offer Terms Over Then Leasing Terms Offer'
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

  static async findAll (req, res) {
    try {
      const { user_id } = req.headers
      const installment = await Installment.findAll({
        where: {
          user_id: user_id
        }
      })

      res.status(200).json({
        data: installment,
        message: 'Find Installments Success'
      })
    } catch (err) {
      res.status(500).json({
        err: err,
        message: 'Internal Server Error'
      })
    }
  }

  static async findOne (req, res) {
    try {
      const { id } = req.params
      const installment = await Installment.findOne({
        where: {
          id: id
        }
      })

      if (installment) {
        res.status(200).json({
          data: installment,
          message: 'Find Instllment Success'
        })
      } else {
        throw new Error('Failed_Find_Installments')
      }
    } catch (err) {
      if (err.message === 'Failed_Find_Installments') {
        res.status(404).json({
          err: 'Installments Not Found',
          message: 'Failed Find Installments'
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

module.exports = InstallmentController
