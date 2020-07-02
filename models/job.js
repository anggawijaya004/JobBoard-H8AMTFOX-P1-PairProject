'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.Tag, { through : 'JobTags', foreignKey: 'job_id' })
      Job.belongsTo(models.User, { foreignKey: 'user_id'})
    }

    dolar(){
      let dolar = `$ ${this.budget}`
      return dolar
    }
    
  };
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};