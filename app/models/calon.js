'use strict';

module.exports = (sequelize, DataTypes) => {

  const calon = sequelize.define('calons', {
    nourut: {
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.TEXT,
    },
    photo:{
      type: DataTypes.STRING,
    },
    visi:{
      type: DataTypes.STRING,
    },
    archived:{
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "calons"
  });

  calon.associate = function(models) {
    calon.belongsTo(models.votes,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "voteId"})
    calon.hasMany(models.voteds,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "calon"})
  };

  return calon;
};