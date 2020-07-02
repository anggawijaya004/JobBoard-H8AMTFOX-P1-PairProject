'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Job, {foreignKey: 'user_id'})
    }
    
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate: (user)=>{
        user.password = encrypt(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};