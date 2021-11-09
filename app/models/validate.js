'use strict';

module.exports = (sequelize, DataTypes) => {

  const validate = sequelize.define('validates', {
    noktp: {
      type: DataTypes.BIGINT,
      unique: true
    },
    nama: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
    },
    rt:{
      type: DataTypes.INTEGER,
    },
    blok:{
      type: DataTypes.CHAR,
    },
    archived:{
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: "validates"
  });

  validate.associate = function(models) {
  };

  return validate;
};