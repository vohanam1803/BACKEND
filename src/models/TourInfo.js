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
      TourInfo.belongsTo(models.TypeOfTransport, { foreignKey: 'idTypesOfTransport' })
      TourInfo.belongsTo(models.Recommend, { foreignKey: 'idRecommend' })
      TourInfo.hasMany(models.Booking, { foreignKey: 'idTourInfo' })
    }
  }
  TourInfo.init({
    TotalTime: DataTypes.STRING,
    date: DataTypes.RANGE(DataTypes.DATE),
    Time: DataTypes.STRING,
    Description: DataTypes.TEXT,
    idTypesOfTransport: DataTypes.INTEGER,
    idRecommend: DataTypes.INTEGER,
    Price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TourInfo',
  });
  return TourInfo;
};