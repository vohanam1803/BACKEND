'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      idUser: {
        type: Sequelize.INTEGER,
        // references: 'User', // <<< Note, its table's name, not object name
        // referencesKey: 'id' // <<< Note, its a column name
      },
      Time: {
        type: Sequelize.STRING
      },
      Adult: {
        type: Sequelize.STRING
      },
      Children: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Bookings');
  }
};