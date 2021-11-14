'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class minumobat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  minumobat.init({
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'minumobat',
  });
  return minumobat;
};


'use strict';

module.exports = (sequelize, DataTypes) => {

  const minumobat = sequelize.define('minumobats', {
    keterangan: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "minumobats"
  });

  minumobat.associate = function(models) {
    minumobat.belongsTo(models.pasiens,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "pasienId"})
   
  };

  return minumobat;
};