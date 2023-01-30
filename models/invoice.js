'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Invoice.init(
    {
      user_id: DataTypes.INTEGER,
      installment_id: DataTypes.INTEGER,
      car_id: DataTypes.INTEGER,
      leasing_id: DataTypes.INTEGER,
      invoice_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      customer_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      customer_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      leasing_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      amount_per_month: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      term: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Invoice'
    }
  )
  return Invoice
}
