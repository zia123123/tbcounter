'use strict';

module.exports = (sequelize, DataTypes) => {

  const pasien = sequelize.define('pasiens', {
    nama: {
      type: DataTypes.STRING,
    },
    noktp: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    jeniskelamin: {
      type: DataTypes.CHAR,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    notelppasien: {
      type: DataTypes.STRING,
    },
    notelppmo: {
      type: DataTypes.STRING,
    },
    pekerjaan: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    jumlahhari: {
      type: DataTypes.STRING,
    },
    jumlahobat: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "pasiens"
  });

  pasien.associate = function(models) {
    pasien.hasMany(models.minumobats,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "pasien"})
  };

  return pasien;
};