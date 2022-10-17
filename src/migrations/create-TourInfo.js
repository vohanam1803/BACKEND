'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TourInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TotalTime: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      Time: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.TEXT
      },
      idTypesOfTransport: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idRecommend: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('TourInfos');
  }
};