'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChitietBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChitietBooking.belongsTo(models.Booking, { foreignKey: 'idBooking' })
      ChitietBooking.belongsTo(models.TypeOfTransport, { foreignKey: 'PhuongTien' })
      ChitietBooking.belongsTo(models.Recommend, { foreignKey: 'idRecommend' })
    }
  }
  ChitietBooking.init({
    idBooking: DataTypes.INTEGER,
    PhuongTien: DataTypes.INTEGER,
    idRecommend: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'ChitietBooking',
  });
  return ChitietBooking;
};