'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JobTag.belongsTo(models.Job, { foreignKey:'job_id'} )
      JobTag.belongsTo(models.Tag, { foreignKey:'tag_id'} )
    }
  };
  JobTag.init({
    job_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobTag',
  });
  return JobTag;
};