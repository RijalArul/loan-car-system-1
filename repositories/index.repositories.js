const { User, Installment, Leasing, Car } = require('../models')
class IndexRepository {
  #user
  #installment
  #leasing
  #car
  constructor () {
    this.#user = User
    this.#installment = Installment
    this.#leasing = Leasing
    this.#car = Car
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
}

module.exports = IndexRepository
