'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Car.hasMany(models.Installment, {
        foreignKey: 'car_id'
      })

      Car.hasMany(models.Invoice, {
        foreignKey: 'car_id'
      })
    }
  }
  Car.init(
    {
      car_brand: DataTypes.STRING,
      group_model_name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Car'
    }
  )
  return Car
}
