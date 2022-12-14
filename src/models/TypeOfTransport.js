'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeOfTransport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeOfTransport.hasMany(models.TourInfo, { foreignKey: 'idTypesOfTransport' })

    }
  }
  TypeOfTransport.init({
    imageTransport: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TypeOfTransport',
  });
  return TypeOfTransport;
};