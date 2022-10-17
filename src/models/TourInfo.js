'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourInfo.init({
    TotalTime: DataTypes.STRING,
    date: DataTypes.DATE,
    Time: DataTypes.STRING,
    idTypesOfTransport: DataTypes.INTEGER,
    Price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TourInfo',
  });
  return TourInfo;
};