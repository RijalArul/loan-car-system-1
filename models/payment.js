'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Payment.init(
    {
      invoice_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      bill_amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      pay_total: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      remain_payment: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Payment'
    }
  )
  return Payment
}
