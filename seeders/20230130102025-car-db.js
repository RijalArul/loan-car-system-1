'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Cars', [
      {
        car_brand: 'Toyota Avanza',
        group_model_name: '1.3 E MT',
        year: 2015,
        price: 110000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        car_brand: 'Toyota Agya',
        group_model_name: '1.3 E MT',
        year: 2015,
        price: 150000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        car_brand: 'Suzuki Ertiga',
        group_model_name: '1.3 E MT',
        year: 2017,
        price: 180000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        car_brand: 'Daihatsu Xenia',
        group_model_name: '1.3 E MT',
        year: 2019,
        price: 100000000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {})
  }
}
