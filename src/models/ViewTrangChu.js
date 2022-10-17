'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ViewTrangChu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ViewTrangChu.init({
    idTypesOfTransport: DataTypes.INTEGER,
    idRecommend: DataTypes.INTEGER,
    Popular: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ViewTrangChu',
  });
  return ViewTrangChu;
};