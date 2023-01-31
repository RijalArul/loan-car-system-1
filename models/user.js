'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Deposite, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.Installment, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.Invoice, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.Payment, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        },
        unique: {
          args: true,
          msg: 'Username already exists'
        }
      },
      balance: DataTypes.INTEGER,
      is_login: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
