'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      installment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Installments',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      leasing_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Leasings',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      car_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      invoice_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customer_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customer_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      leasing_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amount_per_month: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      term: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices')
  }
}
