'use strict';

module.exports = (sequelize, DataTypes) => {

  const vote = sequelize.define('votes', {
    judul: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    photo:{
      type: DataTypes.STRING,
    },
    rt:{
      type: DataTypes.INTEGER,
      unique: true
    },
    rw:{
      type: DataTypes.BOOLEAN,
    },
    archived:{
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "votes"
  });

  vote.associate = function(models) {
    vote.hasMany(models.calons,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "vote"})
    vote.hasMany(models.voteds,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "vote"})
  };

  return vote;
};