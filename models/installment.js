'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Installment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Installment.hasMany(models.Invoice, {
        foreignKey: 'installment_id'
      })
    }
  }
  Installment.init(
    {
      user_id: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      leasing_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      car_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      offer_terms: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Installment'
    }
  )
  return Installment
}
