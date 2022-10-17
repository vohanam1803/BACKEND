'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ViewTrangChus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTypesOfTransport: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idRecommend: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Popular: {
        type: Sequelize.STRING
      },
      ///
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ViewTrangChus');
  }
};