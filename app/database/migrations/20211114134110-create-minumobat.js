'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('minumobats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keterangan: {
        type: Sequelize.STRING
      },
      pasienId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "pasiens",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('minumobats');
  }
};