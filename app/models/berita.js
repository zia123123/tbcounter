'use strict';

module.exports = (sequelize, DataTypes) => {

  const berita = sequelize.define('beritas', {
    judul: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    photo:{
      type: DataTypes.STRING,
    },
    archived:{
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "beritas"
  });

  berita.associate = function(models) {
    //validate.belongsTo(models.users, { foreignKey: "userId"})
  };

  return berita;
};