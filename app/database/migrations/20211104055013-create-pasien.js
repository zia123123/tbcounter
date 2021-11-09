'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pasiens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      noktp: {
        unique: true,
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.TEXT
      },
      jeniskelamin: {
        type: Sequelize.CHAR
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      notelppasien: {
        type: Sequelize.STRING
      },
      notelppmo: {
        type: Sequelize.STRING
      },
      pekerjaan: {
        type: Sequelize.STRING
      },
      jumlahhari: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      jumlahobat: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('pasiens');
  }
};