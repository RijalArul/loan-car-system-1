'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leasing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leasing.init({
    leasing_id: DataTypes.STRING,
    leasing_name: DataTypes.STRING,
    rates: DataTypes.INTEGER,
    terms: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Leasing',
  });
  return Leasing;
};