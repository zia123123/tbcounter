'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('validates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noktp: {
        type: Sequelize.BIGINT,
        unique: true
      },
      nama: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.INTEGER
      },
      blok: {
        type: Sequelize.CHAR
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      archived: {
        type: Sequelize.BOOLEAN
      },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('validates');
  }
};