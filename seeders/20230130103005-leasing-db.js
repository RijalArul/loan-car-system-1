'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Leasings', [
      {
        leasing_id: 'L0001',
        leasing_name: 'Clipan Finance',
        rates: 12,
        terms: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leasing_id: 'L0002',
        leasing_name: 'BFI',
        rates: 10,
        terms: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leasing_id: 'L0003',
        leasing_name: 'SMS Finance',
        rates: 8,
        terms: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Leasings', null, {})
  }
}
