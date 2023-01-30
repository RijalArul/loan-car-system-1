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
      }
    },
    {
      sequelize,
      modelName: 'Installment'
    }
  )
  return Installment
}
