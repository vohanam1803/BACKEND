'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recommend.hasMany(models.TourInfo, { foreignKey: 'idRecommend' })

    }
  }
  Recommend.init({
    NameDiaDiem: DataTypes.STRING,
    LocalDiaDiem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recommend',
  });
  return Recommend;
};