'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.Order, { foreignKey: "CustomerId" })
      Profile.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Profile.init({
    UserId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};



/*
Users -> Profiles (One to One)
Profiles -> Orders (One to Many)
Products -> Orders (One to Many)
Categories -> Products (One to Many)
*/