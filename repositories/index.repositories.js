const {
  User,
  Installment,
  Leasing,
  Car,
  Invoice,
  Payment
} = require('../models')
class IndexRepository {
  #user
  #installment
  #leasing
  #car
  #invoice
  constructor () {
    this.#user = User
    this.#installment = Installment
    this.#leasing = Leasing
    this.#car = Car
    this.#invoice = Invoice
  }

  async getUser (id) {
    const user = await this.#user.findOne({
      where: {
        id: id
      }
    })

    return user
  }

  async getAllMyInstallment (user_id) {
    const installments = await this.#installment.findAll({
      where: {
        user_id: user_id
      }
    })
    return installments
  }

  async getMyInstallment (id) {
    const installment = await this.#installment.findOne({
      where: {
        id: id
      }
    })

    return installment
  }

  async getLeasing (id) {
    const leasing = await this.#leasing.findOne({
      where: {
        id: id
      }
    })

    return leasing
  }

  async getCar (id) {
    const car = await this.#car.findOne({
      where: {
        id: id
      }
    })

    return car
  }

  async getAllMyInvoices (user_id) {
    const invoices = await this.#invoice.findAll({
      where: {
        user_id: user_id
      },
      include: [Payment]
    })

    return invoices
  }

  async getDetailMyInvoice (id) {
    const invoice = await this.#invoice.findOne({
      where: {
        id: id
      },
      include: [Payment]
    })

    return invoice
  }
}

module.exports = IndexRepository
