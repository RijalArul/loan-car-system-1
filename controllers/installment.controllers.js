const { Installment } = require('../models')

class InstallmentController {
  static async create (req, res) {
    try {
      const { user_id } = req.headers
      const { name } = req.body

      const installment = await Installment.create({
        name: name,
        user_id: user_id
      })

      res.status(201).json({
        data: installment,
        message: 'Success Created Your Installment'
      })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        let message = err.errors.map(el => {
          return el.message
        })

        res.status(400).json({
          err: message[0]
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
