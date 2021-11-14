'use strict';

module.exports = (sequelize, DataTypes) => {

  const feed = sequelize.define('feeds', {
    pembuat: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: "feeds"
  });

  feed.associate = function(models) {
   
  };

  return feed;
};