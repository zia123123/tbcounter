'use strict';

module.exports = (sequelize, DataTypes) => {

  const voted = sequelize.define('voteds', {
    noktp: {
      type: DataTypes.STRING,
    },
    pilih: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "voteds"
  });

  voted.associate = function(models) {
    voted.belongsTo(models.votes,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "voteId"})
    voted.belongsTo(models.calons,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "calonId"})
  };

  return voted;
};

